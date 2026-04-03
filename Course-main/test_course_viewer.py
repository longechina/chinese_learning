import streamlit as st
from pathlib import Path

# 设置标题
st.set_page_config(page_title="Hugging Face Course Viewer (Test)", layout="wide")
st.title("📖 Hugging Face 课程阅读器 - 测试版")

# 课程源文件目录（根据你的实际路径修改）
COURSE_DIR = Path("/Users/longe/Downloads/Course-main/chapters/zh-CN")

if not COURSE_DIR.exists():
    st.error(f"目录不存在: {COURSE_DIR}")
    st.stop()

# 递归获取所有 .mdx 文件，构建一个字典：显示名称 -> 文件路径
def get_mdx_files():
    files = {}
    for mdx_path in sorted(COURSE_DIR.glob("**/*.mdx")):
        # 生成友好的显示名称，例如 "chapter0/1.mdx" -> "Chapter 0 - 1"
        rel = mdx_path.relative_to(COURSE_DIR)
        display = f"{rel.parent.name}/{rel.stem}"
        files[display] = mdx_path
    return files

mdx_files = get_mdx_files()

if not mdx_files:
    st.warning("未找到任何 .mdx 文件")
    st.stop()

# 侧边栏选择章节
selected_display = st.sidebar.selectbox("选择章节", list(mdx_files.keys()))
selected_path = mdx_files[selected_display]

# 读取文件内容
with open(selected_path, "r", encoding="utf-8") as f:
    content = f.read()

# 主区域显示内容（st.markdown 支持 Markdown + 远程图片）
st.markdown(content, unsafe_allow_html=True)

# 可选：显示原始内容（调试）
with st.expander("查看原始 Markdown"):
    st.code(content, language="markdown")
