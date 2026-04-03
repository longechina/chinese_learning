# state/session.py
import streamlit as st
from config import AVAILABLE_MODELS, DEFAULT_MODEL

def init_session_state():
    # 模型状态
    if "selected_model" not in st.session_state:
        st.session_state.selected_model = DEFAULT_MODEL
    if "model_name" not in st.session_state:
        st.session_state.model_name = AVAILABLE_MODELS[DEFAULT_MODEL]["id"]
    if "model_max_tokens" not in st.session_state:
        st.session_state.model_max_tokens = AVAILABLE_MODELS[DEFAULT_MODEL]["max_tokens"]
    # resp_tokens = 实际传给 API 的输出预算（不是上下文窗口大小）
    if "model_resp_tokens" not in st.session_state:
        st.session_state.model_resp_tokens = AVAILABLE_MODELS[DEFAULT_MODEL]["resp_tokens"]
    
    # 语言和模式
    if "language" not in st.session_state:
        st.session_state.language = "Chinese"
    if "current_mode" not in st.session_state:
        st.session_state.current_mode = "textbook"
    if "selected_nemt_cet" not in st.session_state:
        st.session_state.selected_nemt_cet = None
    if "nemt_cet_path" not in st.session_state:
        st.session_state.nemt_cet_path = []
    if "level" not in st.session_state:
        st.session_state.level = None
    if "path" not in st.session_state:
        st.session_state.path = []
    
    # NLP 教材状态
    if "nlp_selected_chapter" not in st.session_state:
        st.session_state.nlp_selected_chapter = None
    if "nlp_selected_section" not in st.session_state:
        st.session_state.nlp_selected_section = None
    if "nlp_notes_editing" not in st.session_state:
        st.session_state.nlp_notes_editing = False
    if "nlp_current_notes" not in st.session_state:
        st.session_state.nlp_current_notes = ""
    
    # 聊天状态
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "conversation_summary" not in st.session_state:
        st.session_state.conversation_summary = ""
    if "conv_history" not in st.session_state:
        st.session_state.conv_history = []
    if "user_msg_count" not in st.session_state:
        st.session_state.user_msg_count = 0
    if "chat_open" not in st.session_state:
        st.session_state.chat_open = True
    if "pending_tts" not in st.session_state:
        st.session_state.pending_tts = None
    if "last_audio_id" not in st.session_state:
        st.session_state.last_audio_id = None
    
    # Quiz 状态
    if "quiz_active" not in st.session_state:
        st.session_state.quiz_active = False
    if "current_quiz" not in st.session_state:
        st.session_state.current_quiz = None
    if "quiz_answers" not in st.session_state:
        st.session_state.quiz_answers = {}
    if "quiz_asked" not in st.session_state:
        st.session_state.quiz_asked = False
    
    # 搜索状态
    if "search_keyword" not in st.session_state:
        st.session_state.search_keyword = ""
    if "search_results" not in st.session_state:
        st.session_state.search_results = []
    if "search_scope" not in st.session_state:
        st.session_state.search_scope = "global"
    
    # 其他状态
    if "flip_states" not in st.session_state:
        st.session_state.flip_states = {}
    if "page_recommendations" not in st.session_state:
        st.session_state.page_recommendations = {}
    if "current_page_key" not in st.session_state:
        st.session_state.current_page_key = None
    
    # 学习状态相关
    if "learning_states" not in st.session_state:
        st.session_state.learning_states = {}
    if "vocab_filter" not in st.session_state:
        st.session_state.vocab_filter = "all"
    if "word_flip_states" not in st.session_state:
        st.session_state.word_flip_states = {}

    # ========== 自动化系统新增状态 ==========
    # 记录已发过问候的页面，避免重复
    if "page_greeted" not in st.session_state:
        st.session_state.page_greeted = set()
    
    # Quiz 预缓存：page_key → {"quiz_text": ..., "topic": ..., "questions": [...]}
    if "auto_quiz_cache" not in st.session_state:
        st.session_state.auto_quiz_cache = {}
    
    # 上一次的页面键（检测导航切换）
    if "last_nav_page_key" not in st.session_state:
        st.session_state.last_nav_page_key = None
    
    # NEMT 词汇翻译缓存：word → translation
    if "nemt_translation_cache" not in st.session_state:
        st.session_state.nemt_translation_cache = {}
    
    # 已完成自动批量翻译的页面键
    if "nemt_page_translated" not in st.session_state:
        st.session_state.nemt_page_translated = set()
    # ========== 结束 ==========

    # ========== Hugging Face 课程状态 ==========
    if "hf_course_data_en" not in st.session_state:
        st.session_state.hf_course_data_en = {}      # 英文课程数据
    if "hf_course_data_zh" not in st.session_state:
        st.session_state.hf_course_data_zh = {}      # 中文课程数据
    if "hf_course_lang" not in st.session_state:
        st.session_state.hf_course_lang = "en"       # 当前选择的语言: "en" 或 "zh-CN"
    if "hf_course_current_chapter" not in st.session_state:
        st.session_state.hf_course_current_chapter = None   # 当前章节 key，如 "chapter1"
    if "hf_course_current_section" not in st.session_state:
        st.session_state.hf_course_current_section = None   # 当前小节 key，如 "1"
    if "hf_course_path" not in st.session_state:
        st.session_state.hf_course_path = []                 # 导航路径（可选）
    if "hf_course_file_content" not in st.session_state:
        st.session_state.hf_course_file_content = None       # 缓存当前显示的文件内容

    # ========== 笔记浏览器模式状态 ==========
    if "notes_browser_current_path" not in st.session_state:
        st.session_state.notes_browser_current_path = None   # 当前选中的笔记文件相对路径
    if "notes_browser_edit_content" not in st.session_state:
        st.session_state.notes_browser_edit_content = ""     # 当前编辑的笔记内容
    # ========== 结束 ==========