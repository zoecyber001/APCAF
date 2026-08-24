# APCAF Taxonomy Specification: A Behavioral Physical Assessment Model

**Standard:** Adversarial Physical Control Assessment Framework (APCAF)  
**Reference Model:** Behavioral taxonomy principles inspired by MITRE ATT&CK®, applied to Physical & Hardware-Layer Security  
**Status:** Open Specification (Draft v0.1.0)  

---

## 1. Why Physical Security Needs an ATT&CK-Inspired Model

MITRE ATT&CK transformed cybersecurity by establishing three foundational tenets:
1. **De-abstracted threat language:** Replaced ambiguous terminology (*"the system was compromised"*) with discrete, observable technical behaviors (*"T1059.001: PowerShell execution"*).
2. **Decoupled defensive evaluation from vendor marketing:** Grounded defensive resilience in objective technical mechanics rather than vendor claims.
3. **Bridged technical findings to enterprise frameworks:** Mapped adversarial techniques directly to NIST SP 800-53, CIS Controls, and ISO 27001.

**The Traditional Gap in Physical Security:**  
Traditional compliance audits verify nominal control presence (e.g. confirming a lock or badge reader is installed) without evaluating hardware resilience against known bypass mechanisms. In practice, legacy installations frequently present observable hardware gaps, unshielded latches, and unencrypted RFID credentials that fail to resist well-documented bypass techniques.

APCAF adapts the MITRE ATT&CK structural hierarchy to physical security assessment:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               APCAF PHYSICAL TAXONOMY HIERARCHY                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. TACTICS (TA01–TA06)     --> The Physical Security Objective (The "Why")              │
│ 2. TECHNIQUES (PHY-TXXXX)  --> The Bypass Hypothesis & Inspection Procedure (The "How") │
│ 3. PASSIVE ASSESSMENT SPEC --> Non-Invasive Inspection Benchmark Standard (Passive QA)  │
│ 4. RISK CONTEXT ENGINE     --> Deterministic Asset Criticality × Exposure × Consequence │
│ 5. MITIGATIONS (PHY-MXXXX) --> Hardened Engineering Remediation Specification           │
│ 6. STANDARDS CROSS-WALK    --> Mapped to ISO 27001, PCI DSS v4, NFPA 80, ANSI/SDI       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Three-Tier Evidence and Integrity Architecture

To maintain scientific rigor and prevent unverified assumptions from being presented as empirical fact, APCAF strictly enforces a three-tier categorization across all taxonomy items and case artifacts:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          THREE-TIER INTEGRITY CLASSIFICATION                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. SPECIFICATION          --> What APCAF defines the assessor should check (normative  │
│                               criteria, e.g. gap > 3.2mm, active PHY link).            │
│ 2. DEMONSTRATION          --> Simulated or synthetic case fixtures for training and   │
│                               schema validation (e.g. APCAF-CASE-001.yaml).            │
│ 3. FIELD EVIDENCE         --> Authorized, primary empirical observations captured      │
│                               during physical audits with verified provenance.         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. The 6 Core Physical Tactics (Adversarial Physical Attack Surface)

Physical security controls protect spatial boundaries against adversary actions across six defined tactics:

| Tactic ID | Tactic Name | Objective | Representative Techniques / Vectors |
| :--- | :--- | :--- | :--- |
| **PHY-TAC-01 (TA01)** | **Physical Reconnaissance** | Gathering spatial, optical, and operational intelligence prior to physical approach. | Camera blind spot mapping, guard patrol pattern observation, badge-reader technology identification, facility layout discovery. |
| **PHY-TAC-02 (TA02)** | **Perimeter & Ingress** | Breaching or bypassing the external boundary, gates, or exterior pedestrian portals. | Tailgating, mechanical latch slip (`PHY-T1002`), door gap feeler exploitation, barrier bypass, unsecured emergency access. |
| **PHY-TAC-03 (TA03)** | **Credential & Access Bypass** | Circumventing electronic access-control authenticators and readers. | Low-frequency RFID harvesting (`PHY-T1001`), static CSN replay, reader wiring exposure, Wiegand / OSDP controller communication sniffing. |
| **PHY-TAC-04 (TA04)** | **Interior Traversal & Evasion** | Moving across interior zones and evading detection within secured facilities. | Mantrap anti-passback bypass, CCTV coverage gaps, REX sensor blind activation (`PHY-T1003`), partition-wall transit. |
| **PHY-TAC-05 (TA05)** | **Physical-to-Cyber Execution** | Gaining unauthorized logical or data access via physical hardware interfaces. | Exposed active network drops (`PHY-T1004`), unprotected console/USB interfaces, rogue hardware drop implant placement. |
| **PHY-TAC-06 (TA06)** | **Egress & Cleanup** | Exiting the facility and concealing physical evidence of unauthorized presence. | Emergency egress hardware manipulation, badge departure logging evasion, evidence tampering. |

