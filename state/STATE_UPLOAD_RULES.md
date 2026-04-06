# State Directory Upload Rules

1. **Purpose**
   - Store runtime state, user session data, progress, temporary caches, and AI-generated states.

2. **Subdirectories**
   - session_cache/: Stores session files (JSON format)
   - user_progress/: Tracks user learning progress per course/module
   - temp_state/: Temporary runtime state for current sessions
   - ai_generated_state/: AI-generated runtime states

3. **File Naming**
   - JSON files only
   - Format: <type>_<user_or_course>_<timestamp>.json
   - Example: session_user123_20260405.json

4. **Indexing**
   - Each subdirectory must have an index JSON file (e.g., session_index.json)
   - Index stores:
     - File path
     - Associated user/course
     - Timestamp
     - Tags (optional)

5. **Validation**
   - Files uploaded via UI must follow naming conventions
   - Invalid files are rejected

6. **Synchronization**
   - Supports local caching and cloud synchronization
