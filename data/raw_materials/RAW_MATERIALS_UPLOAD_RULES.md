## 1. 文件命名
- 格式: <type>_<YYYYMMDD>_<seq>.<ext>
- 示例: images_20260405_01.jpg, pdf_20260405_02.pdf
- 支持的类型:
  - images
  - pdf
  - docx
  - excel
  - audio
  - video
  - py
  - scripts
  - misc

## 2. 文件存放目录
- 每种类型使用单独文件夹：
  - audio/
  - docx/
  - excel/
  - images/
  - pdf/
  - py/
  - scripts/
  - video/
  - misc/
- 文件应存放在对应类型文件夹中。

## 3. 上传机制
- 用户上传时，UI 会检查命名规则和文件类型。
- 不需关联课程或章节。
- 允许批量上传。

## 4. 索引与搜索
- 系统将自动更新 raw_materials_index.json:
  {
    "images_20260405_01.jpg": {
      "type": "images",
      "tags": [],
      "upload_date": "2026-04-05"
    }
  }
- 支持按类型、标签、日期搜索。

## 5. 扩展与版本
- 可在各类型文件夹下增加 versions/ 管理历史版本。
- 可新增子类型或未分类文件存放于 misc/.
