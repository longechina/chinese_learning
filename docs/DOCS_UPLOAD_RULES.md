# Docs Upload Rules

1. Allowed file types:
   - Markdown (.md)
   - Plain text (.txt)

2. Directory classification:
   - public/: documents for end-users (user guides, teaching principles, model docs)
   - internal/: internal system documents (architecture, design notes, technical guides)
   - feedback/: user/system feedback
   - ai_generated/: AI-generated temporary documents

3. Naming conventions:
   - Use descriptive filenames with lowercase and underscores
   - Example: user_guide_v1.md, ai_summary_20260405.md

4. Upload rules:
   - Files uploaded via UI will be validated for type and naming convention
   - Invalid files will be rejected with a descriptive error

5. Versioning:
   - Maintain version number in the filename or use git history
   - Example: architecture_v2.md

6. Indexing:
   - Each document must be indexed in `docs_index.json`
   - Fields: name, type, tags, date_created, associated_course (if applicable)
