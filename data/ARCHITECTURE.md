# Data Directory Architecture Overview

This document describes the purpose and structure of the main `data/` directory.

## Root Directory Structure

data/
├── chinese_test_template.txt
├── courses_db/
├── flashcard_db/
├── media_db/
├── notes_db/
├── quiz_db/
├── workflow_db/
├── raw_materials/
├── error_db/
├── learning_states.json
├── logs/


### Purpose
The `data/` folder contains all user data, course content, quizzes, notes, media, workflows, raw materials, and error logs, structured for easy search, retrieval, and cloud/local synchronization.

### Subdirectory Summary
- `courses_db/` : Structured courses (Chinese, English, HF course, NLP modules)
- `flashcard_db/` : Flashcards organized by course and chapter
- `media_db/` : Images, videos, and other media resources
- `notes_db/` : User notes, AI realtime notes, course-associated or independent
- `quiz_db/` : Quizzes (user-generated, AI template-based, independent)
- `workflow_db/` : Workflows for learning processes and AI-assisted activities
- `raw_materials/` : OCR and user-uploaded unstructured materials
- `error_db/` : System and upload error logs
- `learning_states.json` : User learning progress
- `logs/` : System log files
