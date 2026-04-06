# UI Upload Rules

This document defines the rules for uploading files via the UI of the Chinese Learning System. 
It ensures all uploaded content is structured, indexed, and searchable across courses, notes, media, workflows, and quizzes.

---

## 1. General Rules

1. All uploaded files must follow the naming conventions specified for their type.
2. Supported file formats:
   - Markdown (`.md`), Text (`.txt`)
   - PDF (`.pdf`), Word (`.docx`)
   - Excel (`.xls`, `.xlsx`)
   - Images (`.jpg`, `.png`, `.gif`, `.webp`)
   - Audio (`.mp3`, `.wav`)
   - Video (`.mp4`, `.mov`, `.avi`)
   - Python scripts (`.py`) and JSON/YAML (`.json`, `.yaml`)
3. Each file should be associated with either a course/module or be independent.
4. Files uploaded incorrectly (wrong format, wrong naming, wrong association) will be rejected by the UI.

---

## 2. Course-Associated Files

### 2.1 Naming Convention

```

<subject>*<chapter/module>*<sequence_number>.<ext>

```

- `subject`: course name (`chinese`, `english`, `hf_course`, `nlp`)
- `chapter/module`: chapter or module identifier (`ch_01`, `chapter1`, `nlp1`, etc.)
- `sequence_number`: two-digit sequential number for ordering (e.g., `01`, `02`)
- `ext`: file extension (`.md`, `.jpg`, `.mp4`, etc.)

**Example**:  
```

chinese_ch_01_01.md
english_ch_02_03.jpg
hf_course_chapter1_05.mp4

```

### 2.2 Folder Structure

```

associated/
├── <subject>/
│   ├── <chapter/module>/
│   │   └── <files>

```

- All uploaded course files go under the appropriate subject and chapter/module folder.
- Workflow-related files for courses should be stored in `workflow/associated/<subject>/<chapter>/`.

---

## 3. Independent Files

### 3.1 Naming

```

independent_<type>_<sequence_number>.<ext>

```

- `type`: file type or content category (e.g., `notes`, `media`, `quiz`, `workflow`)
- `sequence_number`: two-digit sequential number
- `ext`: file extension

**Example**:  
```

independent_notes_01.md
independent_media_05.jpg
independent_quiz_03.json

```

### 3.2 Folder Structure

```

independent/
├── <type>/
│   └── <files>

```

- Types can include: `notes`, `media`, `quiz`, `workflow`, `raw_materials`
- Allows storage of files not linked to any course or chapter.

---

## 4. Media Files

- Course-associated media (images, audio, video) must reside in:
```

media_db/associated/<subject>/<chapter>/...

```
- Independent media:
```

media_db/independent/<type>/...

```
- All media files must maintain their original extensions.
- Naming for media files should follow the course-associated or independent conventions above.

---

## 5. Notes Files

- Notes may include: `.md`, `.pdf`, `.docx`, `.xlsx`, `.jpg`, `.gif`, `.mp3`, `.mp4`
- Folder structure:
```

notes_db/
├── associated/<subject>/<chapter>/...
├── independent/<type>/...
├── ai_realtime/

```
- Notes should always follow the naming conventions specified in course-associated or independent sections.

---

## 6. Workflow Files

- Workflow files may include: `.json`, `.yaml`, `.py`, `.md`
- Folder structure:
```

workflow_db/
├── associated/<subject>/<chapter>/<type>/
├── independent/<type>/

```
- Naming follows:
```

<subject>*<chapter/module>*<workflow_type>_<sequence_number>.<ext>

```
**Example**: `chinese_ch_01_look_and_speak_01.json`

---

## 7. Quiz Files

- Quiz files may include `.json`, `.md`, `.jpg`, `.mp4` (for multimedia questions)
- Folder structure:
```

quiz_db/
├── associated/<subject>/<chapter>/
├── ai_generated/<template>/<subject>/<chapter>/
├── independent/<type>/

```
- Naming follows:
```

<subject>*<chapter>*<sequence_number>.<ext>

```
**Example**: `chinese_ch_01_01.json`

---

## 8. Indexing and Validation

1. Every upload automatically updates the corresponding index JSON file:
   - `notes_index.json`
   - `media_index.json`
   - `quiz_index.json`
   - `workflow_index.json`
2. The system validates:
   - File extension
   - File naming convention
   - Folder association
3. Invalid uploads are rejected with an error message.

---

## 9. Versioning and Cloud Sync

1. Uploaded files are versioned; changes are tracked in the index JSON.
2. Files are synced with cloud storage but cached locally for fast access.
3. Historical versions are maintained to allow rollback if needed.

---

## 10. Summary

- `associated/` for course-related content
- `independent/` for unassociated content
- Naming conventions must be strictly followed
- Index JSON files provide fast search and metadata management
- Supports versioning and cloud sync
```

---


