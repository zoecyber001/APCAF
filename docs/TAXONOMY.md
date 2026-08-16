# APCAF Taxonomy Specification: An ATT&CK-Inspired Behavioral Model

**Standard:** Adversarial Physical Control Assessment Framework (APCAF)  
**Reference Model:** Behavioral taxonomy principles inspired by MITRE ATT&CK®, applied to Physical & Hardware-Layer Security  
**Status:** Architectural Specification & Standard Definition  

---

## 1. Why Physical Security Needs an ATT&CK Model

MITRE ATT&CK transformed cybersecurity by establishing three foundational tenets:
1. **De-abstracted threat language:** Replaced ambiguous terminology (*"the system was compromised"*) with discrete, observable technical behaviors (*"T1059.001: PowerShell execution"*).
2. **Decoupled defensive evaluation from vendor marketing:** Grounded defensive resilience in objective technical mechanics rather than vendor claims.
3. **Bridged technical findings to enterprise compliance:** Mapped adversarial techniques directly to NIST SP 800-53, CIS Controls, and ISO 27001.

**The Traditional Gap in Physical Security:**  
Traditional compliance audits verify nominal control presence (e.g., confirming a lock or badge reader is installed) without evaluating hardware resilience against known bypass mechanisms. In practice, legacy installations frequently present observable hardware gaps, unshielded latches, and unencrypted RFID credentials that fail to resist well-documented bypass techniques.

APCAF adapts the MITRE ATT&CK taxonomy hierarchy to physical security:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               APCAF PHYSICAL TAXONOMY HIERARCHY                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. TACTICS (PHY-TAC-XX)    --> The Adversary's Physical Objective (The "Why")           │
│ 2. TECHNIQUES (PHY-TXXXX)  --> The Hardware/Spatial Mechanism (The "How")              │
│ 3. PASSIVE QA SPEC (PQ-XX) --> Non-Invasive 45s Inspection Standard (Passive QA)       │
│ 4. MITIGATIONS (PHY-MXXXX) --> Hardened Engineering Remediation Spec (Commissioning)    │
│ 5. COMPLIANCE MAPPINGS     --> Cross-Walk to ISO 27001, PCI DSS v4, SOC 2, NIST PE     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Three-Tier Evidence and Integrity Architecture

To maintain scientific rigor and prevent unverified assumptions from being presented as empirical fact, APCAF strictly enforces a three-tier categorization across all taxonomy items and case artifacts:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          THREE-TIER INTEGRITY CLASSIFICATION                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. TECHNIQUE HYPOTHESIS   --> The theoretical or documented bypass mechanism described │
│                               in security research and adversary tradecraft.           │
│ 2. ASSESSMENT CONDITION   --> The normative, non-invasive physical test condition       │
│                               defined by APCAF (e.g., gap > 3.2mm, active PHY link).   │
│ 3. EMPIRICAL FIELD EVIDENCE -> Authorized, peer-validated physical audit logs stored   │
│                               in cases/ with verifiable evidence provenance.           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 5 Core APCAF Physical Tactics (The Physical Kill-Chain)

Every physical intrusion follows a distinct sequence of spatial and hardware barriers. APCAF defines 5 core Tactics:

| Tactic ID | Tactic Name | Objective |
| :--- | :--- | :--- |
| **PHY-TAC-01** | **Perimeter & Boundary Ingress** | Breaching the outermost physical property line, fences, vehicle gates, and loading bays. |
| **PHY-TAC-02** | **Credential & Identity Interception** | Harvesting, cloning, relaying, or forging access control tokens and electronic credentials. |
| **PHY-TAC-03** | **Portal & Architectural Ingress** | Defeating pedestrian doors, turnstiles, latch assemblies, and egress sensor mechanisms. |
| **PHY-TAC-04** | **Enclave & Asset Containment Breach**| Bypassing server racks, secure vaults, data center cages, and demarcation partitions. |
| **PHY-TAC-05** | **Physical Interface & Signal Tapping**| Gaining unauthorized electrical, data, or serial access via wall drops, PoE lines, or consoles. |

---

## 4. Techniques, Sub-Techniques & Mitigations Matrix

