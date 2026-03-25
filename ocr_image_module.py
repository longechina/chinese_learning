# ocr_image_module.py
"""
白描OCR图片识别模块 - 适配 Streamlit 应用版本
功能：识别图片中的文字，支持单张图片、多张图片、ZIP压缩包
支持并发处理，最高300张图片
"""

import os
import time
import json
import hashlib
import zipfile
import tempfile
import shutil
import threading
from datetime import datetime
from pathlib import Path
from typing import List, Tuple, Optional, Callable, Dict, Any
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


# ==================== 配置区域 ====================

BAIMIAO_CONFIG = {
    "cookie": "Hm_lvt_da96324d8afb3666d3f016c5f2201546=1774434932; HMACCOUNT=A164C29BD029A5C0; Hm_lpvt_da96324d8afb3666d3f016c5f2201546=1774436709",
    "x_auth_token": "prhtXtnfV73JerwLRYrexn8BPffEcWBaLhqyJvkglwevL81mRsmEKMAuNGjQ1HTz",
    "x_auth_uuid": "2805ff4c-9c5d-48f1-acca-15260542dc7c",
    
    # 支持的图片格式
    "image_extensions": ['.jpg', '.jpeg', '.png', '.bmp', '.webp', '.tiff'],
    
    # 最大图片数量
    "max_images": 300,
    
    # 并发配置
    "max_workers": 0,  # 0=自动调整
    "concurrency_rules": {
        (0, 10): 1,      # 1-10张：1个并发
        (11, 50): 3,     # 11-50张：3个并发
        (51, 100): 5,    # 51-100张：5个并发
        (101, 300): 8,   # 101-300张：8个并发
    },
    
    # 请求间隔（秒）
    "request_interval": 0.5,
    
    # 重试配置
    "max_retries": 2,
    "retry_delay": 5,
}


# ==================== 核心OCR类 ====================

