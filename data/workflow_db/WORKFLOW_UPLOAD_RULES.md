# WORKFLOW_UPLOAD_RULES.md

## 1. 文件命名规则
- **关联工作流**: `<subject>_<chapter>_<workflow_type>_<序号>.<ext>`
  - 示例: `chinese_ch_01_look_and_speak_01.json`
- **独立工作流**: `<workflow_type>_<序号>.<ext>`
  - 示例: `brainstorming_01.md`

## 2. 关联工作流
- 必须上传至对应课程/章节目录 under `associated/`
- 支持文件类型: JSON, YAML, Markdown, Python, PDF, etc.
- UI 会自动校验命名规则和类型

## 3. 独立工作流
- 上传至 `independent/` 对应子目录
- 无需关联课程或章节
- 支持文件类型: JSON, YAML, Markdown, Python, PDF, etc.

## 4. 上传校验
- UI 自动校验文件命名规则和类型
- 不符合规则的文件会提示用户修改

## 5. 索引与搜索
- `workflow_index.json` 记录每个 workflow 文件的:
  - `path` (相对路径)
  - `type` (如 look_and_speak, quiz, note, ai_generated)
  - `associated_courses` (关联课程/章节)
  - `upload_date`
  - `tags`
- 搜索条件: 科目、章节、类型、日期、标签

## 6. 扩展与版本控制
- 支持新增工作流类型和子分类
- 支持版本控制和历史记录管理

## 7. 云端/本地策略
- 文件优先从云端获取，本地缓存用于加速访问
- 支持增量同步，避免重复上传
