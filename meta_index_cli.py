import os
from utils.meta_data_manager import MetaDataManager
from glob import glob

def check_index(mdm, db_name):
    indexed_files = set(mdm.get_db_files(db_name))
    actual_files = set(glob(f"data/{db_name}/**/*.json", recursive=True))

    not_indexed = sorted(actual_files - indexed_files)
    missing_files = sorted(indexed_files - actual_files)

    print(f"\n--- {db_name} ---")
    if not_indexed:
        print("Files not indexed:")
        for f in not_indexed:
            print("  ", f)
    else:
        print("No unindexed files.")

    if missing_files:
        print("Indexed but missing files:")
        for f in missing_files:
            print("  ", f)
    else:
        print("No missing files.")

def update_index(mdm, db_list):
    for db in db_list:
        mdm.update_db(db)
        print(f"{db}: {len(mdm.get_db_files(db))} files indexed")

def main():
    mdm = MetaDataManager()
    db_list = [
        "courses_db",
        "flashcard_db",
        "notes_db",
        "media_db",
        "quiz_db",
        "workflow_db",
        "raw_materials"
    ]

    print("\nUpdating indexes...")
    update_index(mdm, db_list)

    print("\nChecking index consistency...")
    for db in db_list:
        check_index(mdm, db)

    print("\n✅ Master index and consistency check completed.")

if __name__ == "__main__":
    main()