class BaimiaoOCR:
    """白描OCR客户端 - 线程安全版（适配字节流）"""
    
    def __init__(self, cookie: str, x_auth_token: str, x_auth_uuid: str):
        self.base_url = "https://web.baimiaoapp.com"
        self.cookie = cookie
        self.x_auth_token = x_auth_token
        self.x_auth_uuid = x_auth_uuid
        
        self.session = requests.Session()
        self.session.headers.update({
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8",
            "cookie": self.cookie,
            "origin": self.base_url,
            "referer": f"{self.base_url}/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "x-auth-token": self.x_auth_token,
            "x-auth-uuid": self.x_auth_uuid,
        })
        
        self.lock = threading.Lock()
    
    def _calculate_bytes_md5(self, data: bytes) -> str:
        """计算字节数据的MD5值"""
        return hashlib.md5(data).hexdigest()
    
    def _get_mime_type(self, filename: str) -> str:
        """根据文件名获取MIME类型"""
        ext = os.path.splitext(filename)[1].lower()
        mime_map = {
            '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.png': 'image/png', '.bmp': 'image/bmp',
            '.webp': 'image/webp', '.tiff': 'image/tiff',
        }
        return mime_map.get(ext, 'image/jpeg')
    
    def _get_perm_token(self) -> Optional[str]:
        """获取临时token"""
        url = f"{self.base_url}/api/perm/single"
        payload = {"mode": "single", "version": "v2"}
        
        try:
            response = self.session.post(url, json=payload, timeout=30)
            if response.status_code == 200:
                result = response.json()
                if result.get('code') == 1:
                    return result['data']['token']
        except Exception:
            pass
        return None
    
    def _get_oss_sign(self, mime_type: str = "image/jpeg") -> Optional[dict]:
        """获取OSS上传签名"""
        url = f"{self.base_url}/api/oss/sign"
        params = {"mime_type": mime_type}
        
        try:
            response = self.session.get(url, params=params, timeout=30)
            if response.status_code == 200:
                result = response.json()
                if result.get('code') == 1:
                    return result['data']['result']
        except Exception:
            pass
        return None
    
    def _upload_to_oss(self, image_bytes: bytes, sign_data: dict, filename: str) -> bool:
        """上传图片到阿里云OSS"""
        try:
            files = {
                'key': (None, sign_data['file_key']),
                'policy': (None, sign_data['policy']),
                'x-oss-signature-version': (None, sign_data['x_oss_signature_version']),
                'x-oss-credential': (None, sign_data['x_oss_credential']),
                'x-oss-date': (None, sign_data['x_oss_date']),
                'x-oss-signature': (None, sign_data['signature']),
                'x-oss-security-token': (None, sign_data['security_token']),
                'success_action_status': (None, '200'),
                'file': (filename, image_bytes, sign_data['content_types'][0])
            }
            
            response = requests.post(sign_data['host'], files=files, timeout=60)
            return response.status_code == 200
            
        except Exception:
            return False
    
    def _submit_ocr(self, file_key: str, file_md5: str, perm_token: str) -> Optional[str]:
        """提交OCR识别任务"""
        url = f"{self.base_url}/api/ocr/image/plus"
        
        payload = {
            "batchId": "",
            "total": 1,
            "token": perm_token,
            "fileKey": file_key,
            "hash": file_md5
        }
        
        try:
            response = self.session.post(url, json=payload, timeout=30)
            if response.status_code == 200:
                result = response.json()
                if result.get('code') == 1:
                    return result['data'].get('jobStatusId')
        except Exception:
            pass
        return None
    
    def _get_ocr_result(self, job_status_id: str) -> Optional[dict]:
        """获取OCR识别结果"""
        url = f"{self.base_url}/api/ocr/image/plus/status"
        params = {"jobStatusId": job_status_id}
        
        try:
            response = self.session.get(url, params=params, timeout=30)
            if response.status_code == 200:
                return response.json()
        except Exception:
            pass
        return None
    
    def _extract_text(self, result: dict) -> Optional[str]:
        """从OCR结果中提取纯文字"""
        if not result or result.get('code') != 1:
            return None
        
        data = result.get('data', {})
        
        if 'ydResp' in data:
            yd_resp = data['ydResp']
            if 'words_result' in yd_resp:
                texts = [item['words'] for item in yd_resp['words_result']]
                return '\n'.join(texts)
        
        if 'result' in data:
            return data['result']
        elif 'text' in data:
            return data['text']
        
        return None
    
    def recognize_image_bytes(self, image_bytes: bytes, filename: str, 
                              retry_count: int = 0,
                              max_retries: int = 2, 
                              retry_delay: int = 5) -> Optional[str]:
        """
        从图片字节流识别文字
        
        返回:
            str: 识别出的文字，失败返回None
        """
        try:
            # 1. 计算MD5
            file_md5 = self._calculate_bytes_md5(image_bytes)
            
            # 2. 获取token
            perm_token = self._get_perm_token()
            if not perm_token:
                raise Exception("Failed to get token")
            
            # 3. 获取签名
            mime_type = self._get_mime_type(filename)
            sign_data = self._get_oss_sign(mime_type)
            if not sign_data:
                raise Exception("Failed to get OSS sign")
            
            # 4. 上传图片
            upload_success = self._upload_to_oss(image_bytes, sign_data, filename)
            if not upload_success:
                raise Exception("Upload failed")
            
            # 5. 提交任务
            job_id = self._submit_ocr(sign_data['file_key'], file_md5, perm_token)
            if not job_id:
                raise Exception("Submit task failed")
            
            # 6. 轮询结果
            for i in range(30):
                time.sleep(2)
                result = self._get_ocr_result(job_id)
                
                if result and result.get('code') == 1:
                    data = result.get('data', {})
                    if data.get('isEnded'):
                        text = self._extract_text(result)
                        if text:
                            return text
                        else:
                            raise Exception("No text extracted")
            
            raise Exception("Timeout")
            
        except Exception as e:
            if retry_count < max_retries:
                time.sleep(retry_delay)
                return self.recognize_image_bytes(image_bytes, filename, 
                                                  retry_count + 1, max_retries, retry_delay)
            else:
                return None


# ==================== 工具函数 ====================