---

## 4. Base Assessment Coverage Matrix (v0.1.0 MVP)

Below is the foundational technique mapping for the core baseline techniques vetted in APCAF Base v0.1.0:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                APCAF BASE ASSESSMENT COVERAGE                                    │
├──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────────┤
│ PHY-TAC-03 (TA03):   │ PHY-TAC-02 (TA02):   │ PHY-TAC-04 (TA04):   │ PHY-TAC-05 (TA05):          │
│ Credential Bypass    │ Perimeter & Ingress  │ Interior Traversal   │ Physical-to-Cyber Execution │
├──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────────┤
│ PHY-T1001            │ PHY-T1002            │ PHY-T1003            │ PHY-T1004                   │
│ Credential Technology│ Door & Latch         │ REX Sensor Placement │ Exposed Physical Network    │
│ Assessment           │ Protection           │ Assessment           │ Interface Assessment        │
│                      │                      │                      │                             │
│ ├─ .001 LF 125kHz    │ ├─ .001 Frame Gap    │ ├─ .001 Lens View    │ ├─ .001 Active PHY Link     │
│ └─ .002 MIFARE CSN   │ └─ .002 Astragal Gap │ └─ .002 Deflector    │ └─ .002 Common Area Drop    │
└──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────────┘
```

### Detailed Technique Specifications

#### Technique: `PHY-T1001` - Credential Technology Assessment
* **Tactic:** `PHY-TAC-02: Credential & Identity Protection`
* **Target Object:** `BADGE`
* **Technique Hypothesis:** Static, unauthenticated credential identifiers may permit credential replay or cloning where the access-control architecture does not provide cryptographic mutual authentication.
* **Assessment Condition:** Does this credential rely on an exposed static identifier as an authentication factor, without cryptographic mutual authentication?
* **Sub-Techniques:**
  * `PHY-T1001.001`: Low-Frequency (125 kHz) ASK/FSK Proximity broadcast (HID Prox, EM4100, Indala).
  * `PHY-T1001.002`: High-Frequency (13.56 MHz) ISO 14443-A CSN-only read without mutual authentication (MIFARE Classic 1K/4K with static keys).
* **Non-Invasive Inspection Procedure (5s):** Interrogate credential using a pocket dual-frequency reader. Identify observable credential technology and determine whether the credential exposes a static identifier. Reader-side cryptographic enforcement requires configuration evidence or authorized administrative verification. If the credential relies on an unencrypted static identifier, classify as **Deficient**.
* **Mitigation (`PHY-M1001`):** Mandate ISO/IEC 14443-4 or ISO/IEC 7816 credentials with AES-128/256 mutual authentication (MIFARE DESFire EV2/EV3, HID Seos, PIV smartcards) and activate Secure Access Module (SAM) keys on readers.
* **Technical References:** ISO/IEC 14443-4, NIST SP 800-116 Rev 1.
* **Framework Mappings:** ISO 27001:2022 `A.7.2`, PCI DSS v4 `Req 9.2.1`.

---

#### Technique: `PHY-T1002` - Door & Latch Protection Assessment
* **Tactic:** `PHY-TAC-03: Portal & Architectural Barrier Protection`
* **Target Object:** `DOOR`
* **Technique Hypothesis:** Door and frame geometry may permit mechanical manipulation of the latch bolt assembly where protective physical shielding is absent and strike clearances exceed engineering tolerances.
* **Assessment Condition:** Does the door-to-frame operating clearance exceed 3.2mm (1/8 in.) with direct line-of-sight to the latch bolt and zero overlapping protective steel astragal guard, where applicable standards or specifications mandate tight margins or shielding?
* **Sub-Techniques:**
  * `PHY-T1002.001`: Perimeter strike gap exceeding 3.2mm on outward-opening doors.
  * `PHY-T1002.002`: Absence or incomplete coverage of protective astragal guard.
* **Non-Invasive Inspection Procedure (15s):** Visual inspection and feeler gap gauge measurement. Where the assessed opening is within the applicable **NFPA 80** or **ANSI/SDI A250.8 / SDI-122** scope, compare measured clearance against the applicable edition and assembly requirements. If the opening exceeds applicable tolerances and lacks an overlapping continuous stainless steel astragal plate, classify as **Deficient**.
* **Technical References:** NFPA 80 §6.3.1.7.1, ANSI/SDI A250.8, SDI-122.
* **Mitigation (`PHY-M1002`):** Install full-height, continuous heavy-gauge stainless steel interlocking astragal latch guards and deadlocking latch bolts.
* **Framework Mappings:** ISO 27001:2022 `A.7.1`, PCI DSS v4 `Req 9.1.1`.

---

#### Technique: `PHY-T1003` - REX Sensor Placement Assessment
* **Tactic:** `PHY-TAC-03: Portal & Architectural Barrier Protection`
* **Target Object:** `SENSOR`
* **Technique Hypothesis:** Interior Request-to-Exit (REX) motion detectors whose detection cones extend to perimeter door margins may be susceptible to non-contact activation through door seams if directional shielding is absent.
* **Assessment Condition:** Is the interior Request-to-Exit passive infrared (PIR) sensor optical field or lens visible from the exterior through transom, jamb, or threshold margins without a directional deflector hood?
* **Sub-Techniques:**
  * `PHY-T1003.001`: Unshielded optical line-of-sight to sensor lens through transom gap.
  * `PHY-T1003.002`: Absence of directional deflector hood on ceiling/wall-mounted REX detector.
* **Non-Invasive Inspection Procedure (15s):** Inspect optical line-of-sight through top and side door gaps. If REX PIR sensor lens is visible from the exterior without a directional deflector shroud, classify as **Condition Requires Validation** (or **Deficient** where installation specifications explicitly mandate directional shielding).
* **Technical References:** NFPA 101 §7.2.1.6.2, UL 294 Section 4.2.
* **Mitigation (`PHY-M1003`):** Install UL-listed directional REX PIR beam deflector hoods and perimeter brush/gasket seals.
* **Framework Mappings:** ISO 27001:2022 `A.7.1`, SOC 2 `CC6.4`.

---

#### Technique: `PHY-T1004` - Exposed Physical Network Interface Assessment
* **Tactic:** `PHY-TAC-05: Physical Interface & Hardware Layer Protection`
* **Target Object:** `PORT`
* **Technique Hypothesis:** Accessible physical network jacks in public or unmonitored areas broadcasting active Layer 1 carrier signaling present an exposed attack surface if not administratively isolated or protected by 802.1X quarantine.
* **Assessment Condition:** Does a publicly accessible RJ-45 Ethernet wall drop in an unmonitored area broadcast an active physical Layer 1 carrier signal upon non-intrusive connection?
* **Sub-Techniques:**
  * `PHY-T1004.001`: Active Layer 1 link carrier on unmonitored wall drop.
  * `PHY-T1004.002`: Unassigned port in visitor/common zone without administrative shutdown.
* **Non-Invasive Inspection Procedure (10s):** Insert a passive zero-packet LED link-state tester. If the Layer 1 PHY carrier LED illuminates on an unmonitored common area drop, classify as **Condition Requires Validation** *(establishing physical Layer 1 carrier availability; administrative port shutdown and 802.1X access controls require administrative verification)* or **Deficient** *(where absence of access controls is confirmed)*.
* **Technical References:** IEEE 802.1X-2020, NIST SP 800-53 Rev 5 PE-3.
* **Mitigation (`PHY-M1004`):** Administratively disable unassigned switch ports (`shutdown`), physically patch down public drops to isolated guest VLANs, and enforce IEEE 802.1X port security.
* **Framework Mappings:** ISO 27001:2022 `A.8.20`, PCI DSS v4 `Req 9.1.2`.

---

## 5. Methodological Distinction: Observable Condition vs. Exploitability

A fundamental tenet of APCAF is maintaining a strict boundary between **non-invasive assessment** and **active exploitation**:

| Assessment Layer | What APCAF Measures | What APCAF Does NOT Do |
| :--- | :--- | :--- |
| **Passive QA Specification** | Verifies whether installed hardware exhibits **observable conditions associated with known bypass mechanisms** (e.g. frame margin $> 3.2\text{mm}$, plaintext UID transmission, active Layer 1 carrier). | Does **not** insert destructive bypass tools, pick lock cylinders, force latch mechanisms, or inject network packets into client subnets. |
| **Finding Interpretation** | Classifies whether a physical barrier satisfies the defined engineering and installation specification. | Does **not** claim a facility has suffered a demonstrated physical breach. |
