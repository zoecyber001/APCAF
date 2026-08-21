# APCAF Project Governance

## 1. Overview
The Adversarial Physical Control Assessment Framework (APCAF) is developed as an open specification for standardized, non-invasive physical security control assessment.

This document outlines the decision-making process, roles, and contribution pathways for the APCAF project.

## 2. Maintainers
The project is currently steward-led by the **APCAF Maintainers**. 

Maintainers are responsible for:
- Reviewing and approving RFC proposals and technique contributions.
- Maintaining schema integrity (`schemas/technique.schema.json` and `schemas/case.schema.json`).
- Enforcing the three-tier evidence integrity model (Specification vs. Demonstration vs. Field Evidence).
- Tagging official specification releases and version milestones.

## 3. Contribution & RFC Process
All modifications to the core taxonomy, baseline techniques, and schemas must follow the standardized Request for Comments (RFC) pathway:

1. **Proposal:** An issue or pull request proposing a new technique (`techniques/PHY-TXXXX/technique.yaml`) or modification is submitted following `CONTRIBUTING.md`.
2. **Review:** Maintainers review the proposal against the non-invasive assessment boundary and technical requirements.
3. **Validation:** Automated GitHub Action workflows must pass schema validation and uniqueness checks.
4. **Adoption:** Upon consensus among Maintainers, the technique is merged into the canonical repository and compiled into the release dataset.

## 4. Release Versioning
APCAF follows Semantic Versioning (`MAJOR.MINOR.PATCH`):
- `MAJOR`: Significant restructuring of taxonomy, breaking schema changes, or core pipeline shifts.
- `MINOR`: Addition of new validated techniques, mitigations, or profile extensions.
- `PATCH`: Documentation corrections, bug fixes in tooling, and citation updates.
