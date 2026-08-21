# Changelog

All notable changes to the APCAF specification, schemas, and tooling will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-21

### Added
- Initial APCAF Base specification and taxonomy architecture.
- Four core non-invasive assessment techniques:
  - `PHY-T1001`: Credential Technology Assessment (Static UID vs. Crypto Mutual Auth).
  - `PHY-T1002`: Door & Latch Protection Assessment (Operating Clearance vs. Astragal Shielding).
  - `PHY-T1003`: REX Sensor Placement Assessment (Detection Zone Exposure vs. Deflector Hood).
  - `PHY-T1004`: Exposed Physical Network Interface Assessment (Layer 1 Link vs. Port Shutdown).
- Canonical JSON Schemas:
  - `schemas/technique.schema.json` for technique definitions.
  - `schemas/case.schema.json` for case assessment records with explicit provenance.
- Synthetic case fixture `cases/synthetic/APCAF-CASE-001.yaml` for automated schema validation.
- Field case template `cases/field/APCAF-CASE-TEMPLATE.yaml` for authorized field walks.
- Single source of truth compilation script `scripts/build_data.py` generating `data/techniques.json`.
- Offline-first interactive Field Triage workbench (`tools/field-triage.html`).
- Sample Assessment Authorization Language (`templates/ENGAGEMENT_CONSENT_CLAUSE.md`).
- Optional Vendor Remediation & Warranty Notice Profile (`templates/VENDOR_REMEDIATION_NOTICE.md`).
- GitHub Actions automated validation workflow (`.github/workflows/validate.yml`).
