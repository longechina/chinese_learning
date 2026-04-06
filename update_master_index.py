from utils.meta_data_manager import MetaDataManager

mdm = MetaDataManager()

# 所有主要数据库
db_list = [
    "courses_db",
    "flashcard_db",
    "notes_db",
    "media_db",
    "quiz_db",
    "workflow_db",
    "raw_materials"
]

for db in db_list:
    mdm.update_db(db)
    print(f"{db} indexed {len(mdm.get_db_files(db))} files")

print("✅ master_index.json updated successfully")
