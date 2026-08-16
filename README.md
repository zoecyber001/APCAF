# APCAF - Adversarial Physical Control Assessment Framework
### *An ATT&CK-Inspired Open Specification for Adversarial Physical-Control Assessment*

[![License: CC BY 4.0](https://img.shields.io/badge/Specification-CC%20BY%204.0-lightgrey.svg)](LICENSE)
[![License: MIT](https://img.shields.io/badge/Tooling-MIT-blue.svg)](LICENSE)
[![Framework: ATT&CK-Aligned](https://img.shields.io/badge/Taxonomy-ATT%26CK%20Inspired-orange.svg)](docs/TAXONOMY.md)
[![Methodology: Passive QA](https://img.shields.io/badge/Methodology-Non--Invasive%20QA-brightgreen.svg)](VENDOR_QA_SCORECARD.md)

**APCAF (Adversarial Physical Control Assessment Framework)** is an open physical security evaluation standard inspired by the behavioral taxonomy principles of MITRE ATT&CK®. It evaluates whether physical security controls satisfy baseline resilience criteria against known adversary bypass techniques under passive inspection, rather than verifying nominal existence alone.

---

## Governance & Boundary: What APCAF Does and Does NOT Claim

To maintain scientific integrity and prevent misinterpretation, APCAF explicitly defines its operational boundaries:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 OPERATIONAL BOUNDARIES                                 │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WHAT APCAF DOES:                                                                       │
│ • Maps known adversarial techniques to observable physical hardware conditions.        │
│ • Provides standardised, repeatable non-invasive inspection procedures.               │
│ • Documents susceptibility non-conformances against building/engineering standards.   │
│ • Supports facility commissioning remediation and post-installation warranty QA.       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ WHAT APCAF DOES NOT DO:                                                                │
│ • Does NOT perform destructive penetration testing or physical lockpicking.           │
│ • Does NOT prove successful exploitation or claim a demonstrated physical breach.      │
│ • Does NOT certify regulatory compliance (PCI/ISO/SOC 2 compliance belongs to audits). │
│ • Does NOT determine legal or contractual liability automatically.                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## What is APCAF in Plain English? (The Mental Model)

APCAF checks whether physical security controls can resist common attacker bypasses. 

Instead of asking only *"Is there a lock on the door?"*, APCAF asks **"How could someone bypass this lock, and does the physical setup resist that condition?"**

### The 5-Step Evaluation Pipeline
```
[01. TACTIC]      --> The Goal: What is the attacker trying to achieve? (e.g. Portal Ingress: get through the door)
      │
[02. TECHNIQUE]   --> The Mechanism: What bypass path could they use? (e.g. Latch Slip: manipulate latch via gap)
      │
[03. OBSERVATION] --> The Check: What physical condition enables this? (e.g. Feeler gauge gap > 3.2mm, no astragal)
      │
[04. ASSESSMENT]  --> The Status: Is the hardware hardened or susceptible? (e.g. Legacy / Soft Defect)
      │
[05. REMEDIATION] --> The Fix: How is it rectified? (e.g. Contractor mounts steel astragal under installation warranty)
```

### Choose Your Pathway
* **[1. Learn it (Interactive Field Guide)](https://zoecyber001.github.io/APCAF/learn.html)** - A 6-lesson practical introduction with an interactive facility simulator.
* **[2. Use it (45s Field Triage)](https://zoecyber001.github.io/APCAF/tools/field-triage.html)** - Non-invasive physical security evaluation with automated CISO warranty notices.
* **[3. Study it (Technical Standard)](https://zoecyber001.github.io/APCAF/docs.html)** - Full taxonomy matrix, NFPA 80 building codes, and Atomic Red Team YAML test specs.

---

## 1. Architectural Foundation: Learning from MITRE ATT&CK

MITRE ATT&CK transformed cybersecurity by creating a **standardized, vendor-agnostic language** for cyber adversary behavior. APCAF applies similar structural principles to physical security, establishing a standardized taxonomy for physical-control assessment:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              APCAF TAXONOMY ARCHITECTURE                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Tactics (PHY-TAC-01..05)    ──> The Adversary's Spatial/Access Goal                 │
│ 2. Techniques (PHY-T1001..T1031)──> The Physical/Hardware Bypass Mechanism              │
│ 3. Passive QA Spec (45s MVP)   ──> Standardised, repeatable hardware inspection        │
│ 4. Mitigations (PHY-M1001..M1004)──> Remediation specifications & warranty alignment   │
│ 5. Compliance Cross-Walk       ──> Mapped to ISO 27001 (A.7/A.8), PCI DSS v4 (Req 9)   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

Detailed architectural specifications and taxonomy mapping are in [`docs/TAXONOMY.md`](docs/TAXONOMY.md).

---

## 2. Field Controls vs. Adversarial Techniques

To maintain clarity between operational walks and taxonomy analysis:
* **Field Control (`APCAF-XX`):** The physical inspection station or fixture evaluated during a walk.
* **Technique (`PHY-TXXXX`):** The distinct adversary bypass mechanism assessed at that station.

| Field Control | Evaluated Techniques | Objective | Method | Target Direct Read Budget |
| :--- | :--- | :--- | :--- | :--- |
| **`APCAF-01`** | **`PHY-T1001` (Unencrypted RFID Harvesting)** | Credential Intercept | Contactless pocket RFID reader read | **5 Seconds** |
| **`APCAF-02`** | **`PHY-T1002` (Latch Slip)**<br>**`PHY-T1003` (REX Blind Trip)** | Portal Ingress | Feeler gauge & optical line-of-sight check | **30 Seconds** (15s + 15s) |
| **`APCAF-03`** | **`PHY-T1004` (Exposed Active Physical Interface)** | Interface & Tap | Passive zero-packet LED link state test | **10 Seconds** |

*Note: The **45-second walk budget** represents the target direct observation and measurement time across the baseline controls. It excludes transit, logging, and administrative reporting.*

---

## 3. The 45-Second Fast-Path Field Scorecard

| APCAF ID | Technique | Passive Non-Invasive Inspection Method | Hardened Standard | Building / Fire Code Citation |
| :--- | :--- | :--- | :--- | :--- |
| **`APCAF-01`** | **`PHY-T1001`** | Interrogate badge frequency & crypto profile | AES-128 / DESFire EV3 / Seos | ISO/IEC 14443-4, NIST SP 800-116 |
| **`APCAF-02`** | **`PHY-T1002`**<br>**`PHY-T1003`** | Measure operating gap & inspect PIR line-of-sight | Continuous Astragal + Shrouded REX PIR | **NFPA 80 §6.3.1.7.1 (Max 3.2mm)**, ANSI/SDI A250.8, NFPA 101 |
| **`APCAF-03`** | **`PHY-T1004`** | Inspect Layer 1 PHY carrier state | Zero Link Pulse / Admin Shutdown | IEEE 802.1X-2020, NIST SP 800-53 PE-3 |

Detailed operational instructions: [`VENDOR_QA_SCORECARD.md`](VENDOR_QA_SCORECARD.md).

---

## 4. Repository Structure

```
APCAF/
├── README.md                          # Framework architecture, philosophy & standard
├── CONTRIBUTING.md                    # Contribution guidelines & technique YAML schema
├── LICENSE                            # Dual license (CC BY 4.0 for spec, MIT for tooling)
├── VENDOR_QA_SCORECARD.md             # One-pager fast-path inspection reference manual
├── docs/
│   └── TAXONOMY.md                    # Formal MITRE-aligned physical security taxonomy
├── schemas/
│   └── case.schema.json               # JSON Schema for standardized audit case logs
├── templates/
│   ├── ENGAGEMENT_CONSENT_CLAUSE.md   # Fast-path SOW & legal authorization addendums
│   └── VENDOR_WARRANTY_NOTICE.md      # Executive CISO invoice-hold & punch list notice
├── cases/
│   └── APCAF-CASE-001.yaml            # Synthetic demonstration case / schema validation fixture
└── tools/
    └── field-triage.html              # Offline-first zero-dependency interactive triage app
```

---

## 5. Governance & Community Contributions

APCAF is developed and maintained by the **APCAF Working Group** as an open, vendor-neutral standard:
* **Submissions:** Community researchers can propose new `PHY-Txxxx` techniques via GitHub PRs following [`CONTRIBUTING.md`](CONTRIBUTING.md).
* **Licensing:** The written standard and taxonomy are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Assessment tools and code are licensed under **MIT**.
* **Contact & Inquiries:** [GitHub Issues & Discussions](https://github.com/zoecyber001/APCAF/issues)

---

## 6. Real-World Execution Path

```mermaid
sequenceDiagram
    autonumber
    actor Auditor
    actor CISO
    actor Vendor as Installer / Integrator
    
    Auditor->>CISO: Insert 1-sentence consent clause in SOW (templates/ENGAGEMENT_CONSENT_CLAUSE.md)
    Auditor->>Auditor: Perform 45s passive QA during audit walk
    alt Deficiencies Found (Legacy / Soft)
        Auditor->>CISO: Deliver Assessment Findings + Vendor Warranty Punch List
        CISO->>Vendor: Issue Warranty Notice & request rectification under contract
        Vendor->>CISO: Rectifies hardware under warranty
    else All Controls Hardened
        Auditor->>CISO: Deliver clean QA Verification Summary
    end
    Auditor->>Auditor: Commit case data to cases/APCAF-CASE-XXX.yaml
```
