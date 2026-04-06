## 1. 数据库分类
本数据库包含以下四类测验数据，每类需遵守命名和存储规则：

1. **User-Uploaded Quizzes（用户上传）**
   - 描述：用户自行创建或上传的测验文件，可能包含各种文件类型（JSON, CSV, PDF, DOCX, 图片, 音频, 视频等）。
   - 存放位置：`associated/<subject>/<chapter>/user_uploaded/`
   - 文件命名规则：`<subject>_<chapter>_<序号>.<ext>`  
     示例：`chinese_ch_01_01.json`

2. **AI Template Generated Quizzes（基于模版的AI生成测验）**
   - 描述：AI根据指定模版生成的测验，关联特定课程或章节。
   - 存放位置：`associated/<subject>/<chapter>/ai_template/`
   - 文件命名规则：`<subject>_<chapter>_template_<序号>.json`  
     示例：`english_ch_02_template_01.json`

3. **AI Independent Generated Quizzes（AI独立生成）**
   - 描述：AI独立生成、未关联具体课程或章节的测验。
   - 存放位置：`ai_realtime/`
   - 文件命名规则：`ai_quiz_<序号>.json`  
     示例：`ai_quiz_01.json`

4. **Independent Quizzes（独立未分类测验）**
   - 描述：未分类、未关联课程或章节的用户上传测验。
   - 存放位置：`independent/`
   - 文件命名规则：`independent_quiz_<序号>.<ext>`  
     示例：`independent_quiz_01.json`

---

## 2. 文件命名规范
1. 文件名应只包含英文字母、数字和下划线 `_`，禁止空格或特殊字符。
2. 必须明确标注课程/章节或模版类型，方便自动检索。
3. 序号部分必须连续，以便排序和加载。

---

## 3. 文件夹结构

quiz_db/
├── associated/
│   ├── <subject>/
│   │   ├── <chapter>/
│   │   │   ├── user_uploaded/
│   │   │   └── ai_template/
├── ai_realtime/
└── independent/

---

## 4. 文件上传与校验
1. 用户上传测验时，系统应：
   - 自动检查命名规则；
   - 校验是否关联了课程/章节或模版；
   - 自动放入对应文件夹；
   - 避免文件重复覆盖，提供重命名或覆盖选项。

2. 文件类型支持：
   - JSON（优先）
   - CSV, TXT
   - PDF, DOCX
   - 图片：JPG, PNG, GIF
   - 视频：MP4, MOV
   - 音频：MP3, WAV

---

## 5. 搜索与索引
1. 系统将生成 `quiz_index.json` 文件，用于快速检索。
2. 可搜索条件包括：
   - 科目 / 课程 / 章节
   - 文件类型
   - 题型（单选、多选、填空、问答、匹配题、编程题等）
   - 难度等级
   - 标签
   - 上传日期
3. 实时更新索引，保证新上传文件立即可被检索。

---

## 6. 扩展性与兼容性
1. 可随时增加新的科目、章节、题型或模版。
2. 支持云端同步与本地缓存，确保文件可跨设备访问。
3. 支持未来多语言扩展。

---

## 7. 注意事项
- 所有文件名必须唯一，避免冲突。
- 不允许将未校验的文件直接放入数据库。
- 背景或辅助文件需单独存放，禁止与测验文件混淆。

