import streamlit as st
import json
import os
import time
import base64
from groq import Groq

# Page config
st.set_page_config(
    layout="wide", 
    page_title="Chinese Learning",
    initial_sidebar_state="collapsed",
    menu_items=None
)

# ========== 初始化 session state ==========
if "language" not in st.session_state:
    st.session_state.language = "Chinese"

if "level" not in st.session_state:
    st.session_state.level = None
if "path" not in st.session_state:
    st.session_state.path = []

# 聊天相关状态
if "chat_open" not in st.session_state:
    st.session_state.chat_open = False
if "messages" not in st.session_state:
    system_prompt = "You are a helpful Chinese learning assistant."
    st.session_state.messages = [{"role": "system", "content": system_prompt}]
if "auto_ref_pushed" not in st.session_state:
    st.session_state.auto_ref_pushed = False
if "current_recommendations" not in st.session_state:
    st.session_state.current_recommendations = None

# ========== 加载数据 ==========
@st.cache_data
def load_level_data(language):
    levels = {}
    suffix = "_en" if language == "English" else ""
    for i in range(1, 4):
        filename = f"level{i}{suffix}.json"
        with open(filename, "r", encoding="utf-8") as f:
            levels[f"Level {i}"] = json.load(f)
    return levels

levels_data = load_level_data(st.session_state.language)

# ========== Groq 客户端 ==========
groq_api_key = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=groq_api_key) if groq_api_key else None

