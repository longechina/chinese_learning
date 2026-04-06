# 课程上传规范 (Course Upload Rules)

## 1. 章节目录结构
- 中文课件: ../chinese/chapterXX/
- 英文课件: ../english/chapterXX/
- NLP 模块: ../nlp/moduleXX/
- HuggingFace 课程: chapters/en 或 chapters/zh-CN

## 2. 文件命名规则
- MDX 文件: 01.mdx, 02.mdx, ...（章节内按顺序编号）
- Notebook 文件: section01.ipynb, section02.ipynb, ...（章节内按顺序编号）
- 图片文件: img/01.png, 02.jpg, ...
- 视频文件: video/01.mp4, 02.mp4, ...

## 3. 上传规则
- 用户上传文件或文件夹时，请严格按照章节/序号命名
- 系统会根据命名自动排序和加载
- 禁止重复文件名，重复文件请先重命名
- 上传内容支持 MDX, IPYNB, 图片(JPG/PNG/WEBP), 视频(MP4)

## 4. 目录/文件检查
- 上传后 UI 会自动校验:
    - 文件命名是否符合规范
    - 章节编号顺序是否连续
    - 文件类型是否允许

## 5. 其他说明
- 可在章节内创建 img/ 或 video/ 子文件夹
- 未来新上传课程，必须遵守以上规则
