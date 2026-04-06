# Workflow Database (workflow_db/)

## Purpose
Stores workflows for courses, tests, AI-assisted processes, and independent user workflows.

## Structure
- `associated/` : Workflows linked to courses, chapters, or modules
- `independent/` : Independent workflows
- `workflow_index.json` : Index for searching
- `WORKFLOW_UPLOAD_RULES.md` : Rules for naming and uploading workflows

## Features
- Supports JSON, YAML, Python scripts, Markdown, PDF
- Searchable by course, type, chapter, tag, date
- Supports version control and cloud sync
