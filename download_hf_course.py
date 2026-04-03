import os
from huggingface_hub import snapshot_download
from pathlib import Path

# 配置下载参数
REPO_ID = "huggingface/course"
LOCAL_DIR = "./huggingface_course"  # 本地保存路径
ALLOW_PATTERNS = ["*.mdx", "*.md", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg"]  # 只下载文本和图片

def download_course():
    """下载Hugging Face课程仓库"""
    print(f"开始从 {REPO_ID} 下载课程...")
    print(f"文件将保存到: {os.path.abspath(LOCAL_DIR)}")
    
    try:
        # 执行下载，snapshot_download会下载整个仓库的快照
        local_path = snapshot_download(
            repo_id=REPO_ID,
            local_dir=LOCAL_DIR,
            allow_patterns=ALLOW_PATTERNS,
            local_dir_use_symlinks=False,  # 不使用符号链接，直接复制文件
            resume_download=True,           # 支持断点续传
        )
        print(f"下载完成！文件保存在: {local_path}")
        print("\n文件结构预览：")
        for root, dirs, files in os.walk(local_path):
            level = root.replace(local_path, '').count(os.sep)
            indent = ' ' * 2 * level
            print(f"{indent}{os.path.basename(root)}/")
            subindent = ' ' * 2 * (level + 1)
            for file in files[:5]:  # 每个目录最多显示5个文件
                print(f"{subindent}{file}")
            if len(files) > 5:
                print(f"{subindent}... 还有 {len(files) - 5} 个文件")
    except Exception as e:
        print(f"下载过程中出现错误: {e}")

if __name__ == "__main__":
    download_course()
