# APCAF: Adversarial Physical Control Assessment Framework
### *An open specification for standardized, non-invasive physical security control assessment*

[![Specification: CC BY 4.0](https://img.shields.io/badge/Specification-CC%20BY%204.0-lightgrey.svg)](LICENSE)
[![Tooling: MIT](https://img.shields.io/badge/Tooling-MIT-blue.svg)](LICENSE)
[![Architecture: ATT&CK-Inspired](https://img.shields.io/badge/Taxonomy-ATT%26CK%20Inspired-orange.svg)](docs/TAXONOMY.md)
[![Methodology: Non-Invasive QA](https://img.shields.io/badge/Methodology-Non--Invasive%20QA-brightgreen.svg)](VENDOR_QA_SCORECARD.md)
[![Version: Draft v0.1.0](https://img.shields.io/badge/Version-Draft%20v0.1.0-blue.svg)](VERSION)

**APCAF (Adversarial Physical Control Assessment Framework)** is an open specification for standardized, non-invasive physical security control assessment. Drawing architectural inspiration from the structured taxonomy principles of MITRE ATT&CK®, APCAF provides a standardized method for assessing observable physical conditions associated with known adversarial bypass techniques through defined, repeatable, and non-destructive inspection procedures.

---

## Operational Boundaries: What APCAF Does and Does NOT Claim

To maintain scientific integrity and prevent misinterpretation, APCAF explicitly establishes its operational boundaries:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 OPERATIONAL BOUNDARIES                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WHAT APCAF DOES:                                                                       │
│ • Maps known adversarial techniques to observable physical hardware conditions.        │
│ • Provides standardised, repeatable non-invasive inspection procedures.               │
│ • Documents observable deficiencies against building and engineering specifications.  │
│ • Evaluates findings against deterministic risk context and organizational appetite.  │
│ • Supports facility commissioning, quality assurance, and remediation verification.   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WHAT APCAF DOES NOT DO:                                                                │
│ • Does NOT perform destructive penetration testing, lockpicking, or forced entry.     │
│ • Does NOT prove successful exploitation or claim a demonstrated physical breach.      │
│ • Does NOT certify regulatory compliance (PCI DSS, ISO 27001, SOC 2 belong to audits). │
│ • Does NOT determine legal or contractual liability automatically.                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## The 5 Core Disciplinary Layers of APCAF

APCAF maintains a rigorous separation between adversarial threat intelligence, physical observation, asset context, and organizational treatment:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               THE 5 DISCIPLINARY LAYERS                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. TECHNIQUE            --> What can an adversary potentially do?                      │
│                             (Catalogued across Tactics PHY-TAC-01 through PHY-TAC-06)  │
│                                                                                        │
│ 2. ASSESSMENT PROCEDURE --> What can we safely observe to test the condition?          │
│                             (Defined non-invasive procedure, tools, and read times)    │
│                                                                                        │
│ 3. FINDING              --> What did we actually observe?                              │
│                             (Empirical evidence, telemetry, and technical disposition) │
│                                                                                        │
│ 4. RISK CONTEXT         --> What does that mean in this specific environment?          │
│                             (Deterministic: Asset Criticality × Exposure × Consequence)│
│                                                                                        │
│ 5. TREATMENT            --> What does the organization decide to do?                   │
│                             (Defensible decision: Remediate, Compensate, Accept, Avoid)│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## The 6 Physical Security Tactics

Physical security controls protect spatial boundaries against adversary actions across six defined tactics:

| Tactic ID | Tactic Name | Objective |
| :--- | :--- | :--- |
| **`PHY-TAC-01`** | **Physical Reconnaissance** | Gathering spatial, optical, and operational intelligence prior to physical approach. |
| **`PHY-TAC-02`** | **Perimeter & Ingress** | Breaching or bypassing external boundaries, gates, or exterior pedestrian portals. |
| **`PHY-TAC-03`** | **Credential & Access Bypass** | Circumventing electronic access-control authenticators and readers. |
| **`PHY-TAC-04`** | **Interior Traversal & Evasion** | Moving across interior zones and evading detection within secured facilities. |
| **`PHY-TAC-05`** | **Physical-to-Cyber Execution** | Gaining unauthorized logical or data access via physical hardware interfaces. |
| **`PHY-TAC-06`** | **Egress & Cleanup** | Exiting the facility and concealing physical evidence of unauthorized presence. |

---

## Base Assessment Coverage (v0.1.0 Baseline)

APCAF Base defines four foundational assessment techniques:

| Technique ID | Name | Target Object | Non-Invasive Assessment Condition | Benchmark Read Time |
| :--- | :--- | :--- | :--- | :--- |
| **`PHY-T1001`** | **Credential Technology Assessment** | BADGE | Evaluate credential carrier frequency, identifier broadcast behavior (static vs dynamic), and cryptographic mutual authentication capability. | **5 Seconds** |
| **`PHY-T1002`** | **Door & Latch Protection Assessment** | DOOR | Evaluate perimeter frame operating clearances against applicable assembly tolerances and check for continuous protective astragal shielding. | **15 Seconds** |
| **`PHY-T1003`** | **REX Sensor Placement Assessment** | SENSOR | Check perimeter gaps for optical line-of-sight to interior REX PIR sensor body/lens and verify directional deflector hood installation. | **15 Seconds** |
| **`PHY-T1004`** | **Exposed Network Interface Assessment** | PORT | Test unmonitored wall drops with a passive LED tester for physical Layer 1 carrier signaling to verify port shutdown or isolation. | **10 Seconds** |

*Note: The **45-second budget** represents the target inspection benchmark across baseline controls during the APCAF Fast-Path Profile. It excludes transit, photo logging, and administrative reporting.*

---

## Deterministic Risk Model & Appetite Engine

A physical finding has different risk significance depending on operational setting. APCAF derives calculated risk deterministically:

$$\text{Risk Score} = \text{Asset Criticality (AC: 1..4)} \times \text{Physical Exposure (PE: 1..4)} \times \text{Consequence (C: 1..4)}$$

* **Score Domain:** $[1, 64]$
* **Deterministic Levels:**
  * **1 - 8:** `LOW` (Eligible for standard operational risk acceptance)
  * **9 - 23:** `MEDIUM` (Requires formal review, eligible for compensating controls)
  * **24 - 47:** `HIGH` (Requires prioritized remediation or validated compensation)
  * **48 - 64:** `CRITICAL` (Mandatory emergency escalation and physical hold)
* **Appetite Evaluation:** Evaluates whether residual risk exceeds the organization's configured tolerance.

See [`docs/RISK_MODEL.md`](docs/RISK_MODEL.md) for the full specification.

---

## Repository Structure

```
APCAF/
├── README.md                          # Specification overview and framework architecture
├── CHANGELOG.md                       # Release notes and version history
├── GOVERNANCE.md                      # Project maintainership and RFC process
├── SECURITY.md                        # Vulnerability disclosure and accuracy reporting
├── CONTRIBUTING.md                    # Contribution guidelines and validation rules
├── LICENSE                            # Dual license (CC BY 4.0 for spec, MIT for tooling)
├── VERSION                            # Specification semantic version (0.1.0)
├── VENDOR_QA_SCORECARD.md             # Fast-path physical inspection reference sheet
├── docs/
│   ├── TAXONOMY.md                    # Detailed APCAF 6-tactic physical security taxonomy
│   └── RISK_MODEL.md                  # Deterministic 3-axis risk scoring and treatment specification
├── techniques/
│   ├── PHY-T1001/                     # Canonical YAML & documentation for T1001
│   ├── PHY-T1002/                     # Canonical YAML & documentation for T1002
│   ├── PHY-T1003/                     # Canonical YAML & documentation for T1003
│   └── PHY-T1004/                     # Canonical YAML & documentation for T1004
├── schemas/
│   ├── technique.schema.json          # JSON Schema for technique specifications
│   ├── case.schema.json               # JSON Schema for case assessment records
│   └── risk_context.schema.json       # JSON Schema for deterministic risk context & treatment
├── cases/
│   ├── synthetic/                     # Synthetic test fixtures for schema validation
│   └── field/                         # Real-world field assessment cases & templates
├── templates/
│   ├── ENGAGEMENT_CONSENT_CLAUSE.md   # Sample assessment authorization language
│   └── VENDOR_REMEDIATION_NOTICE.md   # Commercial warranty punch list profile (APCAF-WF-01)
├── scripts/
│   ├── build_data.py                  # Single source of truth compiler (YAML -> JSON)
│   └── validate_schemas.py            # Automated schema & integrity validator
├── data/
│   └── techniques.json                # Compiled canonical dataset
└── tools/
    └── field-triage.html              # Offline-first interactive assessment & risk workbench
```

---

## Governance & Licensing

APCAF is developed and maintained by the **APCAF Maintainers**:
* **Specification & Documentation:** Licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
* **Tooling & Code:** Licensed under **MIT License**.
* **Issues & RFCs:** [GitHub Issues & Discussions](https://github.com/zoecyber001/APCAF/issues)
