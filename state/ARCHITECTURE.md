state/                     # Stores runtime state, user sessions, learning progress, temporary caches, and AI-generated states
├── __init__.py            # Python package initializer
├── session_cache/         # Stores user session files
│   └── session_index.json # Index of all session files, with metadata (user, timestamp, tags)
├── user_progress/         # Tracks user learning progress per course/module
│   └── progress_index.json # Index of all progress files, with metadata (user, course, chapter, date)
├── temp_state/            # Temporary runtime state files for current sessions
│   └── temp_index.json    # Index of temporary state files
├── ai_generated_state/    # AI-generated runtime state files
│   └── ai_state_index.json # Index of AI-generated state files
└── STATE_UPLOAD_RULES.md  # Documentation for naming rules, file formats, and directory usage