def get_concurrency(total_images: int, config: Dict[str, Any]) -> int:
    """根据图片数量计算并发数"""
    max_workers = config.get("max_workers", 0)
    if max_workers > 0:
        return min(max_workers, total_images)
    
    rules = config.get("concurrency_rules", {
        (0, 10): 1, (11, 50): 3, (51, 100): 5, (101, 500): 8
    })
    
    for (min_count, max_count), workers in rules.items():
        if min_count <= total_images <= max_count:
            return min(workers, total_images)
    
    return 1


def extract_images_from_zip(zip_bytes: bytes, temp_dir: str, 
                            image_extensions: List[str]) -> List[Tuple[bytes, str]]:
    """
    从ZIP字节流中提取所有图片
    
    返回:
        list: [(image_bytes, filename), ...]
    """
    images = []
    
    try:
        with tempfile.NamedTemporaryFile(suffix='.zip', delete=False) as tmp_file:
            tmp_file.write(zip_bytes)
            tmp_path = tmp_file.name
        
        with zipfile.ZipFile(tmp_path, 'r') as zf:
            for file_info in zf.infolist():
                if file_info.is_dir():
                    continue
                
                ext = os.path.splitext(file_info.filename)[1].lower()
                if ext not in image_extensions:
                    continue
                
                try:
                    image_bytes = zf.read(file_info.filename)
                    if image_bytes:
                        images.append((image_bytes, os.path.basename(file_info.filename)))
                except Exception:
                    continue
        
        os.unlink(tmp_path)
        
    except Exception:
        pass
    
    return images


# ==================== 批量OCR处理函数 ====================

def ocr_images_batch(image_list: List[Tuple[bytes, str]],
                     config: Dict[str, Any],
                     progress_callback: Optional[Callable] = None) -> List[Tuple[str, str, Optional[str]]]:
    """
    批量OCR识别图片（支持并发）
    
    参数:
        image_list: 列表，每个元素为 (image_bytes, filename)
        config: 配置字典
        progress_callback: 进度回调函数 (current, total, filename, status, text_preview)
    
    返回:
        列表，每个元素为 (filename, status, text)
        status: "success" / "failed"
    """
    total = len(image_list)
    
    if total == 0:
        return []
    
    if total > config.get("max_images", 300):
        total = config.get("max_images", 300)
        image_list = image_list[:total]
    
    # 初始化OCR客户端
    ocr = BaimiaoOCR(
        config.get("cookie", BAIMIAO_CONFIG["cookie"]),
        config.get("x_auth_token", BAIMIAO_CONFIG["x_auth_token"]),
        config.get("x_auth_uuid", BAIMIAO_CONFIG["x_auth_uuid"])
    )
    
    # 计算并发数
    concurrency = get_concurrency(total, config)
    request_interval = config.get("request_interval", 0.5)
    max_retries = config.get("max_retries", 2)
    retry_delay = config.get("retry_delay", 5)
    
    results = []
    completed = 0
    lock = threading.Lock()
    
    def process_one(idx, image_bytes, filename):
        nonlocal completed
        try:
            text = ocr.recognize_image_bytes(
                image_bytes, filename,
                max_retries=max_retries, retry_delay=retry_delay
            )
            
            with lock:
                completed += 1
                if text:
                    results.append((filename, "success", text))
                    if progress_callback:
                        preview = text[:100] + "..." if len(text) > 100 else text
                        progress_callback(completed, total, filename, "success", preview)
                else:
                    results.append((filename, "failed", None))
                    if progress_callback:
                        progress_callback(completed, total, filename, "failed", None)
            
            return text is not None
            
        except Exception as e:
            with lock:
                completed += 1
                results.append((filename, "failed", None))
                if progress_callback:
                    progress_callback(completed, total, filename, "failed", None)
            return False
    
    with ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = []
        for idx, (img_bytes, filename) in enumerate(image_list):
            future = executor.submit(process_one, idx + 1, img_bytes, filename)
            futures.append(future)
            time.sleep(request_interval)
        
        for future in as_completed(futures):
            try:
                future.result()
            except Exception:
                pass
    
    return results


