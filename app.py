# app.py
import streamlit as st
import logging
import os
import json
import base64
import io
import re
import time
import datetime
import tempfile
import zipfile
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image

import groq
import google.generativeai as genai

from info_search import show_info_search
from ui.notes_browser import show_notes_browser   # 新增导入

st.set_page_config(
    layout="wide",
    page_title="LVING PDF Assistant",
    initial_sidebar_state="expanded",
    menu_items=None
)

if not os.path.exists("logs"):
    os.makedirs("logs")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("logs/app.log", encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

from config import AVAILABLE_MODELS, DEFAULT_MODEL
from state.session import init_session_state
from utils.data_loader import load_level_data, load_nemt_cet_data, load_teaching_principles, get_word_state_key, save_learning_states, load_nlp_textbook_data, get_page_state_key, get_page_state_icon, next_page_state, save_note, load_note
from utils.tts import load_kokoro, has_chinese, text_to_speech, transcribe_audio
from utils.quiz import generate_quiz, auto_generate_reference
from utils.search import global_search, local_search
from utils.ocr import process_ocr_images, process_ocr_pdf
from utils.github import save_to_github, upload_file_to_github
from ui.sidebar import render_sidebar
from ui.main_content import render_main_content
from ocr_image_module import ocr_images_batch, BAIMIAO_CONFIG as IMAGE_OCR_CONFIG, format_results_as_text
from ocr_pdf_module import ocr_pdf, BAIMIAO_CONFIG as PDF_OCR_CONFIG
from utils.helpers import get_base64_of_image, translate_word

init_session_state()

def parse_google_response(response_obj):
    reply_parts =[]
    try:
        for candidate in response_obj.candidates:
            for part in candidate.content.parts:
                if hasattr(part, 'text') and part.text:
                    reply_parts.append(part.text)
                elif hasattr(part, 'inline_data') and part.inline_data:
                    mime_type = part.inline_data.mime_type
                    b64_data = base64.b64encode(part.inline_data.data).decode('utf-8')
                    reply_parts.append(f"\n![AI Generated Image](data:{mime_type};base64,{b64_data})\n")
                elif hasattr(part, 'executable_code') and part.executable_code:
                    lang = part.executable_code.language
                    code = part.executable_code.code
                    reply_parts.append(f"\n**[Code Generation - {lang}]**\n```{lang}\n{code}\n```\n")
                elif hasattr(part, 'code_execution_result') and part.code_execution_result:
                    outcome = part.code_execution_result.outcome
                    output = part.code_execution_result.output
                    reply_parts.append(f"\n**[Execution Result ({outcome})]**\n```text\n{output}\n```\n")
                elif hasattr(part, 'function_call') and part.function_call:
                    reply_parts.append(f"\n*[Function Call invoked: {part.function_call.name}]*\n")
    except Exception as e:
        logger.error(f"Failed to deeply parse Google parts: {e}")
        try:
            reply_parts.append(response_obj.text)
        except Exception:
            reply_parts.append("[Error: Failed to extract AI response content]")
    return "\n".join(reply_parts).strip()

bg_base64 = get_base64_of_image("background.jpg")
_bg_warning = None
if bg_base64 is None:
    _bg_warning = "Background image not found. Using solid light background."
    bg_css = "background-color: #f0f0f0;"
else:
    bg_css = f"background-image: url('data:image/jpeg;base64,{bg_base64}');"

def load_css():
    try:
        with open("styles.css", "r", encoding="utf-8") as f:
            css_content = f.read()
            css_content = css_content.replace("{{BG_CSS}}", bg_css)
            st.markdown(f"<style>{css_content}</style>", unsafe_allow_html=True)
    except FileNotFoundError:
        st.warning("styles.css not found, using default styling")

load_css()
if _bg_warning:
    st.warning(_bg_warning)

levels_data = load_level_data(st.session_state.language)
nemt_cet_data = load_nemt_cet_data()
TEACHING_PRINCIPLES = load_teaching_principles()

client = groq.Client(api_key=os.environ.get("GROQ_API_KEY") or st.secrets["GROQ_API_KEY"])

def build_system_prompt():
    prompt = f"""You are a learning assistant.

TEACHING PRINCIPLES (MUST FOLLOW — these override your default helpful behavior):
{TEACHING_PRINCIPLES}"""
    return prompt

system_prompt = build_system_prompt()

MODEL_CONTEXT_CHAR_LIMITS = {
    "meta-llama/llama-4-scout-17b-16e-instruct": 12000,
    "llama-3.3-70b-versatile":  18000,
    "llama-3.1-8b-instant":     18000,
    "openai/gpt-oss-120b":      10000,
    "openai/gpt-oss-20b":        4000,
    "qwen/qwen3-32b":           14000,
    "moonshotai/kimi-k2-instruct-0905": 4000,
    "groq/compound":             4000,
    "groq/compound-mini":        3000,
}
PAGE_CONTENT_MAX_CHARS = 1200
HISTORY_MAX_TURNS = 8

def _get_context_char_limit():
    return MODEL_CONTEXT_CHAR_LIMITS.get(st.session_state.model_name, 6000)

def _truncate_context_msgs(context_msgs):
    limit = _get_context_char_limit()
    sys_msgs = []
    chat_msgs =[]
    for m in context_msgs:
        if m["role"] == "system":
            content = m["content"]
            if isinstance(content, str) and len(content) > 2000:
                content = content[:2000] + "\n...[truncated]"
            sys_msgs.append({**m, "content": content})
        else:
            chat_msgs.append(m)
    max_chat = HISTORY_MAX_TURNS * 2
    if len(chat_msgs) > max_chat:
        chat_msgs = chat_msgs[-max_chat:]
    def _total_chars(msgs):
        total = 0
        for m in msgs:
            c = m.get("content", "")
            total += len(c) if isinstance(c, str) else 500
        return total
    while len(chat_msgs) > 2 and _total_chars(sys_msgs + chat_msgs) > limit:
        chat_msgs.pop(0)
    return sys_msgs + chat_msgs

if not st.session_state.messages:
    st.session_state.messages = [{"role": "system", "content": system_prompt}]

def get_current_page_key():
    if st.session_state.current_mode == "textbook":
        return f"textbook_{st.session_state.level}_{'_'.join(st.session_state.path)}"
    elif st.session_state.current_mode == "nemt_cet":
        return f"nemt_cet_{st.session_state.selected_nemt_cet}_{'_'.join(st.session_state.nemt_cet_path)}"
    elif st.session_state.current_mode == "info_search":
        return "info_search_dummy"
    elif st.session_state.current_mode == "hf_course":
        if st.session_state.hf_course_current_chapter and st.session_state.hf_course_current_section:
            return f"hf_course_{st.session_state.hf_course_lang}_{st.session_state.hf_course_current_chapter}_{st.session_state.hf_course_current_section}"
        return None
    elif st.session_state.language == "NLP Textbook" and st.session_state.nlp_selected_chapter and st.session_state.nlp_selected_section:
        return f"nlp_textbook_{st.session_state.nlp_selected_chapter}_{st.session_state.nlp_selected_section}"
    else:
        return None

def get_current_page_full_content():
    # ========== info_search 模式：返回格式化的搜索结果 ==========
    if st.session_state.current_mode == "info_search":
        if not st.session_state.search_results:
            return "No search results currently."
        keyword = st.session_state.search_keyword
        lines = [f"Search results for '{keyword}':", ""]
        for idx, res in enumerate(st.session_state.search_results):
            # 提取内容预览
            content_preview = res.get("content", "")[:300]
            if len(res.get("content", "")) > 300:
                content_preview += "..."
            # 路径信息
            path_info = " > ".join(str(p) for p in res.get("path", [])) if res.get("path") else "Unknown"
            # 来源
            source = res.get("source", "unknown")
            level = res.get("level", "")
            type_str = res.get("type", "Content")
            lines.append(f"### Result {idx+1}: {type_str}")
            lines.append(f"- **Source**: {source} {level}")
            lines.append(f"- **Path**: {path_info}")
            lines.append(f"- **Content**: {content_preview}")
            lines.append("")
        return "\n".join(lines)

    # ========== nemt_cet 模式 ==========
    if st.session_state.current_mode == "nemt_cet":
        if not st.session_state.selected_nemt_cet or not st.session_state.nemt_cet_path:
            return None
        data = nemt_cet_data.get(st.session_state.selected_nemt_cet, {})
        if len(data) == 1 and st.session_state.selected_nemt_cet in data:
            data = data[st.session_state.selected_nemt_cet]
        node = data
        for key in st.session_state.nemt_cet_path:
            node = node.get(key, {})
            if not node:
                return None
        content_node = node
        dir_name = ""
        if isinstance(content_node, dict):
            if len(content_node) == 1:
                dir_name = list(content_node.keys())[0]
                content_node = content_node[dir_name]
            elif "name" in content_node:
                dir_name = content_node["name"]
        name_path_parts =[]
        temp_data = data
        for path_key in st.session_state.nemt_cet_path:
            temp_data = temp_data.get(path_key, {})
            if isinstance(temp_data, dict) and len(temp_data) > 0:
                if len(temp_data) == 1:
                    inner_dir_name = list(temp_data.keys())[0]
                    name_path_parts.append(inner_dir_name)
                elif "name" in temp_data:
                    name_path_parts.append(temp_data["name"])
        parts =[]
        location = " > ".join(name_path_parts) if name_path_parts else st.session_state.selected_nemt_cet
        parts.append(f"The user is currently viewing: {location}")
        if dir_name:
            parts.append(f"Section: {dir_name}")
        elif "name" in content_node:
            parts.append(f"Section: {content_node['name']}")
        if "notes" in content_node and content_node["notes"]:
            parts.append(f"Notes: {content_node['notes']}")
        if "examples" in content_node and content_node["examples"]:
            parts.append("Example sentences:\n" + "\n".join(f"  - {e}" for e in content_node["examples"]))
        if "words" in content_node and content_node["words"]:
            if isinstance(content_node["words"], str):
                words_list = content_node["words"].split(" / ")
            else:
                words_list = content_node["words"]
            parts.append("Words:\n" + "\n".join(f"  - {w}" for w in words_list[:20]))
        # 增加同级子目录信息
        sub_items = []
        for k, v in node.items():
            if isinstance(v, dict) and k not in ["name", "notes", "examples", "words"] and str(k).isdigit():
                if "name" in v:
                    sub_items.append(v["name"])
                else:
                    sub_items.append(k)
        if sub_items:
            parts.append("Available sub-sections: " + ", ".join(sub_items))
        return "\n".join(parts)

    # ========== textbook 模式 ==========
    if st.session_state.current_mode == "textbook":
        if not st.session_state.level or not st.session_state.path:
            return None
        data = levels_data.get(f"Level {st.session_state.level}", {})
        node = data
        for key in st.session_state.path:
            node = node.get(key, {})
            if not node:
                return None
        parts =[]
        location = " > ".join(st.session_state.path)
        parts.append(f"The user is currently viewing: {location}")
        if "name" in node:
            parts.append(f"Section: {node['name']}")
        if "notes" in node and node["notes"]:
            parts.append(f"Notes: {node['notes']}")
        if "examples" in node and node["examples"]:
            parts.append("Example sentences:\n" + "\n".join(f"  - {e}" for e in node["examples"]))
        if "vocabulary" in node and node["vocabulary"]:
            parts.append("Vocabulary:\n" + "\n".join(f"  - {v}" for v in node["vocabulary"]))
        # 增加同级子目录信息
        sub_keys = [k for k in node.keys() if k not in ("name", "notes", "examples", "vocabulary") and isinstance(node[k], dict)]
        if sub_keys:
            sub_names = []
            for k in sub_keys:
                if "name" in node[k]:
                    sub_names.append(node[k]["name"])
                else:
                    sub_names.append(k)
            parts.append("Available sub-sections: " + ", ".join(sub_names))
        return "\n".join(parts)

    # ========== hf_course 模式：返回完整内容（不截断） ==========
    if st.session_state.current_mode == "hf_course":
        if not st.session_state.hf_course_current_chapter or not st.session_state.hf_course_current_section:
            return None
        lang = st.session_state.hf_course_lang
        chapter = st.session_state.hf_course_current_chapter
        section = st.session_state.hf_course_current_section
        base_path = Path("Course-main/chapters") / lang
        mdx_file = base_path / chapter / f"{section}.mdx"
        if not mdx_file.exists():
            logger.warning(f"HF Course file not found: {mdx_file}")
            return None
        try:
            content = mdx_file.read_text(encoding="utf-8")
            plain = re.sub(r'<[^>]+>', '', content)
            plain = re.sub(r'!\[.*?\]\(.*?\)', '', plain)
            # 不再截断，返回完整内容
            return f"Current Hugging Face course section: {chapter}/{section}\n\n{plain}"
        except Exception as e:
            logger.error(f"Failed to read HF Course file: {e}")
            return None

    # ========== NLP Textbook 模式：返回完整 content（不截断） ==========
    if st.session_state.language == "NLP Textbook" and st.session_state.nlp_selected_chapter and st.session_state.nlp_selected_section:
        nlp_data = load_nlp_textbook_data()
        if not nlp_data:
            return None
        chapter = nlp_data.get(st.session_state.nlp_selected_chapter)
        if not chapter:
            return None
        section = chapter.get(st.session_state.nlp_selected_section)
        if not section:
            return None
        parts = []
        chapter_name = chapter.get("name", st.session_state.nlp_selected_chapter)
        section_name = section.get("name", st.session_state.nlp_selected_section)
        parts.append(f"The user is currently viewing: {chapter_name} › {section_name}")
        content = section.get("content", "")
        if content:
            # 不再截断
            parts.append(f"Content:\n{content}")
        notes = section.get("notes", "")
        if notes:
            parts.append(f"User's notes for this section:\n{notes}")
        return "\n".join(parts)

    return None

def get_page_recommendations():
    if st.session_state.current_mode == "info_search":
        return None
    if st.session_state.current_mode == "hf_course":
        return None
    page_key = get_current_page_key()
    if st.session_state.current_page_key == page_key and page_key in st.session_state.page_recommendations:
        return st.session_state.page_recommendations[page_key]
    if st.session_state.current_page_key != page_key:
        st.session_state.current_page_key = page_key
    if page_key not in st.session_state.page_recommendations:
        full_page_content = get_current_page_full_content()
        if full_page_content:
            path_string = ""
            mode = ""
            level = None
            if st.session_state.current_mode == "textbook":
                path_string = " > ".join(st.session_state.path)
                mode = "textbook"
                level = st.session_state.level
            else:
                data = nemt_cet_data.get(st.session_state.selected_nemt_cet, {})
                if len(data) == 1 and st.session_state.selected_nemt_cet in data:
                    data = data[st.session_state.selected_nemt_cet]
                name_path_parts =[]
                temp_data = data
                for path_key in st.session_state.nemt_cet_path:
                    temp_data = temp_data.get(path_key, {})
                    if isinstance(temp_data, dict) and len(temp_data) > 0:
                        if len(temp_data) == 1:
                            inner_dir_name = list(temp_data.keys())[0]
                            name_path_parts.append(inner_dir_name)
                        elif "name" in temp_data:
                            name_path_parts.append(temp_data["name"])
                path_string = " > ".join(name_path_parts) if name_path_parts else st.session_state.selected_nemt_cet
                mode = "nemt_cet"
            ref_msg = auto_generate_reference(client, level, full_page_content, path_string, mode)
            if ref_msg:
                st.session_state.page_recommendations[page_key] = ref_msg
    return st.session_state.page_recommendations.get(page_key)

def auto_update_word_states_from_quiz(evaluation_text):
    correct = 0
    total = 0
    for line in evaluation_text.split('\n'):
        m = re.match(r'^\d+:\s*(✅|❌)', line.strip())
        if m:
            total += 1
            if m.group(1) == '✅':
                correct += 1
    if total == 0: return
    score_ratio = correct / total
    if score_ratio >= 0.8:
        new_state = 1
        score_msg = f"Auto-marked words as Learned ({correct}/{total} correct)"
    elif score_ratio < 0.5:
        new_state = 2
        score_msg = f"Auto-marked words for Review ({correct}/{total} correct)"
    else:
        return
    updated = False
    if st.session_state.current_mode == "textbook" and st.session_state.level and st.session_state.path:
        data = levels_data.get(f"Level {st.session_state.level}", {})
        node = data
        for key in st.session_state.path:
            node = node.get(key, {})
        if "vocabulary" in node and node["vocabulary"]:
            path_str = "_".join(st.session_state.path)
            for idx in range(len(node["vocabulary"])):
                word_key = get_word_state_key("textbook", st.session_state.level, [path_str], idx)
                current = st.session_state.learning_states.get(word_key, 0)
                if new_state == 1 and current == 0:
                    st.session_state.learning_states[word_key] = 1
                    updated = True
                elif new_state == 2 and current != 1:
                    st.session_state.learning_states[word_key] = 2
                    updated = True
    elif st.session_state.current_mode == "nemt_cet" and st.session_state.selected_nemt_cet and st.session_state.nemt_cet_path:
        data = nemt_cet_data.get(st.session_state.selected_nemt_cet, {})
        if len(data) == 1 and st.session_state.selected_nemt_cet in data:
            data = data[st.session_state.selected_nemt_cet]
        node = data
        for key in st.session_state.nemt_cet_path:
            node = node.get(key, {})
        if "words" in node and node["words"]:
            words_list = node["words"].split(" / ") if isinstance(node["words"], str) else node["words"]
            path_str = "_".join([str(p) for p in st.session_state.nemt_cet_path])
            for idx in range(len(words_list)):
                word_key = get_word_state_key("nemt_cet", st.session_state.selected_nemt_cet, [path_str], idx)
                current = st.session_state.learning_states.get(word_key, 0)
                if new_state == 1 and current == 0:
                    st.session_state.learning_states[word_key] = 1
                    updated = True
                elif new_state == 2 and current != 1:
                    st.session_state.learning_states[word_key] = 2
                    updated = True
    if updated:
        save_learning_states(st.session_state.learning_states)
        logger.info(f"[AUTO] {score_msg}")

def send_auto_page_greeting():
    if st.session_state.current_mode == "info_search":
        return
    full_page = get_current_page_full_content()
    if not full_page: return
    page_key = get_current_page_key()
    if page_key in st.session_state.page_greeted: return
    st.session_state.page_greeted.add(page_key)
    greeting_prompt = f"""The user just opened a new content page. Give a structuredBRIEF intro (2-3 sentences max):
1. State what this section covers
2. End with ONE concise thought-provoking question to activate prior knowledge

Content summary:
{full_page[:600]}

RULES: No emojis. Under 60 words total. Be direct."""
    try:
        from config import AVAILABLE_MODELS
        current_model_config = next((cfg for cfg in AVAILABLE_MODELS.values() if cfg["id"] == st.session_state.model_name), {})
        provider = current_model_config.get("provider", "groq")
        if provider == "google":
            google_api_key = st.secrets.get("GOOGLE_API_KEY")
            genai.configure(api_key=google_api_key)
            model = genai.GenerativeModel(current_model_config["id"])
            response_obj = model.generate_content(greeting_prompt)
            greeting = parse_google_response(response_obj)
        else:
            response = client.chat.completions.create(
                model=st.session_state.model_name,
                messages=[{"role": "system", "content": "You are a concise learning assistant. No emojis."},
                          {"role": "user", "content": greeting_prompt}],
                temperature=0.7,
                max_tokens=120,
            )
            greeting = response.choices[0].message.content.strip()
        if greeting:
            st.session_state.messages.append({"role": "assistant", "content": greeting})
            st.session_state.conv_history.append({"role": "assistant", "content": greeting})
    except Exception as e:
        logger.error(f"[AUTO] Greeting error: {e}")

def pregenerate_quiz_for_page(page_key):
    if st.session_state.current_mode == "info_search":
        return
    if page_key in st.session_state.auto_quiz_cache: return
    full_page = get_current_page_full_content()
    if not full_page: return
    topic = "general"
    sec_match = re.search(r"Section: (.+)", full_page)
    if sec_match: topic = sec_match.group(1)
    def _do_generate():
        try:
            quiz_text = generate_quiz(client, topic, full_page)
            if quiz_text:
                questions =[line.strip() for line in quiz_text.split('\n') if re.match(r'^\d+[\.\s]', line.strip())]
                st.session_state.auto_quiz_cache[page_key] = {
                    "quiz_text": quiz_text, "topic": topic, "questions": questions
                }
        except Exception as e:
            logger.error(f"[AUTO] Quiz pre-gen error: {e}")
    executor = ThreadPoolExecutor(max_workers=1)
    executor.submit(_do_generate)
    executor.shutdown(wait=False)

def generate_and_save_summary():
    if not st.session_state.conv_history: return
    conv_text = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in st.session_state.conv_history])
    summary_prompt = f"Summarize concisely (2-3 sentences) the main topics.\n\nConversation:\n{conv_text}\n\nSummary:"
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": summary_prompt}],
            temperature=0.5, max_tokens=250,
        )
        new_summary = response.choices[0].message.content.strip()
        if st.session_state.conversation_summary:
            st.session_state.conversation_summary += "\n\n" + new_summary
        else:
            st.session_state.conversation_summary = new_summary
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        entry = f"\n## Summary - {timestamp}\n{new_summary}\n---\n"
        try:
            with open("conversation_summary.txt", "a+", encoding="utf-8") as f:
                f.seek(0)
                content = f.read()
                if not content: f.write("# Conversation Summaries\n\n")
                f.write(entry)
            with open("conversation_summary.txt", "r", encoding="utf-8") as f:
                save_to_github("conversation_summary.txt", f.read(), f"Add summary - {timestamp}")
        except: pass
        st.session_state.conv_history =[]
    except Exception as e:
        logger.error(f"Failed to generate summary: {e}")