# ========== CSS样式 - Teddy Ninh风格 ==========
st.markdown(f"""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
    
    /* 全局重置 */
    * {{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }}
    
    /* 主容器 */
    .stApp {{
        background-color: #1a1a1a;
        color: #ffffff;
        font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
    }}
    
    /* 隐藏Streamlit元素 */
    header[data-testid="stHeader"] {{
        display: none !important;
    }}
    #MainMenu, footer {{
        display: none !important;
    }}
    
    /* 顶部导航栏 */
    .top-nav {{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        background: #1a1a1a;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 60px;
        z-index: 1000;
    }}
    
    .top-nav-title {{
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 0.5px;
    }}
    
    .top-nav-brand {{
        font-size: 14px;
        font-weight: 300;
        color: rgba(255,255,255,0.5);
    }}
    
    .top-nav-links {{
        display: flex;
        gap: 40px;
    }}
    
    .top-nav-link {{
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        text-decoration: none;
        transition: opacity 0.2s;
    }}
    
    .top-nav-link:hover {{
        opacity: 0.6;
    }}
    
    /* 主内容区域 */
    .main-content {{
        margin-top: 70px;
        padding: 80px 60px 60px;
        min-height: calc(100vh - 70px);
    }}
    
    /* 超大标题 - Teddy风格 */
    .hero-title {{
        font-size: 120px;
        font-weight: 800;
        line-height: 0.9;
        margin-bottom: 40px;
        letter-spacing: -3px;
        color: #ffffff;
    }}
    
    /* 标签 */
    .label {{
        font-size: 14px;
        font-weight: 500;
        color: rgba(255,255,255,0.5);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }}
    
    /* Level按钮容器 */
    .level-buttons {{
        display: flex;
        gap: 30px;
        margin: 60px 0;
    }}
    
    /* Level按钮 - Teddy风格 */
    .stButton button {{
        background: transparent !important;
        border: 2px solid rgba(255,255,255,0.2) !important;
        color: #ffffff !important;
        font-family: 'Manrope', sans-serif !important;
        font-size: 48px !important;
        font-weight: 700 !important;
        padding: 40px 60px !important;
        border-radius: 0 !important;
        transition: all 0.3s ease !important;
        letter-spacing: -1px !important;
        text-align: left !important;
    }}
    
    .stButton button:hover {{
        background: rgba(255,255,255,0.05) !important;
        border-color: rgba(255,255,255,0.4) !important;
        transform: translateX(10px);
    }}
    
    /* 面包屑导航 */
    .breadcrumb {{
        font-size: 16px;
        font-weight: 400;
        color: rgba(255,255,255,0.5);
        margin-bottom: 40px;
        letter-spacing: 0.5px;
    }}
    
    /* 内容卡片 */
    .content-card {{
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        padding: 40px;
        margin-bottom: 30px;
        transition: all 0.3s ease;
    }}
    
    .content-card:hover {{
        background: rgba(255,255,255,0.05);
        border-color: rgba(255,255,255,0.2);
    }}
    
    .content-title {{
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 20px;
        letter-spacing: -0.5px;
    }}
    
    .content-text {{
        font-size: 16px;
        font-weight: 300;
        line-height: 1.6;
        color: rgba(255,255,255,0.8);
    }}
    
    /* 返回按钮 */
    .back-btn {{
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255,255,255,0.5);
        text-decoration: none;
        margin-bottom: 40px;
        transition: all 0.2s;
        cursor: pointer;
    }}
    
    .back-btn:hover {{
        color: #ffffff;
        transform: translateX(-5px);
    }}
    
    /* 语言选择器 */
    .language-selector {{
        position: fixed;
        top: 20px;
        right: 60px;
        z-index: 1001;
        display: flex;
        gap: 10px;
        align-items: center;
    }}
    
    .language-selector select {{
        background: transparent !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        color: #ffffff !important;
        font-family: 'Manrope', sans-serif !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        padding: 8px 16px !important;
        border-radius: 0 !important;
    }}
    
    /* 推荐资源 */
    .recommendations {{
        margin-top: 80px;
        padding-top: 60px;
        border-top: 1px solid rgba(255,255,255,0.1);
    }}
    
    .recommendations h3 {{
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 30px;
        letter-spacing: -0.5px;
    }}
    
    .recommendations a {{
        color: #ffffff;
        text-decoration: underline;
        text-decoration-color: rgba(255,255,255,0.3);
        transition: all 0.2s;
    }}
    
    .recommendations a:hover {{
        text-decoration-color: #ffffff;
    }}
    
    /* AI聊天按钮 */
    .chat-toggle {{
        position: fixed;
        bottom: 40px;
        right: 60px;
        width: 60px;
        height: 60px;
        background: #ffffff;
        color: #1a1a1a;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s;
        z-index: 999;
    }}
    
    .chat-toggle:hover {{
        transform: scale(1.1);
    }}
    
    /* AI聊天面板 */
    .chat-panel {{
        position: fixed;
        bottom: 120px;
        right: 60px;
        width: 450px;
        height: 600px;
        background: #1a1a1a;
        border: 1px solid rgba(255,255,255,0.2);
        display: flex;
        flex-direction: column;
        z-index: 998;
    }}
    
    .chat-header {{
        padding: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 600;
    }}
    
    .chat-messages {{
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    }}
    
    .chat-message {{
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(255,255,255,0.05);
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255,255,255,0.9);
    }}
    
    .chat-input-area {{
        padding: 20px;
        border-top: 1px solid rgba(255,255,255,0.1);
    }}
    
    /* 隐藏Streamlit默认元素 */
    .stChatInput {{
        background: transparent !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        color: #ffffff !important;
    }}
    
    /* 响应式 */
    @media (max-width: 768px) {{
        .hero-title {{
            font-size: 60px;
        }}
        .main-content {{
            padding: 40px 30px;
        }}
        .top-nav {{
            padding: 0 30px;
        }}
    }}
</style>
""", unsafe_allow_html=True)

# ========== 顶部导航 ==========
st.markdown("""
<div class="top-nav">
    <div class="top-nav-title">Chinese Learning</div>
    <div class="top-nav-links">
        <a href="#" class="top-nav-link">Levels</a>
        <a href="#" class="top-nav-link">About</a>
    </div>
</div>
""", unsafe_allow_html=True)

# ========== 语言选择器 ==========
st.markdown('<div class="language-selector">', unsafe_allow_html=True)
new_language = st.selectbox("", ["Chinese", "English"], 
                            index=0 if st.session_state.language == "Chinese" else 1,
                            key="lang_selector",
                            label_visibility="collapsed")
st.markdown('</div>', unsafe_allow_html=True)

if new_language != st.session_state.language:
    st.session_state.language = new_language
    levels_data = load_level_data(st.session_state.language)
    st.session_state.level = None
    st.session_state.path = []
    st.session_state.auto_ref_pushed = False
    st.session_state.current_recommendations = None
    st.rerun()

# ========== 主内容 ==========
st.markdown('<div class="main-content">', unsafe_allow_html=True)

