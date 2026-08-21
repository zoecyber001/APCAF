#!/usr/bin/env python3
"""
APCAF Canonical Data Compiler
Reads canonical technique definitions from techniques/*/technique.yaml
and compiles them into data/techniques.json for use across web applications.
"""

import os
import json
import glob
import yaml

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TECHNIQUES_DIR = os.path.join(REPO_ROOT, "techniques")
DATA_DIR = os.path.join(REPO_ROOT, "data")
OUTPUT_FILE = os.path.join(DATA_DIR, "techniques.json")

def build_data():
    os.makedirs(DATA_DIR, exist_ok=True)
    technique_files = sorted(glob.glob(os.path.join(TECHNIQUES_DIR, "*", "technique.yaml")))
    
    techniques = []
    for fpath in technique_files:
        with open(fpath, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            techniques.append(data)
            print(f"Loaded technique: {data.get('id')} - {data.get('name')}")
            
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        json.dump(techniques, out, indent=2)
        
    print(f"\nSuccessfully compiled {len(techniques)} techniques into {OUTPUT_FILE}")

if __name__ == "__main__":
    build_data()