def ocr_single_image(image_bytes: bytes, filename: str,
                     config: Dict[str, Any]) -> Tuple[str, Optional[str]]:
    """
    识别单张图片
    
    返回:
        (status, text) - status: "success" / "failed"
    """
    ocr = BaimiaoOCR(
        config.get("cookie", BAIMIAO_CONFIG["cookie"]),
        config.get("x_auth_token", BAIMIAO_CONFIG["x_auth_token"]),
        config.get("x_auth_uuid", BAIMIAO_CONFIG["x_auth_uuid"])
    )
    
    max_retries = config.get("max_retries", 2)
    retry_delay = config.get("retry_delay", 5)
    
    text = ocr.recognize_image_bytes(
        image_bytes, filename,
        max_retries=max_retries, retry_delay=retry_delay
    )
    
    if text:
        return "success", text
    else:
        return "failed", None


def ocr_zip_file(zip_bytes: bytes, filename: str,
                 config: Dict[str, Any],
                 progress_callback: Optional[Callable] = None) -> List[Tuple[str, str, Optional[str]]]:
    """
    识别ZIP文件中的所有图片
    
    返回:
        列表，每个元素为 (filename, status, text)
    """
    image_extensions = config.get("image_extensions", BAIMIAO_CONFIG["image_extensions"])
    
    with tempfile.TemporaryDirectory() as temp_dir:
        images = extract_images_from_zip(zip_bytes, temp_dir, image_extensions)
        
        if not images:
            return []
        
        if progress_callback:
            progress_callback(0, len(images), "Extracted", "info", f"Extracted {len(images)} images")
        
        results = ocr_images_batch(images, config, progress_callback)
        
        return results


# ==================== 结果格式化 ====================

def format_results_as_text(results: List[Tuple[str, str, Optional[str]]]) -> str:
    """
    将OCR结果格式化为文本
    
    返回:
        格式化的文本字符串
    """
    if not results:
        return "No results"
    
    lines = []
    lines.append("=" * 60)
    lines.append("OCR Results")
    lines.append("=" * 60)
    lines.append("")
    
    success_count = sum(1 for _, status, _ in results if status == "success")
    failed_count = len(results) - success_count
    
    lines.append(f"Total: {len(results)} images")
    lines.append(f"Success: {success_count}")
    lines.append(f"Failed: {failed_count}")
    lines.append("")
    lines.append("-" * 60)
    lines.append("")
    
    for filename, status, text in results:
        if status == "success":
            lines.append(f"[SUCCESS] {filename}")
            lines.append("-" * 40)
            lines.append(text)
            lines.append("")
            lines.append("-" * 60)
            lines.append("")
        else:
            lines.append(f"[FAILED] {filename}")
            lines.append("-" * 40)
            lines.append("Recognition failed")
            lines.append("")
            lines.append("-" * 60)
            lines.append("")
    
    return "\n".join(lines)


def save_results_to_txt(results: List[Tuple[str, str, Optional[str]]], 
                       output_path: str) -> bool:
    """保存OCR结果到TXT文件"""
    try:
        text = format_results_as_text(results)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        return True
    except Exception:
        return False


# ==================== 测试函数 ====================

def test_module():
    """测试模块"""
    print("=" * 60)
    print("OCR Image Module Test")
    print("=" * 60)
    print("This module is designed to be used with Streamlit app.")
    print("\nAvailable functions:")
    print("  - ocr_single_image(): OCR a single image")
    print("  - ocr_images_batch(): OCR multiple images with concurrency")
    print("  - ocr_zip_file(): OCR all images in a ZIP file")
    print("  - format_results_as_text(): Format results as text")
    print("  - save_results_to_txt(): Save results to TXT file")
    print("\nUsage example in Streamlit:")
    print("""
    from ocr_image_module import ocr_images_batch, BAIMIAO_CONFIG, format_results_as_text
    
    uploaded_files = st.file_uploader("Upload images", type=["jpg","png"], accept_multiple_files=True)
    if uploaded_files:
        image_list = [(f.read(), f.name) for f in uploaded_files]
        results = ocr_images_batch(image_list, BAIMIAO_CONFIG, progress_callback=my_callback)
        text = format_results_as_text(results)
        st.text_area("Results", text, height=400)
    """)


if __name__ == "__main__":
    test_module()