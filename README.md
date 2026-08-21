# APCAF: Adversarial Physical Control Assessment Framework
### *An open specification for standardized, non-invasive physical security control assessment*

[![Specification: CC BY 4.0](https://img.shields.io/badge/Specification-CC%20BY%204.0-lightgrey.svg)](LICENSE)
[![Tooling: MIT](https://img.shields.io/badge/Tooling-MIT-blue.svg)](LICENSE)
[![Architecture: ATT&CK-Inspired](https://img.shields.io/badge/Taxonomy-ATT%26CK%20Inspired-orange.svg)](docs/TAXONOMY.md)
[![Methodology: Non-Invasive QA](https://img.shields.io/badge/Methodology-Non--Invasive%20QA-brightgreen.svg)](VENDOR_QA_SCORECARD.md)
[![Version: Draft v0.1.0](https://img.shields.io/badge/Version-Draft%20v0.1.0-blue.svg)](VERSION)

**APCAF (Adversarial Physical Control Assessment Framework)** is an open specification for standardized, non-invasive physical security control assessment. Drawing architectural inspiration from the structured taxonomy principles of MITRE ATT&CK®, APCAF evaluates whether installed physical security controls resist known bypass mechanisms through defined, repeatable, and non-destructive inspection procedures.

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
│ • Documents observable deficiencies against building and engineering standards.       │
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

## Plain-English Mental Model

Traditional compliance audits verify nominal control presence: *"Is there a lock on the door?"*

**APCAF complements security audits by adding structured physical-control assessment that may be outside the scope of a conventional control-presence review.** It evaluates whether the installed physical hardware resists known bypass conditions: **"What physical condition would permit bypass, and does the installed hardware prevent that condition?"**

### The 6-Step Evaluation Chain
```
[01. TACTIC]               --> Security Objective: What layer is being protected? (e.g. Portal Protection)
      │
[02. TECHNIQUE HYPOTHESIS] --> Bypass Mechanism: What bypass path is relevant? (e.g. Latch Manipulation)
      │
[03. OBSERVATION]          --> Observable Condition: What can be verified non-invasively? (e.g. Strike clearance > 3.2mm)
      │
[04. EVIDENCE]             --> Measurement / Record: What was directly captured? (e.g. 4.5mm gauge reading + photo)
      │
[05. DISPOSITION]          --> Assessment Result: Hardened vs. Deficient vs. Condition Requires Validation
      │
[06. REMEDIATION]          --> Technical Correction: What hardware correction resolves the condition?
```

### Choose Your Pathway
* **[1. Learn APCAF (Field Guide)](https://zoecyber001.github.io/APCAF/learn.html):** A 6-lesson conceptual introduction with interactive scenarios.
* **[2. Field Triage Workbench](https://zoecyber001.github.io/APCAF/tools/field-triage.html):** Non-invasive physical evaluation tool with structured YAML export.
* **[3. Rule Repository](https://zoecyber001.github.io/APCAF/repository.html):** Searchable catalog of baseline techniques, criteria, and citations.
* **[4. Technical Documentation](https://zoecyber001.github.io/APCAF/docs.html):** Detailed taxonomy specification, building code cross-walks, and schemas.

---

## 1. Architectural Foundation: Learning from MITRE ATT&CK

MITRE ATT&CK established three foundational concepts in cybersecurity:
1. **De-abstracted threat language:** Replaced vague descriptions with discrete, observable technical behaviors.
2. **Decoupled defensive evaluation from vendor marketing:** Grounded defense in technical mechanics rather than vendor claims.
3. **Mapped technical findings to enterprise frameworks:** Linked findings to standard security controls.

APCAF applies these architectural lessons to physical security, mapping adversarial hypotheses to non-invasive physical inspection procedures:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APCAF TAXONOMY ARCHITECTURE                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Tactics (PHY-TAC-01..05)       ──> Physical Security Protection Objectives          │
│ 2. Techniques (PHY-T1001..T1004)  ──> Adversarial Bypass Hypotheses & Test Procedures  │
│ 3. Fast-Path Assessment Profile   ──> Benchmark non-invasive inspection procedures     │
│ 4. Mitigations (PHY-M1001..M1004) ──> Engineering specifications & remediation guidance│
│ 5. Standards Cross-Walk           ──> Mapped to ISO 27001, PCI DSS, NFPA 80, ANSI/SDI  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Base Assessment Coverage

APCAF Base currently defines four foundational assessment techniques:

| Technique ID | Name | Target Object | Non-Invasive Assessment Condition | Benchmark Read Time |
| :--- | :--- | :--- | :--- | :--- |
| **`PHY-T1001`** | **Credential Technology Assessment** | BADGE | Interrogate carrier frequency to check for static unencrypted UIDs vs. mutual cryptographic authentication. | **5 Seconds** |
| **`PHY-T1002`** | **Door & Latch Protection Assessment** | DOOR | Measure perimeter frame clearance against NFPA 80 (3.2mm) and verify continuous steel astragal guard. | **15 Seconds** |
| **`PHY-T1003`** | **REX Sensor Placement Assessment** | SENSOR | Check perimeter gaps for optical line-of-sight to interior REX PIR sensor and verify directional deflector hood. | **15 Seconds** |
| **`PHY-T1004`** | **Exposed Network Interface Assessment** | PORT | Test unmonitored wall drops for active Layer 1 carrier signaling to verify port shutdown / isolation. | **10 Seconds** |

*Note: The **45-second budget** represents the target inspection benchmark across the baseline controls during the APCAF Fast-Path Profile. It excludes transit, photo logging, and administrative reporting.*

---

## 3. Standards Cross-Walk

Techniques are grounded in established building, fire, electrical, and information security standards:

| APCAF ID | Technique | Non-Invasive Inspection Method | Hardened Criteria | Technical References | Framework Mappings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`PHY-T1001`** | Credential Technology | Dual-frequency RFID read | AES-128 / DESFire EV3 / Seos / PIV | ISO/IEC 14443-4, NIST SP 800-116 | ISO 27001 A.7.2, PCI DSS Req 9.2.1 |
| **`PHY-T1002`** | Door & Latch Protection | Feeler gauge & alignment | Continuous steel astragal, gap ≤ 3.2mm | **NFPA 80 §6.3.1.7.1**, ANSI/SDI A250.8 | ISO 27001 A.7.1, PCI DSS Req 9.1.1 |
| **`PHY-T1003`** | REX Sensor Placement | Optical line-of-sight | Directional deflector hood installed | **NFPA 101 §7.2.1.6.2**, UL 294 | ISO 27001 A.7.1, PCI DSS Req 9.1.1 |
| **`PHY-T1004`** | Exposed Network Interface| Passive LED link tester | Port administratively shut down | IEEE 802.1X-2020, NIST SP 800-53 PE-3 | ISO 27001 A.8.20, PCI DSS Req 9.1.2 |

---

## 4. Repository Structure

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
│   └── TAXONOMY.md                    # Detailed APCAF physical security taxonomy
├── techniques/
│   ├── PHY-T1001/                     # Canonical YAML & documentation for T1001
│   ├── PHY-T1002/                     # Canonical YAML & documentation for T1002
│   ├── PHY-T1003/                     # Canonical YAML & documentation for T1003
│   └── PHY-T1004/                     # Canonical YAML & documentation for T1004
├── schemas/
│   ├── technique.schema.json          # JSON Schema for technique specifications
│   └── case.schema.json               # JSON Schema for case assessment records
├── cases/
│   ├── synthetic/                     # Synthetic test fixtures for schema validation
│   └── field/                         # Real-world field assessment cases & templates
├── templates/
│   ├── ENGAGEMENT_CONSENT_CLAUSE.md   # Sample assessment authorization language
│   └── VENDOR_REMEDIATION_NOTICE.md   # Optional commercial warranty punch list profile
├── scripts/
│   ├── build_data.py                  # Single source of truth compiler (YAML -> JSON)
│   └── validate_schemas.py            # Automated schema & integrity validator
├── data/
│   └── techniques.json                # Compiled canonical dataset
└── tools/
    └── field-triage.html              # Offline-first interactive assessment workbench
```

---

## 5. Governance & Licensing

APCAF is developed and maintained by the **APCAF Maintainers**:
* **Specification & Documentation:** Licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
* **Tooling & Code:** Licensed under **MIT License**.
* **Issues & RFCs:** [GitHub Issues & Discussions](https://github.com/zoecyber001/APCAF/issues)
