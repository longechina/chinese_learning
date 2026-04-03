# build_all.py
#!/usr/bin/env python3
import subprocess
import sys
import shutil
from pathlib import Path

# ========== 配置 ==========
BASE_DIR = Path(__file__).parent
CHAPTERS_DIR = BASE_DIR / "chapters"
OUTPUT_WEBSITE = BASE_DIR / "build"          # 网站输出目录
OUTPUT_NOTEBOOKS = BASE_DIR / "notebooks"    # notebooks 输出目录
LANGUAGES = {
    "en": "English",
    "zh-CN": "简体中文"
}

# ========== 工具函数 ==========
def run_cmd(cmd, description):
    """执行命令，如果失败则退出"""
    print(f"\n>>> {description} ...")
    # 打印命令，便于调试
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=False)
    if result.returncode != 0:
        print(f"❌ 失败: {description}")
        sys.exit(1)
    print(f"✅ 完成: {description}")

def build_website(lang_code):
    """使用 doc-builder 构建静态网站"""
    output_dir = OUTPUT_WEBSITE / lang_code
    # 清空旧目录（可选）
    if output_dir.exists():
        shutil.rmtree(output_dir)
    # 修正：使用 --build_dir 参数，并添加 --html 生成完整页面
    cmd = f'doc-builder build course ./chapters/{lang_code} --build_dir {output_dir} --html --not_python_module'
    run_cmd(cmd, f"构建 {LANGUAGES[lang_code]} 网站")

def generate_notebooks(lang_code):
    """为指定语言生成 Jupyter Notebooks"""
    output_dir = OUTPUT_NOTEBOOKS / lang_code
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # 读取原始 generate_notebooks.py 并临时修改 SOURCE_DIR
    script_path = BASE_DIR / "utils" / "generate_notebooks.py"
    if not script_path.exists():
        print(f"❌ 找不到 {script_path}")
        sys.exit(1)
    
    with open(script_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 替换 SOURCE_DIR
    old_line = 'SOURCE_DIR = Path(__file__).parent.parent / "chapters" / "en"'
    new_line = f'SOURCE_DIR = Path(__file__).parent.parent / "chapters" / "{lang_code}"'
    if old_line not in content:
        # 尝试正则匹配
        import re
        pattern = r'SOURCE_DIR\s*=\s*Path\(__file__\)\.parent\.parent\s*/\s*"chapters"\s*/\s*"[^"]+"'
        content = re.sub(pattern, new_line, content)
    else:
        content = content.replace(old_line, new_line)
    
    # 写入临时脚本
    temp_script = BASE_DIR / f"_temp_generate_{lang_code}.py"
    with open(temp_script, "w", encoding="utf-8") as f:
        f.write(content)
    
    # 运行临时脚本
    cmd = f'python {temp_script} --output_dir {output_dir}'
    run_cmd(cmd, f"生成 {LANGUAGES[lang_code]} Notebooks")
    
    # 删除临时脚本
    temp_script.unlink()
    print(f"   Notebooks 保存在: {output_dir}")

def copy_images():
    """复制图片文件夹到网站输出目录（如果图片在根目录）"""
    images_src = BASE_DIR / "images"
    for lang in LANGUAGES:
        images_dst = OUTPUT_WEBSITE / lang / "images"
        if images_src.exists() and not images_dst.exists():
            shutil.copytree(images_src, images_dst, dirs_exist_ok=True)
            print(f"   ✅ 复制图片到 {images_dst}")

def print_summary():
    """输出总结"""
    print("\n" + "="*50)
    print("🎉 全部生成完成！")
    print("="*50)
    for lang in LANGUAGES:
        print(f"\n🌐 {LANGUAGES[lang]} 网站: file://{OUTPUT_WEBSITE / lang / 'index.html'}")
        print(f"📓 {LANGUAGES[lang]} Notebooks: {OUTPUT_NOTEBOOKS / lang}")
    print("\n💡 提示：网站可直接用浏览器打开 HTML 文件，或用以下命令启动本地服务器：")
    print("   cd build/en && python -m http.server 8000")

# ========== 主流程 ==========
if __name__ == "__main__":
    print("🚀 一键生成 Hugging Face 课程中英文网站 + Notebooks")
    print("需要先安装 doc-builder 和依赖：pip install -r requirements.txt")
    print("-" * 50)
    
    # 检查必需文件
    if not CHAPTERS_DIR.exists():
        print(f"❌ 找不到 chapters 目录: {CHAPTERS_DIR}")
        sys.exit(1)
    
    # 清空输出目录（可选，注释掉则不清空）
    if OUTPUT_WEBSITE.exists():
        shutil.rmtree(OUTPUT_WEBSITE)
    if OUTPUT_NOTEBOOKS.exists():
        shutil.rmtree(OUTPUT_NOTEBOOKS)
    
    # 1. 构建网站
    for lang in LANGUAGES:
        build_website(lang)
    
    # 2. 复制图片（如果根目录有 images 文件夹）
    copy_images()
    
    # 3. 生成 notebooks
    for lang in LANGUAGES:
        generate_notebooks(lang)
    
    # 4. 输出结果
    print_summary()