if st.session_state.level is None:
    # 首页 - 超大标题风格
    st.markdown('<div class="label">Language Learning Platform</div>', unsafe_allow_html=True)
    st.markdown('<h1 class="hero-title">Choose<br>Your Level</h1>', unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    with col1:
        if st.button("Level 1", use_container_width=True):
            st.session_state.level = 1
            st.session_state.path = ["LEVEL_I"]
            st.session_state.auto_ref_pushed = False
            st.session_state.current_recommendations = None
            st.rerun()
    
    with col2:
        if st.button("Level 2", use_container_width=True):
            st.session_state.level = 2
            st.session_state.path = ["LEVEL_II"]
            st.session_state.auto_ref_pushed = False
            st.session_state.current_recommendations = None
            st.rerun()
    
    with col3:
        if st.button("Level 3", use_container_width=True):
            st.session_state.level = 3
            st.session_state.path = ["LEVEL_III"]
            st.session_state.auto_ref_pushed = False
            st.session_state.current_recommendations = None
            st.rerun()

else:
    # 内容页面
    level_name = f"Level {st.session_state.level}"
    data = levels_data[level_name]
    
    # 获取当前节点
    current_node = data
    for key in st.session_state.path[1:]:
        if "children" in current_node and key in current_node["children"]:
            current_node = current_node["children"][key]
    
    # 面包屑
    bread = " > ".join(st.session_state.path)
    st.markdown(f'<div class="breadcrumb">{bread}</div>', unsafe_allow_html=True)
    
    # 返回按钮
    if len(st.session_state.path) > 1:
        if st.button("← Back", key="back_btn"):
            st.session_state.path.pop()
            st.session_state.auto_ref_pushed = False
            st.session_state.current_recommendations = None
            st.rerun()
    
    # 显示内容
    if "children" in current_node and current_node["children"]:
        # 显示子分类
        st.markdown(f'<div class="label">{level_name}</div>', unsafe_allow_html=True)
        st.markdown(f'<h1 class="hero-title">{current_node.get("name", "Topics")}</h1>', unsafe_allow_html=True)
        
        for key, child in current_node["children"].items():
            if st.button(child.get("name", key), key=f"child_{key}", use_container_width=True):
                st.session_state.path.append(key)
                st.session_state.auto_ref_pushed = False
                st.session_state.current_recommendations = None
                st.rerun()
    
    else:
        # 显示叶子节点内容
        st.markdown(f'<div class="label">{level_name}</div>', unsafe_allow_html=True)
        st.markdown(f'<h1 class="hero-title">{current_node.get("name", "Content")}</h1>', unsafe_allow_html=True)
        
        # 内容卡片
        if "notes" in current_node:
            st.markdown(f'''
            <div class="content-card">
                <div class="content-title">Notes</div>
                <div class="content-text">{current_node["notes"]}</div>
            </div>
            ''', unsafe_allow_html=True)
        
        if "example" in current_node:
            st.markdown(f'''
            <div class="content-card">
                <div class="content-title">Example</div>
                <div class="content-text">{current_node["example"]}</div>
            </div>
            ''', unsafe_allow_html=True)
        
        if "vocabulary" in current_node and current_node["vocabulary"]:
            vocab_html = "<br>".join(current_node["vocabulary"])
            st.markdown(f'''
            <div class="content-card">
                <div class="content-title">Vocabulary</div>
                <div class="content-text">{vocab_html}</div>
            </div>
            ''', unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

# ========== AI聊天按钮 ==========
if st.button("AI", key="chat_toggle"):
    st.session_state.chat_open = not st.session_state.chat_open
    st.rerun()

# ========== AI聊天面板 ==========
if st.session_state.chat_open:
    st.markdown("""
    <div class="chat-panel">
        <div class="chat-header">AI Learning Assistant</div>
    """, unsafe_allow_html=True)
    
    # 聊天消息
    st.markdown('<div class="chat-messages">', unsafe_allow_html=True)
    for msg in st.session_state.messages[1:]:  # Skip system message
        role = "You" if msg["role"] == "user" else "AI"
        st.markdown(f'<div class="chat-message"><strong>{role}:</strong> {msg["content"]}</div>', 
                   unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # 聊天输入
    st.markdown('<div class="chat-input-area">', unsafe_allow_html=True)
    user_input = st.chat_input("Type your message...")
    if user_input:
        st.session_state.messages.append({"role": "user", "content": user_input})
        # 这里可以添加AI响应逻辑
        st.rerun()
    st.markdown('</div>', unsafe_allow_html=True)
    
    st.markdown('</div>', unsafe_allow_html=True)