Below is the foundational technique mapping for the core MVP baseline techniques:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  APCAF TECHNIQUE MATRIX (CORE)                                   │
├──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────────┤
│ PHY-TAC-02:          │ PHY-TAC-03:          │ PHY-TAC-03:          │ PHY-TAC-05:                 │
│ Credential Intercept │ Portal Ingress       │ Portal Ingress       │ Interface & Tapping         │
├──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────────┤
│ PHY-T1001            │ PHY-T1002            │ PHY-T1003            │ PHY-T1004                   │
│ Unencrypted RFID     │ Mechanical Latch     │ REX Sensor Blind     │ Exposed Active Physical     │
│ Harvesting           │ Manipulation         │ Activation           │ Network Interface           │
│                      │                      │                      │                             │
│ ├─ .001 LF 125kHz    │ ├─ .001 Latch Slip   │ ├─ .001 Aerosol /    │ ├─ .001 Active PHY Link     │
│ └─ .002 MIFARE CSN   │ ├─ .002 Under-Door   │    Thermal Inversion │ └─ .002 Unisolated Drop     │
│                      │ └─ .003 Transom Gap  │ └─ .002 Line-of-Sight│                             │
└──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────────┘
```

### Detailed Technique Specifications

#### Technique: `PHY-T1001` - Unencrypted RFID Harvesting
* **Tactic:** `PHY-TAC-02: Credential & Identity Interception`
* **MVP Control Mapping:** `APCAF-01`
* **Technique Hypothesis:** Access control systems that rely on unencrypted static card identifiers (e.g. 26-bit Wiegand UID or unauthenticated CSN) can be harvested wirelessly without cryptographic challenge-response validation.
* **Assessment Condition:** Does this credential rely on an exposed static identifier as an authentication factor, without cryptographic mutual authentication?
* **Sub-Techniques:**
  * `PHY-T1001.001`: Low-Frequency (125 kHz) ASK/FSK Proximity broadcast (HID Prox, EM4100, Indala).
  * `PHY-T1001.002`: High-Frequency (13.56 MHz) ISO 14443-A CSN-only read without mutual authentication (MIFARE Classic 1K/4K with static keys).
* **Passive QA Standard (5s):** Interrogate credential using a pocket dual-frequency reader. If the credential exposes a static non-cryptographic identifier without AES/crypto challenge-response, classify as **Legacy / Soft**.
* **Mitigation (`PHY-M1001`):** Mandate ISO/IEC 14443-4 or ISO/IEC 7816 credentials with AES-128/256 mutual authentication (MIFARE DESFire EV2/EV3, HID Seos, PIV/CAC PKI smartcards) and activate Secure Access Module (SAM) keys on readers.
* **Compliance Mapping:** ISO 27001:2022 `A.7.2`, PCI DSS v4 `Req 9.2.1`, SOC 2 `CC6.4`.

---

#### Technique: `PHY-T1002` - Mechanical Latch Manipulation (Latch Slip)
* **Tactic:** `PHY-TAC-03: Portal & Architectural Ingress`
* **MVP Control Mapping:** `APCAF-02A`
* **Technique Hypothesis:** Latch bolt assemblies on outward-swinging doors can be mechanically manipulated through jamb clearances when deadlatching triggers or protective overlapping astragal plates are absent.
* **Assessment Condition:** Does the door-to-frame operating clearance exceed 3.2mm (1/8 in.) with direct line-of-sight to the latch bolt bevel and no continuous protective astragal plate?
* **Sub-Techniques:**
  * `PHY-T1002.001`: Latch bolt slipping on outward-opening doors via unguarded frame gap.
  * `PHY-T1002.002`: Under-door tool (UDT) reach targeting interior lever handle.
* **Passive QA Standard (15s):** Visual inspection and feeler gap gauge measurement. Under **NFPA 80 (2022) §6.3.1.7.1** and **ANSI/SDI A250.8 / SDI-122**, the maximum allowable perimeter operating clearance between door and frame is **1/8 in. (3.18 mm / 3.2 mm)** for hollow metal doors. If door gap exceeds 3.2mm and lacks an overlapping continuous stainless steel astragal plate, classify as **Legacy / Soft**.
* **Citations & Standards:** NFPA 80 §6.3.1.7.1, ANSI/SDI A250.8, SDI-122, IBC Chapter 7/10.
* **Mitigation (`PHY-M1002`):** Install full-height, continuous heavy-gauge stainless steel interlocking astragal latch guards and deadlocking latch bolts.
* **Compliance Mapping:** ISO 27001:2022 `A.7.4`, PCI DSS v4 `Req 9.1.1`.

---

#### Technique: `PHY-T1003` - Request-to-Exit (REX) Sensor Blind Activation
* **Tactic:** `PHY-TAC-03: Portal & Architectural Ingress`
* **MVP Control Mapping:** `APCAF-02B`
* **Technique Hypothesis:** Unshielded interior passive infrared (PIR) Request-to-Exit sensors can be inadvertently triggered from the exterior portal margin if their optical detection field extends to exterior gaps or through thermal/airflow gradients.
* **Assessment Condition:** Is the interior Request-to-Exit motion sensor optical field visible through door perimeter gaps without a directional deflector hood?
* **Sub-Techniques:**
  * `PHY-T1003.001`: Thermal gradient perturbation through unsealed frame or transom gap.
  * `PHY-T1003.002`: Optical line-of-sight trigger through perimeter gap.
* **Passive QA Standard (15s):** Inspect optical line-of-sight through top and side door gaps. If REX PIR sensor lens is visible from the exterior without a directional deflector shroud, classify as **Legacy / Soft**.
* **Mitigation (`PHY-M1003`):** Install UL-listed directional REX PIR beam deflector hoods and perimeter brush/gasket seals (NFPA 101 §7.2.1.6.2).
* **Compliance Mapping:** ISO 27001:2022 `A.7.4`, SOC 2 `CC6.4`.

---

#### Technique: `PHY-T1004` - Exposed Active Physical Network Interface
* **Tactic:** `PHY-TAC-05: Physical Interface & Signal Tapping`
* **MVP Control Mapping:** `APCAF-03`
* **Technique Hypothesis:** Accessible physical network jacks in public or unmonitored areas broadcasting active Layer 1 carrier signaling present an exposed attack surface if not administratively isolated or protected by 802.1X quarantine.
* **Assessment Condition:** Does an accessible wall jack in an unrestricted area broadcast an active physical Layer 1 carrier without port shutdown or documented 802.1X quarantine?
* **Sub-Techniques:**
  * `PHY-T1004.001`: Active Ethernet PHY link pulse on unmonitored wall drop.
  * `PHY-T1004.002`: Exposed unisolated physical port in public/common zone.
* **Passive QA Standard (10s):** Insert a passive zero-packet LED link-state tester. If the Layer 1 PHY carrier LED illuminates on an unmonitored common area drop, classify as **Legacy / Soft**. *(Note: This test assesses physical exposure and Layer 1 link state availability; Layer 3 IP routing or network-layer access controls require authorized active testing).*
* **Mitigation (`PHY-M1004`):** Administratively disable unassigned switch ports (`shutdown`), physically patch down public drops to isolated guest VLANs, and enforce IEEE 802.1X port security (NIST SP 800-53 PE-3).
* **Compliance Mapping:** ISO 27001:2022 `A.7.4` / `A.8.20`, PCI DSS v4 `Req 9.1.2`, NIST SP 800-53 `PE-3`.

---

## 5. Methodological Distinction: Observable Susceptibility vs. Exploitability

A fundamental tenet of APCAF is maintaining a strict, legally sound boundary between **non-invasive passive assessment** and **destructive exploitation**:

| Assessment Layer | What APCAF Measures | What APCAF Does NOT Do |
| :--- | :--- | :--- |
| **Passive QA Specification** | Verifies whether the installed hardware presents **observable conditions associated with known bypasses** (e.g. frame margin $> 3.2\text{mm}$, plaintext UID transmission, active Layer 1 carrier). | Does **not** insert destructive bypass tools, pick cylinder pins, force latch mechanisms, or inject unauthorized network packets into client subnets. |
| **Finding Interpretation** | Classifies whether a physical barrier satisfies the defined engineering and commissioning specification. | Does **not** claim a facility has suffered a demonstrated physical breach. |

---

## 6. Architectural Roadmap: From 4-Control MVP to Multi-Variable Scoring

```
PHASE 1 (MVP BASELINE SPECIFICATION)       PHASE 2 (FIELD VALIDATION PHASE)    PHASE 3 (INDUSTRY STANDARD)
┌───────────────────────────────────────┐  ┌───────────────────────────────┐  ┌───────────────────────────────┐
│ The 4-Technique Core MVP              │  │ Empirical Field Cataloguing   │  │ Full Open Behavioral Matrix   │
│ • PHY-T1001 (Unencrypted RFID)        │  │ • Documented Real Field Walks │  │ • Complete PHY-TAC-01 to 05   │
│ • PHY-T1002 (Mechanical Latch Slip)   │─>│ • Non-Binary Resistance Scale │─>│ • STIX 2.1 / TAXII Export     │
│ • PHY-T1003 (REX Sensor Exposure)     │  │ • Multi-Factor Confidence     │  │ • Automated Punch Lists       │
│ • PHY-T1004 (Active Network Drop)     │  │ • Community Case Pipeline     │  │ • Open Remediation Repository │
└───────────────────────────────────────┘  └───────────────────────────────┘  └───────────────────────────────┘
```

### Multi-Variable Evaluation Model (Phase 2 Progression)
While the MVP utilizes a fast-path binary classification (**Hardened** vs. **Legacy/Soft**) to enable rapid 45-second site walks, APCAF is engineered to evolve toward a multi-variable scoring model:

$$\text{Evaluation} = \text{Applicability} \rightarrow \text{Observed Condition} \rightarrow \text{Resistance Level} \rightarrow \text{Confidence} \rightarrow \text{Remediation Priority}$$

* **Hardened:** Control actively satisfies specification standards with cryptographic or physical barriers (e.g. AES-128 crypto, continuous overlapping steel astragal).
* **Partially Hardened:** Primary defense is in place but lacks secondary depth (e.g. astragal installed, but door closer speed allows latch hang-up).
* **Susceptible / Defect:** Observable physical condition permits straightforward bypass without resistance.

### Architectural Guardrails
1. **Never stall field execution for taxonomy expansion:** All taxonomy IDs (`PHY-TXXXX`) map directly to executable field checks.
2. **Every technique must define a Passive QA Spec:** A technique cannot exist in APCAF unless it can be evaluated objectively without destructive testing or liability.
3. **Actionable Non-Conformance Mapping:** Every technique must provide concrete, contractually clear remediation guidance that can be evaluated during facility commissioning.
