#!/usr/bin/env python3
import subprocess
import sys

def serve_website(lang_code):
    """启动 doc-builder 预览服务器"""
    print(f"正在构建并启动 {lang_code} 网站预览...")
    cmd = [
        "doc-builder", "preview", "course",
        f"./chapters/{lang_code}",
        "--not_python_module"
    ]
    subprocess.run(cmd)

if __name__ == "__main__":
    print("请选择语言：")
    print("1. 英文 (en)")
    print("2. 简体中文 (zh-CN)")
    choice = input("输入数字 (1 或 2): ").strip()
    if choice == "1":
        serve_website("en")
    elif choice == "2":
        serve_website("zh-CN")
    else:
        print("无效选择")
        sys.exit(1)
