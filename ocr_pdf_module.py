# ocr_pdf_module.py
"""
白描OCR PDF模块 - 适配 Streamlit 应用版本
功能：识别PDF中的文字，支持大PDF自动分卷处理
"""

import os
import time
import json
import hashlib
import tempfile
import shutil
from datetime import datetime
from pathlib import Path
from typing import List, Tuple, Optional, Callable, Dict, Any
import threading
import requests


# ==================== 配置区域 ====================

BAIMIAO_CONFIG = {
    "cookie": "Hm_lvt_da96324d8afb3666d3f016c5f2201546=1774434932; HMACCOUNT=A164C29BD029A5C0; Hm_lpvt_da96324d8afb3666d3f016c5f2201546=1774436709",
    "x_auth_token": "prhtXtnfV73JerwLRYrexn8BPffEcWBaLhqyJvkglwevL81mRsmEKMAuNGjQ1HTz",
    "x_auth_uuid": "2805ff4c-9c5d-48f1-acca-15260542dc7c",
    "pdf": {
        "max_pages_per_part": 50,  # PDF分卷每卷最大页数
        "dpi": 150,                 # PDF转图片分辨率
    },
    "request_interval": 0.5,       # 请求间隔（秒）
    "max_retries": 2,              # 失败重试次数
    "retry_delay": 5,              # 重试等待时间（秒）
}


# ==================== PDF处理函数 ====================

def get_pdf_page_count(pdf_bytes: bytes) -> int:
    """获取PDF页数（从字节流）"""
    try:
        import fitz
        import io
        pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        page_count = len(pdf_doc)
        pdf_doc.close()
        return page_count
    except ImportError:
        return 0
    except Exception:
        return 0


def split_pdf_bytes(pdf_bytes: bytes, pages_per_part: int = 50) -> List[Tuple[bytes, int, int, int]]:
    """
    将PDF拆分成多个部分（从字节流）
    
    返回:
        list: [(分卷字节数据, 分卷号, 起始页, 结束页), ...]
    """
    try:
        import fitz
        import io
        
        pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        total_pages = len(pdf_doc)
        
        if total_pages <= pages_per_part:
            # 不分卷，直接返回原PDF
            pdf_doc.close()
            return [(pdf_bytes, 1, 1, total_pages)]
        
        num_parts = (total_pages + pages_per_part - 1) // pages_per_part
        part_results = []
        
        for part_num in range(num_parts):
            start_page = part_num * pages_per_part
            end_page = min(start_page + pages_per_part, total_pages)
            
            # 创建新PDF
            new_doc = fitz.open()
            for page_num in range(start_page, end_page):
                new_doc.insert_pdf(pdf_doc, from_page=page_num, to_page=page_num)
            
            # 保存到字节流
            part_bytes = new_doc.tobytes()
            new_doc.close()
            
            part_results.append((part_bytes, part_num + 1, start_page + 1, end_page))
        
        pdf_doc.close()
        return part_results
        
    except ImportError:
        return []
    except Exception:
        return []


def pdf_bytes_to_images(pdf_bytes: bytes, dpi: int = 150) -> List[bytes]:
    """
    将PDF（字节流）转换为图片字节列表
    
    返回:
        list: 图片字节数据列表
    """
    try:
        import fitz
        import io
        
        pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        image_list = []
        
        zoom = dpi / 72
        mat = fitz.Matrix(zoom, zoom)
        
        for page_num in range(len(pdf_doc)):
            page = pdf_doc.load_page(page_num)
            pix = page.get_pixmap(matrix=mat)
            img_bytes = pix.tobytes("png")
            image_list.append(img_bytes)
        
        pdf_doc.close()
        return image_list
        
    except ImportError:
        return []
    except Exception:
        return []


def cleanup_temp_files(file_list: List[str]) -> None:
    """清理临时文件"""
    for f in file_list:
        try:
            if os.path.exists(f):
                os.remove(f)
        except Exception:
            pass


# ==================== OCR类 ====================

class BaimiaoOCR:
    """白描OCR客户端 - 适配字节流版本"""
    
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
                              verbose: bool = False, retry_count: int = 0,
                              max_retries: int = 2, retry_delay: int = 5) -> Optional[str]:
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
                if verbose:
                    print(f"Retry ({retry_count+1}/{max_retries})")
                time.sleep(retry_delay)
                return self.recognize_image_bytes(image_bytes, filename, verbose,
                                                  retry_count + 1, max_retries, retry_delay)
            else:
                if verbose:
                    print(f"Failed: {str(e)}")
                return None


# ==================== PDF OCR处理函数 ====================

