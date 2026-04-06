# Notes Upload Rules

1. **File Naming**
   - Format: <course>_<chapter>_<lesson>_<seq>.<ext>
   - Example: chinese_ch_01_lesson_01.md

2. **File Types**
   - Markdown / Text: .md, .txt
   - Documents: .pdf, .docx, .xls, .xlsx
   - Media: .jpg, .png, .gif, .mp3, .mp4
   - AI Generated Notes: .json or .md

3. **Course Association**
   - Place course-associated notes under \`associated/<course>/<chapter>/\`
   - Independent notes go under \`independent/<type>/\` or \`Thinking/\`

4. **AI Notes**
   - AI generated notes go under \`ai_realtime/\`

5. **Indexing**
   - All notes must be indexed in \`notes_index.json\` including:
     - File path
     - Course/Chapter association
     - Tags
     - Date created/modified

6. **Validation**
   - UI upload will automatically check naming rules and file type
   - Invalid files will be rejected