def get_ai_reply(user_input):
    logger.info(f"User input: {user_input[:100]}...")
    if st.session_state.quiz_active and st.session_state.current_quiz:
        questions = st.session_state.current_quiz.get("questions",[])
        if user_input.lower().strip() in["give me answers", "show answers", "give answers", "show me the answers"]:
            reply = "I'd be happy to help! Let's go through the answers together. Which question would you like me to explain first?"
            st.session_state.quiz_active = False
            st.session_state.current_quiz = None
            st.session_state.quiz_answers = {}
            st.session_state.quiz_asked = False
            st.session_state.messages.append({"role": "assistant", "content": reply})
            st.session_state.conv_history.append({"role": "assistant", "content": reply})
            return
        lines = user_input.split('\n')
        all_matches =[]
        for line in lines:
            line = line.strip()
            if not line: continue
            match = re.match(r'^(\d+)[\.\:\-\s]+(.+)$', line)
            if match:
                all_matches.append((int(match.group(1)), match.group(2).strip()))
        if all_matches:
            for q_num, ans in all_matches:
                if 1 <= q_num <= len(questions):
                    st.session_state.quiz_answers[q_num] = ans
        else:
            answer_pattern = re.findall(r'(\d+)[\.\:\-\s]+([^,]+?)(?=\s*\d+[\.\:\-\s]|$)', user_input)
            if answer_pattern:
                for num_str, ans in answer_pattern:
                    q_num = int(num_str)
                    if 1 <= q_num <= len(questions):
                        st.session_state.quiz_answers[q_num] = ans.strip()
            else:
                current_q_num = len(st.session_state.quiz_answers) + 1
                if current_q_num <= len(questions):
                    st.session_state.quiz_answers[current_q_num] = user_input
        if len(st.session_state.quiz_answers) >= len(questions):
            qa_list =[f"Q{i+1}: {q}\nAns: {st.session_state.quiz_answers.get(i+1, 'No answer')}" for i, q in enumerate(questions)]
            eval_prompt = f"Evaluate these quiz answers GENEROUSLY.\n\n{chr(10).join(qa_list)}\nFormat:\n1: [✅/❌] - [brief explanation + Socratic question]\nTotal: X/{len(questions)}"
            try:
                eval_response = client.chat.completions.create(
                    model="llama-3.1-8b-instant", messages=[{"role": "user", "content": eval_prompt}], temperature=0.3
                )
                evaluation = eval_response.choices[0].message.content.strip()
                auto_update_word_states_from_quiz(evaluation)
                reply = evaluation + "\n\nGreat job! Let me know if you have any questions."
                st.session_state.quiz_active = False
                st.session_state.current_quiz = None
                st.session_state.quiz_answers = {}
                st.session_state.quiz_asked = False
                st.session_state.messages.append({"role": "assistant", "content": reply})
                st.session_state.conv_history.append({"role": "assistant", "content": reply})
                return
            except Exception as e:
                reply = f"Evaluation failed: {e}"
                st.session_state.messages.append({"role": "assistant", "content": reply})
                return
        else:
            answered = set(st.session_state.quiz_answers.keys())
            next_q_num = 1
            while next_q_num in answered: next_q_num += 1
            reply = f"Please answer Q{next_q_num}: {questions[next_q_num - 1] if next_q_num - 1 < len(questions) else ''}" if next_q_num <= len(questions) else "Please answer remaining questions."
            st.session_state.messages.append({"role": "assistant", "content": reply})
            st.session_state.conv_history.append({"role": "assistant", "content": reply})
            return
    st.session_state.messages.append({"role": "user", "content": user_input})
    st.session_state.user_msg_count += 1
    st.session_state.conv_history.append({"role": "user", "content": user_input})
    full_page = get_current_page_full_content()
    if full_page and len(full_page) > PAGE_CONTENT_MAX_CHARS:
        full_page = full_page[:PAGE_CONTENT_MAX_CHARS] + "\n...[truncated]"
    context_msgs = st.session_state.messages.copy()
    if st.session_state.language:
        context_msgs.insert(1, {"role": "system", "content": f"Learning {st.session_state.language}."})
    if full_page:
        context_msgs.insert(2 if st.session_state.language else 1, {"role": "system", "content": full_page})
    if st.session_state.conversation_summary:
        context_msgs.insert(len(context_msgs)-1, {"role": "system", "content": f"[Summary]\n{st.session_state.conversation_summary}"})
    context_msgs.append({
        "role": "system",
        "content": f"TEACHING PRINCIPLES:\n{TEACHING_PRINCIPLES}\nMANDATORY: Use Analogy, Examples, Socratic questions. Don't give direct answers unless explicitly asked."
    })
    context_msgs = _truncate_context_msgs(context_msgs)
    try:
        from config import AVAILABLE_MODELS
        current_model_config = next((cfg for cfg in AVAILABLE_MODELS.values() if cfg["id"] == st.session_state.model_name), {})
        provider = current_model_config.get("provider", "groq")
        if provider == "google":
            google_api_key = st.secrets.get("GOOGLE_API_KEY")
            genai.configure(api_key=google_api_key)
            model = genai.GenerativeModel(current_model_config["id"])
            conversation_history = ""
            for msg in context_msgs:
                role = "User" if msg["role"] == "user" else "Assistant"
                content = msg.get("content", "")
                if isinstance(content, list):
                    texts = [c["text"] for c in content if c.get("type") == "text"]
                    content_str = " ".join(texts) + "[Image attached]"
                else:
                    content_str = str(content)
                conversation_history += f"{role}: {content_str}\n"
            prompt = f"【Rules】\n{TEACHING_PRINCIPLES}\n\n【Page】\n{full_page}\n\n【History】\n{conversation_history}\n\nUser: {user_input}\nAssistant:"
            response_obj = model.generate_content(prompt)
            reply = parse_google_response(response_obj)
        else:
            response = client.chat.completions.create(
                model=st.session_state.model_name,
                messages=context_msgs,
                temperature=0.7,
                max_tokens=st.session_state.model_resp_tokens,
            )
            reply = response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"AI reply error: {e}")
        reply = f"[Error processing request: {e}]"
    st.session_state.messages.append({"role": "assistant", "content": reply})
    st.session_state.conv_history.append({"role": "assistant", "content": reply})
    if st.session_state.user_msg_count % 5 == 0 and st.session_state.user_msg_count > 0:
        generate_and_save_summary()

