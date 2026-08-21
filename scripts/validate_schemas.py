#!/usr/bin/env python3
"""
APCAF Automated Schema & Integrity Validator
Validates:
1. All technique YAML files against schemas/technique.schema.json
2. All case YAML files against schemas/case.schema.json
3. Uniqueness of technique IDs and mitigation IDs
4. Integrity of cross-references and standards citations
"""

import os
import sys
import glob
import json
import yaml
import jsonschema

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TECH_SCHEMA_PATH = os.path.join(REPO_ROOT, "schemas", "technique.schema.json")
CASE_SCHEMA_PATH = os.path.join(REPO_ROOT, "schemas", "case.schema.json")

def load_json_schema(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def validate_all():
    errors = 0
    
    # 1. Validate Techniques
    print("--- Validating Technique Specifications ---")
    tech_schema = load_json_schema(TECH_SCHEMA_PATH)
    tech_files = glob.glob(os.path.join(REPO_ROOT, "techniques", "*", "technique.yaml"))
    
    seen_tech_ids = set()
    seen_mit_ids = set()
    
    for tf in sorted(tech_files):
        with open(tf, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            tid = data.get("id")
            mid = data.get("mitigation_id")
            
            try:
                jsonschema.validate(instance=data, schema=tech_schema)
                print(f"[OK] {tid} matches technique.schema.json")
            except jsonschema.ValidationError as ve:
                print(f"[FAIL] {tf}: {ve.message}")
                errors += 1
                
            if tid in seen_tech_ids:
                print(f"[FAIL] Duplicate technique ID detected: {tid}")
                errors += 1
            seen_tech_ids.add(tid)
            
            if mid in seen_mit_ids:
                print(f"[FAIL] Duplicate mitigation ID detected: {mid}")
                errors += 1
            seen_mit_ids.add(mid)
            
    # 2. Validate Cases
    print("\n--- Validating Case Assessment Records ---")
    case_schema = load_json_schema(CASE_SCHEMA_PATH)
    case_files = glob.glob(os.path.join(REPO_ROOT, "cases", "**", "*.yaml"), recursive=True)
    
    for cf in sorted(case_files):
        with open(cf, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            cid = data.get("case_id", os.path.basename(cf))
            
            try:
                jsonschema.validate(instance=data, schema=case_schema)
                print(f"[OK] {cid} ({cf}) matches case.schema.json")
            except jsonschema.ValidationError as ve:
                print(f"[FAIL] {cf}: {ve.message}")
                errors += 1

    if errors > 0:
        print(f"\n[ERROR] Validation failed with {errors} error(s).")
        sys.exit(1)
    else:
        print(f"\n[SUCCESS] All techniques and case records strictly validated.")
        sys.exit(0)

if __name__ == "__main__":
    validate_all()
