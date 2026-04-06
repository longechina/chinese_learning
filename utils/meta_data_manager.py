import json
import os
from datetime import datetime
from glob import glob

class MetaDataManager:
    def __init__(self, master_index_path="data/indexes/master_index.json"):
        self.master_index_path = master_index_path
        self.data = {}
        self.load()

    def load(self):
        if os.path.exists(self.master_index_path):
            with open(self.master_index_path, "r", encoding="utf-8") as f:
                self.data = json.load(f)
        else:
            self.data = {}

    def save(self):
        os.makedirs(os.path.dirname(self.master_index_path), exist_ok=True)
        with open(self.master_index_path, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)

    def update_db(self, db_name, pattern="*.json", version="1.0", cloud_synced=False):
        files = sorted(glob(f"data/{db_name}/**/{pattern}", recursive=True))
        self.data[db_name] = {
            "version": version,
            "last_updated": datetime.now().isoformat(),
            "files": files,
            "cloud_synced": cloud_synced
        }
        self.save()

    def get_db_files(self, db_name):
        return self.data.get(db_name, {}).get("files", [])

    def get_db_metadata(self, db_name):
        return self.data.get(db_name, {})

    def list_dbs(self):
        return list(self.data.keys())