def get_ai_reply_with_image(user_input, image_bytes):
    logger.info(f"User input with image: {user_input[:100]}...")
    full_page = get_current_page_full_content()
    history = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in st.session_state.conv_history[-4:]])
    context_text = f"Context:\n{full_page}\n\nHistory:\n{history}\n\nUser: {user_input}"
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    mime_type = st.session_state.get("image_mime", "image/jpeg")
    st.session_state.messages.append({
        "role": "user",
        "content":[
            {"type": "text", "text": user_input},
            {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{image_base64}"}}
        ]
    })
    st.session_state.conv_history.append({"role": "user", "content": f"{user_input} [Image Uploaded]"})
    try:
        from config import AVAILABLE_MODELS
        current_model_config = next((cfg for cfg in AVAILABLE_MODELS.values() if cfg["id"] == st.session_state.model_name), {})
        provider = current_model_config.get("provider", "groq")
        if provider == "google":
            google_api_key = st.secrets.get("GOOGLE_API_KEY")
            genai.configure(api_key=google_api_key)
            model = genai.GenerativeModel(current_model_config["id"])
            img = Image.open(io.BytesIO(image_bytes))
            response_obj = model.generate_content([context_text, img])
            reply = parse_google_response(response_obj)
        else:
            messages_vision =[{"role": "system", "content": "Analyze the image. " + TEACHING_PRINCIPLES}]
            messages_vision.append({
                "role": "user",
                "content":[
                    {"type": "text", "text": context_text},
                    {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{image_base64}"}}
                ]
            })
            response = client.chat.completions.create(
                model=st.session_state.model_name,
                messages=messages_vision,
                temperature=0.7,
                max_tokens=st.session_state.model_resp_tokens,
            )
            reply = response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"AI image processing error: {e}")
        reply = f"[Error processing image: {e}]"
    st.session_state.messages.append({"role": "assistant", "content": reply})
    st.session_state.conv_history.append({"role": "assistant", "content": reply})

_has_content_page = (
    (st.session_state.current_mode == "textbook" and st.session_state.level and len(st.session_state.path) > 1)
    or (st.session_state.current_mode == "nemt_cet" and st.session_state.selected_nemt_cet and st.session_state.nemt_cet_path)
)
if _has_content_page:
    try:
        _current_nav_key = get_current_page_key()
        if _current_nav_key != st.session_state.last_nav_page_key:
            st.session_state.last_nav_page_key = _current_nav_key
            send_auto_page_greeting()
            pregenerate_quiz_for_page(_current_nav_key)
    except Exception as _e:
        logger.error(f"[AUTO] Page-change hook error: {_e}")

render_sidebar(levels_data, nemt_cet_data, client, system_prompt, get_current_page_full_content, get_ai_reply)

if st.session_state.current_mode == "info_search":
    show_info_search()
elif st.session_state.current_mode == "hf_course":
    st.markdown("## Hugging Face Course")
    lang = st.session_state.hf_course_lang
    data = st.session_state.hf_course_data_en if lang == "en" else st.session_state.hf_course_data_zh
    if not data:
        st.warning("Course data not loaded. Please check the path.")
    else:
        col1, col2 = st.columns([1, 3])
        with col1:
            st.markdown("### Table of Contents")
            for chapter_key, chapter_info in data.items():
                # 生成章节状态键
                chapter_state_key = get_page_state_key("hf_course", f"chapter_{lang}_{chapter_key}")
                current_chapter_state = st.session_state.learning_states.get(chapter_state_key, 0)
                chapter_icon = get_page_state_icon(current_chapter_state)
                # 在 expander 标题旁显示状态按钮（两列布局）
                exp_col1, exp_col2 = st.columns([1, 10])
                with exp_col1:
                    if st.button(chapter_icon, key=f"hf_chapter_state_{chapter_key}", help=f"Mark chapter: {['Not Started','Learned','Need Review'][current_chapter_state]}"):
                        st.session_state.learning_states[chapter_state_key] = next_page_state(current_chapter_state)
                        save_learning_states(st.session_state.learning_states)
                        st.rerun()
                with exp_col2:
                    with st.expander(chapter_info["name"], expanded=False):
                        # 小节列表：不使用 columns，直接显示普通按钮（无状态图标）
                        for sec_key, sec_info in chapter_info["sections"].items():
                            label = sec_info["name"]
                            if st.button(label, key=f"hf_{chapter_key}_{sec_key}", use_container_width=True):
                                st.session_state.hf_course_current_chapter = chapter_key
                                st.session_state.hf_course_current_section = sec_key
                                st.rerun()
        with col2:
            if st.session_state.hf_course_current_chapter and st.session_state.hf_course_current_section:
                chapter = st.session_state.hf_course_current_chapter
                section = st.session_state.hf_course_current_section
                # 当前小节状态键
                current_section_state_key = get_page_state_key("hf_course", f"section_{lang}_{chapter}_{section}")
                current_state = st.session_state.learning_states.get(current_section_state_key, 0)
                # 显示标题和状态按钮
                col_title, col_state = st.columns([5, 1])
                with col_title:
                    st.markdown(f"### {chapter} - {section}")
                with col_state:
                    state_icon = get_page_state_icon(current_state)
                    if st.button(f"{state_icon} Mark", key="hf_current_section_state", help=f"Current status: {['Not Started','Learned','Need Review'][current_state]}"):
                        st.session_state.learning_states[current_section_state_key] = next_page_state(current_state)
                        save_learning_states(st.session_state.learning_states)
                        st.rerun()
                base_path = Path("Course-main/chapters") / lang
                mdx_file = base_path / chapter / f"{section}.mdx"
                if mdx_file.exists():
                    content = mdx_file.read_text(encoding="utf-8")
                    st.markdown(content, unsafe_allow_html=True)
                else:
                    st.error(f"File not found: {mdx_file}")
                
                # ========== 笔记区域（基于文件系统 + 实时预览） ==========
                st.markdown("---")
                st.markdown("### Your Notes & Annotations")
                st.markdown("Write your thoughts, summaries, or questions using **Markdown**.")
                
                # 生成笔记标识符：模式为 "hf_course"，标识符为 "lang/chapter/section"
                note_identifier = f"{lang}/{chapter}/{section}"
                current_note_content = load_note("hf_course", note_identifier)
                
                # 左右两栏：编辑区 + 预览区
                col_edit, col_preview = st.columns(2)
                with col_edit:
                    edited_content = st.text_area(
                        "Markdown Editor",
                        value=current_note_content,
                        height=400,
                        key=f"hf_note_editor_{note_identifier}",
                        placeholder="""# Your Notes

Write your notes here using Markdown:

## Key Concepts
- **Important term**: definition
- *Key idea*: explanation

## Questions
1. What does this mean?
2. How does this connect to...

## Summary
> A brief summary of this section

## Personal Thoughts
*My reflections on this topic...*
"""
                    )
                with col_preview:
                    st.markdown("### Live Preview")
                    st.markdown("---")
                    if edited_content:
                        st.markdown(edited_content)
                    else:
                        st.markdown("*No content to preview*")
                
                # 保存按钮
                if st.button("Save Notes", key="hf_save_file_notes", use_container_width=True):
                    if edited_content != current_note_content:
                        success = save_note("hf_course", note_identifier, edited_content)
                        if success:
                            st.success("Notes saved successfully!")
                            time.sleep(0.5)
                            st.rerun()
                        else:
                            st.error("Failed to save notes.")
                    else:
                        st.info("No changes to save.")
                # ========== 结束笔记区域 ==========
            else:
                st.info("Select a section from the table of contents.")
elif st.session_state.current_mode == "notes_browser":
    show_notes_browser()
else:
    render_main_content(levels_data, nemt_cet_data, client, get_current_page_full_content, get_page_recommendations, get_ai_reply)