def ocr_pdf(pdf_bytes: bytes, filename: str,
            cookie: str, x_auth_token: str, x_auth_uuid: str,
            progress_callback: Optional[Callable] = None,
            config: Dict[str, Any] = None) -> Tuple[str, Optional[str]]:
    """
    OCR识别PDF文件
    
    参数:
        pdf_bytes: PDF字节数据
        filename: 文件名
        cookie: 白描Cookie
        x_auth_token: 白描Token
        x_auth_uuid: 白描UUID
        progress_callback: 进度回调函数 (current, total, message)
        config: 配置字典
    
    返回:
        (status, text) - status: "success" / "failed"
    """
    if config is None:
        config = BAIMIAO_CONFIG
    
    ocr = BaimiaoOCR(cookie, x_auth_token, x_auth_uuid)
    pdf_config = config.get("pdf", {"max_pages_per_part": 50, "dpi": 150})
    request_interval = config.get("request_interval", 0.5)
    max_retries = config.get("max_retries", 2)
    retry_delay = config.get("retry_delay", 5)
    
    try:
        # 获取页数
        if progress_callback:
            progress_callback(0, 100, "Reading PDF...")
        
        total_pages = get_pdf_page_count(pdf_bytes)
        
        if total_pages == 0:
            return "failed", None
        
        if progress_callback:
            progress_callback(10, 100, f"PDF has {total_pages} pages")
        
        # 分卷处理
        pages_per_part = pdf_config.get("max_pages_per_part", 50)
        
        if progress_callback:
            progress_callback(15, 100, "Splitting PDF into parts...")
        
        parts = split_pdf_bytes(pdf_bytes, pages_per_part)
        
        if not parts:
            return "failed", None
        
        num_parts = len(parts)
        all_texts = []
        
        for idx, (part_bytes, part_num, start_page, end_page) in enumerate(parts):
            if progress_callback:
                msg = f"Processing part {part_num}/{num_parts} (pages {start_page}-{end_page})"
                progress_callback(20 + int(70 * idx / num_parts), 100, msg)
            
            # 将PDF部分转为图片
            images = pdf_bytes_to_images(part_bytes, pdf_config.get("dpi", 150))
            
            if not images:
                all_texts.append(f"[Part {part_num}: Failed to convert to images]")
                continue
            
            part_texts = []
            for img_idx, img_bytes in enumerate(images):
                page_num = start_page + img_idx
                img_filename = f"page_{page_num}.png"
                
                text = ocr.recognize_image_bytes(
                    img_bytes, img_filename, 
                    verbose=False, max_retries=max_retries, retry_delay=retry_delay
                )
                
                if text:
                    part_texts.append(text)
                else:
                    part_texts.append(f"[Page {page_num}: Recognition failed]")
                
                # 请求间隔
                time.sleep(request_interval)
            
            # 合并部分文本
            part_result = ""
            for i, text in enumerate(part_texts):
                page_num = start_page + i
                if i > 0:
                    part_result += f"\n\n--- Page {page_num} ---\n\n"
                part_result += text
            
            all_texts.append(part_result)
        
        # 合并所有部分
        final_text = f"=== PDF OCR Result (Total {total_pages} pages) ===\n\n"
        for i, part_text in enumerate(all_texts):
            if i > 0:
                final_text += "\n\n" + "="*60 + "\n\n"
            final_text += part_text
        
        if progress_callback:
            progress_callback(100, 100, "Complete")
        
        return "success", final_text
        
    except Exception as e:
        return "failed", None


# ==================== 主函数（测试用）====================

def test_ocr_pdf():
    """测试PDF OCR功能"""
    print("=" * 60)
    print("PDF OCR Module Test")
    print("=" * 60)
    print("This module is designed to be used with Streamlit app.")
    print("Use ocr_pdf() function to OCR PDF files.")
    print("\nUsage example in Streamlit:")
    print("""
    from ocr_pdf_module import ocr_pdf, BAIMIAO_CONFIG
    
    uploaded_file = st.file_uploader("Upload PDF", type=["pdf"])
    if uploaded_file:
        pdf_bytes = uploaded_file.read()
        status, text = ocr_pdf(
            pdf_bytes,
            uploaded_file.name,
            BAIMIAO_CONFIG["cookie"],
            BAIMIAO_CONFIG["x_auth_token"],
            BAIMIAO_CONFIG["x_auth_uuid"],
            progress_callback=lambda c,t,m: st.progress(c/t)
        )
        if status == "success":
            st.text_area("OCR Result", text, height=300)
    """)


if __name__ == "__main__":
    test_ocr_pdf()