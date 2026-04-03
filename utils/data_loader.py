# utils/data_loader.py
import json
import logging
import streamlit as st
from pathlib import Path

logger = logging.getLogger(__name__)

def load_quiz_template():
    try:
        with open("chinese_test_template.txt", "r", encoding="utf-8") as f:
            content = f.read()
            logger.info("Successfully loaded chinese_test_template.txt")
            return content
    except FileNotFoundError:
        logger.warning("chinese_test_template.txt not found, using default template")
        return """
1. 单选题（Multiple Choice）：
   题目描述：以下哪个选项最符合题意？
   A. 选项A
   B. 选项B
   C. 选项C
   D. 选项D

2. 填空题（Fill in the blank）：
   请用正确的词语完成以下句子：
   ______

3. 翻译题（Translation）：
   请将以下句子翻译成中文：
   ______
"""

def load_teaching_principles():
    try:
        with open("teaching_principle.txt", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return """Core: Guide, Don't Answer
NEVER give direct answers. Use guidance instead.
Guidance: Analogy, examples, simple words, Socratic questions
Feedback: Show score, indicate correct/incorrect. DO NOT give answers unless requested.
Log every quiz to feedback.md"""

@st.cache_data
def load_level_data(language):
    levels = {}
    suffix = "_en" if language == "English" else ""
    for i in range(1, 4):
        try:
            filename = f"data/level{i}{suffix}.json"
            with open(filename, "r", encoding="utf-8") as f:
                levels[f"Level {i}"] = json.load(f)
        except FileNotFoundError:
            st.error(f"{filename} not found. Please ensure all level files exist.")
            st.stop()
    return levels

@st.cache_data
def load_nemt_cet_data():
    nemt_cet_data = {}
    files_to_load = ["data/TEM-8.json", "data/NEMT.json", "data/CET-46.json"]
    
    for filename in files_to_load:
        try:
            with open(filename, "r", encoding="utf-8") as f:
                key = filename.replace('data/', '').replace('.json', '')
                nemt_cet_data[key] = json.load(f)
                logger.info(f"Successfully loaded {filename}")
        except FileNotFoundError:
            key = filename.replace('data/', '').replace('.json', '')
            logger.warning(f"{filename} not found")
            nemt_cet_data[key] = {}
        except json.JSONDecodeError as e:
            key = filename.replace('data/', '').replace('.json', '')
            logger.error(f"JSON parse error in {filename}: {e}")
            nemt_cet_data[key] = {}
    
    return nemt_cet_data


# ========== NLP 教材加载函数 ==========
@st.cache_data
def load_nlp_textbook_data():
    """
    加载 data/nlp/ 目录下的所有 nlpX.json 文件
    返回格式: {
        "CHAPTER_1": {...},
        "CHAPTER_2": {...},
        ...
    }
    """
    nlp_data = {}
    nlp_dir = Path("data/nlp")
    
    if not nlp_dir.exists():
        logger.warning(f"NLP directory not found: {nlp_dir}")
        return {}
    
    # 获取所有 nlp*.json 文件并排序
    nlp_files = sorted(nlp_dir.glob("nlp*.json"), key=lambda x: int(x.stem.replace("nlp", "")))
    
    for file_path in nlp_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                chapter_data = json.load(f)
                # 每个文件应该只有一个 CHAPTER_X 键
                for chapter_key, chapter_content in chapter_data.items():
                    nlp_data[chapter_key] = chapter_content
                    logger.info(f"Loaded {chapter_key} from {file_path.name}")
        except Exception as e:
            logger.error(f"Failed to load {file_path}: {e}")
    
    return nlp_data


def save_nlp_chapter_notes(chapter_key, section_key, notes_content):
    """
    保存 notes 到对应的 nlpX.json 文件
    
    Args:
        chapter_key: 例如 "CHAPTER_1"
        section_key: 例如 "1.1"
        notes_content: 用户输入的笔记内容
    """
    import re
    
    # 提取章节号
    match = re.search(r'CHAPTER_(\d+)', chapter_key)
    if not match:
        logger.error(f"Invalid chapter key: {chapter_key}")
        return False
    
    chapter_num = match.group(1)
    file_path = Path(f"data/nlp/nlp{chapter_num}.json")
    
    if not file_path.exists():
        logger.error(f"File not found: {file_path}")
        return False
    
    try:
        # 读取现有文件
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        # 更新 notes
        if chapter_key in data:
            if section_key in data[chapter_key]:
                data[chapter_key][section_key]["notes"] = notes_content
                logger.info(f"Updated notes for {chapter_key}/{section_key}")
            else:
                logger.warning(f"Section {section_key} not found in {chapter_key}")
                return False
        else:
            logger.warning(f"Chapter {chapter_key} not found in file")
            return False
        
        # 写回文件
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        logger.info(f"Saved notes to {file_path}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to save notes: {e}")
        return False


# ========== 学习状态管理函数 ==========
LEARNING_STATES_FILE = Path("data/learning_states.json")

def load_learning_states():
    """
    加载学习状态文件
    返回格式: {
        "textbook_level1_1.1_vocab_0": 1,  # 0=未学习, 1=已掌握, 2=需复习
        "textbook_level1_1.1_vocab_1": 0,
        ...
    }
    """
    try:
        if LEARNING_STATES_FILE.exists():
            with open(LEARNING_STATES_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load learning states: {e}")
    return {}


def save_learning_states(states):
    """
    保存学习状态到文件
    """
    try:
        with open(LEARNING_STATES_FILE, "w", encoding="utf-8") as f:
            json.dump(states, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        logger.error(f"Failed to save learning states: {e}")
        return False


def get_word_state_key(mode, level, path, word_index):
    """
    生成单词的唯一标识键
    Args:
        mode: "textbook" 或 "nemt_cet" 或 "nlp_textbook"
        level: 级别标识 (如 1, "TEM-8", "CHAPTER_1")
        path: 路径列表 (如 ["LEVEL_I", "1.1"])
        word_index: 单词在列表中的索引
    """
    if mode == "textbook":
        return f"textbook_level{level}_{'_'.join(path)}_vocab_{word_index}"
    elif mode == "nemt_cet":
        return f"nemt_cet_{level}_{'_'.join(path)}_word_{word_index}"
    elif mode == "nlp_textbook":
        return f"nlp_{level}_{'_'.join(path)}_word_{word_index}"
    else:
        return f"unknown_{level}_{'_'.join(path)}_{word_index}"


# ========== 页面级学习标记辅助函数（新增） ==========
# 状态常量：0=未开始，1=已学习，2=需复习（与词汇状态保持一致）
PAGE_STATE_ICONS = {0: "⚪", 1: "🟢", 2: "🔴"}
PAGE_STATE_LABELS = {0: "Not Started", 1: "Learned", 2: "Need Review"}
PAGE_STATE_NEXT = {0: 1, 1: 2, 2: 0}

def get_page_state_key(mode, identifier):
    """
    生成页面（章节/小节）的唯一标识键，用于学习状态标记。
    
    Args:
        mode: "nlp" 或 "hf_course"
        identifier: 唯一标识符，例如：
            - NLP 章节：f"nlp_chapter_{chapter_key}"
            - NLP 小节：f"nlp_section_{chapter_key}_{section_key}"
            - HF 章节：f"hf_chapter_{lang}_{chapter_key}"
            - HF 小节：f"hf_section_{lang}_{chapter_key}_{section_key}"
    Returns:
        str: 状态键，如 "page_nlp_chapter_CHAPTER_1"
    """
    return f"page_{mode}_{identifier}"

def get_page_state_icon(state):
    """返回状态对应的图标字符"""
    return PAGE_STATE_ICONS.get(state, "⚪")

def get_page_state_label(state):
    """返回状态对应的文字标签"""
    return PAGE_STATE_LABELS.get(state, "Not Started")

def next_page_state(current_state):
    """循环切换状态：0->1->2->0"""
    return PAGE_STATE_NEXT.get(current_state, 1)

# ========== Hugging Face 课程加载函数 ==========
import yaml

def load_hf_course_data(course_path):
    """
    加载 Hugging Face 课程（英文或中文）的章节目录。
    
    参数:
        course_path: str 或 Path，指向 chapters/en 或 chapters/zh-CN 的路径
    
    返回:
        dict: 结构如
        {
            "chapter0": {
                "name": "Chapter 0: Setup",
                "sections": {
                    "1": {"name": "Introduction", "file": "chapter0/1.mdx"},
                    ...
                }
            },
            ...
        }
    """
    base = Path(course_path)
    if not base.exists():
        raise FileNotFoundError(f"Course path not found: {base}")
    
    course_data = {}
    # 遍历所有子目录（chapter0, chapter1, ...）
    for chapter_dir in sorted(base.iterdir()):
        if not chapter_dir.is_dir():
            continue
        chapter_key = chapter_dir.name  # 例如 "chapter0"
        
        # 尝试读取 _toctree.yml 获取章节名称和顺序
        toctree_path = chapter_dir / "_toctree.yml"
        sections = {}
        chapter_display_name = chapter_key.capitalize()  # 默认显示名
        
        if toctree_path.exists():
            try:
                with open(toctree_path, 'r', encoding='utf-8') as f:
                    toc = yaml.safe_load(f)
                    # toc 是一个列表，每个元素可能是 dict，包含 title 和 sections
                    for item in toc:
                        if isinstance(item, dict):
                            if "title" in item:
                                chapter_display_name = item["title"]
                            if "sections" in item and isinstance(item["sections"], list):
                                for sec in item["sections"]:
                                    local = sec.get("local")
                                    title = sec.get("title")
                                    if local and title:
                                        sec_id = local.split('/')[-1]
                                        sections[sec_id] = {
                                            "name": title,
                                            "file": f"{chapter_key}/{sec_id}.mdx"
                                        }
            except Exception as e:
                logger.warning(f"Failed to parse {toctree_path}: {e}")
        
        # 如果 _toctree.yml 不存在或解析后 sections 为空，则回退到遍历 .mdx 文件
        if not sections:
            for mdx_file in sorted(chapter_dir.glob("*.mdx")):
                sec_id = mdx_file.stem
                try:
                    with open(mdx_file, 'r', encoding='utf-8') as f:
                        first_line = f.readline().strip()
                        if first_line.startswith('#'):
                            title = first_line.lstrip('#').strip()
                        else:
                            title = f"Section {sec_id}"
                except Exception:
                    title = f"Section {sec_id}"
                sections[sec_id] = {
                    "name": title,
                    "file": f"{chapter_key}/{mdx_file.name}"
                }
        
        if sections:
            course_data[chapter_key] = {
                "name": chapter_display_name,
                "sections": sections
            }
    
    return course_data


# ========== 笔记文件系统管理函数（新增） ==========
NOTES_ROOT = Path("notes")  # 笔记根目录，位于 app.py 同级

def ensure_notes_root():
    """确保笔记根目录存在"""
    NOTES_ROOT.mkdir(parents=True, exist_ok=True)

def get_note_path(mode, identifier):
    """
    根据模式和标识符生成笔记文件的完整路径。
    
    Args:
        mode: "nlp" 或 "hf_course"
        identifier: 唯一标识，例如对于 NLP 小节为 f"{chapter_key}/{section_key}"
                    对于 HF 小节为 f"{lang}/{chapter_key}/{section_key}"
    Returns:
        Path: 笔记文件路径（.md 文件）
    """
    ensure_notes_root()
    # 将标识符中的 '/' 转换为路径分隔符
    rel_path = Path(identifier)
    # 文件名使用标识符最后一部分 + .md，但为了保留完整路径，将整个 identifier 作为相对路径，最后加上 .md
    # 例如 identifier = "CHAPTER_1/1.1" -> notes/nlp/CHAPTER_1/1.1.md
    note_file = NOTES_ROOT / mode / rel_path.with_suffix(".md")
    note_file.parent.mkdir(parents=True, exist_ok=True)
    return note_file

def save_note(mode, identifier, content):
    """
    保存笔记内容到文件。
    
    Args:
        mode: "nlp" 或 "hf_course"
        identifier: 唯一标识符
        content: Markdown 文本
    Returns:
        bool: 是否成功
    """
    try:
        path = get_note_path(mode, identifier)
        path.write_text(content, encoding="utf-8")
        logger.info(f"Note saved: {path}")
        return True
    except Exception as e:
        logger.error(f"Failed to save note {identifier}: {e}")
        return False

def load_note(mode, identifier):
    """
    加载笔记内容，如果文件不存在则返回空字符串。
    
    Args:
        mode: "nlp" 或 "hf_course"
        identifier: 唯一标识符
    Returns:
        str: 笔记内容
    """
    path = get_note_path(mode, identifier)
    if path.exists():
        try:
            return path.read_text(encoding="utf-8")
        except Exception as e:
            logger.error(f"Failed to load note {identifier}: {e}")
            return ""
    return ""

def delete_note(mode, identifier):
    """
    删除笔记文件。
    """
    path = get_note_path(mode, identifier)
    if path.exists():
        try:
            path.unlink()
            logger.info(f"Note deleted: {path}")
            return True
        except Exception as e:
            logger.error(f"Failed to delete note {identifier}: {e}")
            return False
    return False

def get_notes_tree(mode):
    """
    获取指定模式下的笔记目录树结构。
    
    Args:
        mode: "nlp" 或 "hf_course"
    Returns:
        dict: 树结构，例如
        {
            "CHAPTER_1": {
                "is_dir": True,
                "children": {
                    "1.1": {"is_dir": False, "path": "CHAPTER_1/1.1"},
                    "1.2": ...
                }
            },
            ...
        }
    """
    root_dir = NOTES_ROOT / mode
    if not root_dir.exists():
        return {}
    
    tree = {}
    for file_path in root_dir.rglob("*.md"):
        # 相对路径，不含 .md 后缀
        rel = file_path.relative_to(root_dir).with_suffix("")
        parts = rel.parts
        current = tree
        for i, part in enumerate(parts):
            if part not in current:
                current[part] = {}
            if i == len(parts) - 1:
                # 叶子节点，标记为文件
                current[part] = {"is_file": True, "path": str(rel)}
            else:
                # 目录节点
                if not isinstance(current[part], dict):
                    current[part] = {}
                current = current[part]
    return tree

def get_all_notes(mode):
    """
    获取指定模式下所有笔记文件的路径列表（相对路径字符串）。
    """
    root_dir = NOTES_ROOT / mode
    if not root_dir.exists():
        return []
    return [str(p.relative_to(root_dir).with_suffix("")) for p in root_dir.rglob("*.md")]