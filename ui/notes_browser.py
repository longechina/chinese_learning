# ui/notes_browser.py
import streamlit as st
from pathlib import Path
from utils.data_loader import (
    NOTES_ROOT,
    get_notes_tree,
    load_note,
    save_note,
    get_all_notes,
    get_note_path
)

def show_notes_browser():
    """笔记浏览器主界面"""
    st.title("Notes Browser")
    st.markdown("Browse, edit, and manage your markdown notes from NLP and Hugging Face courses.")

    # 获取笔记目录树（支持两种模式）
    nlp_tree = get_notes_tree("nlp")
    hf_tree = get_notes_tree("hf_course")
    
    # 合并显示：让用户先选择笔记来源
    source_options = ["NLP Textbook", "Hugging Face Course"]
    selected_source = st.radio("Select source", source_options, horizontal=True)

    if selected_source == "NLP Textbook":
        tree = nlp_tree
        mode = "nlp"
    else:
        tree = hf_tree
        mode = "hf_course"

    # 获取所有笔记的相对路径列表（用于快速选择）
    all_notes = get_all_notes(mode)
    
    # 左右布局：左侧目录树/列表，右侧编辑器
    col_left, col_right = st.columns([1, 2])

    with col_left:
        st.markdown("### Notes")
        if not all_notes:
            st.info("No notes found. Create a note by visiting a course section and writing in the notes editor.")
        else:
            # 简单列表选择（可扩展为树形控件，为简化使用 selectbox）
            selected_note = st.selectbox(
                "Select a note",
                options=all_notes,
                format_func=lambda x: x.replace("/", " › "),
                key="notes_browser_select"
            )
            if selected_note:
                st.session_state.notes_browser_current_path = selected_note

    with col_right:
        current_path = st.session_state.get("notes_browser_current_path")
        if current_path and current_path in all_notes:
            note_content = load_note(mode, current_path)
            # 显示当前笔记路径
            st.markdown(f"**Path:** `{current_path}`")
            # 编辑区与预览区（左右分栏）
            col_edit, col_preview = st.columns(2)
            with col_edit:
                edited_content = st.text_area(
                    "Markdown Editor",
                    value=note_content,
                    height=500,
                    key=f"notes_browser_editor_{current_path}"
                )
            with col_preview:
                st.markdown("### Live Preview")
                st.markdown("---")
                if edited_content:
                    st.markdown(edited_content)
                else:
                    st.markdown("*Empty*")
            # 保存按钮
            if st.button("Save Note", key="notes_browser_save"):
                if edited_content != note_content:
                    success = save_note(mode, current_path, edited_content)
                    if success:
                        st.success("Note saved!")
                        st.rerun()
                    else:
                        st.error("Failed to save note.")
                else:
                    st.info("No changes.")
            # 删除按钮
            if st.button("Delete Note", key="notes_browser_delete"):
                # 确认对话框（Streamlit 没有原生确认，用 session_state 简单处理）
                if "confirm_delete" not in st.session_state:
                    st.session_state.confirm_delete = True
                    st.warning("Click again to confirm deletion.")
                else:
                    from utils.data_loader import delete_note
                    success = delete_note(mode, current_path)
                    if success:
                        st.success("Note deleted.")
                        st.session_state.notes_browser_current_path = None
                        st.session_state.confirm_delete = False
                        st.rerun()
                    else:
                        st.error("Failed to delete note.")
        else:
            if current_path:
                st.warning(f"Note '{current_path}' not found.")
            else:
                st.info("Select a note from the left panel to view and edit.")

    # 添加新建笔记的功能（简单实现）
    st.markdown("---")
    with st.expander("➕ Create New Note"):
        new_note_path = st.text_input("Relative path (e.g., CHAPTER_1/1.1 or en/chapter0/1)", placeholder="CHAPTER_1/1.1")
        if st.button("Create and Edit"):
            if new_note_path:
                # 自动补全 .md 后缀
                if not new_note_path.endswith(".md"):
                    new_note_path = new_note_path + ".md"
                # 去除开头的 .md 后缀
                new_note_path = new_note_path.replace(".md", "")
                # 创建空文件
                note_file = get_note_path(mode, new_note_path)
                note_file.parent.mkdir(parents=True, exist_ok=True)
                if not note_file.exists():
                    note_file.write_text("", encoding="utf-8")
                st.session_state.notes_browser_current_path = new_note_path
                st.rerun()
            else:
                st.error("Please enter a path.")