# APCAF Taxonomy Specification: An ATT&CK-Inspired Behavioral Model

**Standard:** Adversarial Physical Control Assessment Framework (APCAF)  
**Reference Model:** Behavioral taxonomy principles inspired by MITRE ATT&CK®, applied to Physical & Hardware-Layer Security  
**Status:** Architectural Specification & Standard Definition  

---

## 1. Why Physical Security Needs an ATT&CK Model

MITRE ATT&CK revolutionized cybersecurity by doing three foundational things:
1. **De-abstracted threat language:** Replaced vague terms (*"our network was breached"*) with discrete, observable technical behaviors (*"T1059.001: PowerShell execution"*).
2. **Decoupled attack behavior from vendor marketing:** Grounded defenses in objective mechanics rather than vendor claims.
3. **Bridged technical findings to enterprise compliance:** Mapped adversarial techniques directly to NIST SP 800-53, CIS Controls, and ISO 27001.

**The Failure in Physical Security:**  
Physical security is still in the pre-ATT&CK dark ages. Auditors check whether a door is locked or a badge reader is mounted, while adversaries bypass unshielded latches with $20 tools or clone unencrypted 125kHz RFID credentials in 5 seconds.

APCAF adapts the MITRE ATT&CK structure to physical security:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               APCAF PHYSICAL TAXONOMY HIERARCHY                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. TACTICS (PHY-TAC-XX)    --> The Adversary's Physical Objective (The "Why")           │
│ 2. TECHNIQUES (PHY-TXXXX)  --> The Hardware/Spatial Mechanism (The "How")              │
│ 3. PASSIVE QA SPEC (PQ-XX) --> Non-Invasive 45s Inspection Standard (Passive QA)       │
│ 4. MITIGATIONS (PHY-MXXXX) --> Hardened Engineering Remediation Spec (Vendor Warranty) │
│ 5. COMPLIANCE MAPPINGS     --> Cross-Walk to ISO 27001, PCI DSS v4, SOC 2, NDPA       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 5 Core APCAF Physical Tactics (The Physical Kill-Chain)

Every physical intrusion follows a distinct sequence of spatial and hardware barriers. APCAF defines 5 core Tactics:

| Tactic ID | Tactic Name | Objective |
| :--- | :--- | :--- |
| **PHY-TAC-01** | **Perimeter & Boundary Ingress** | Breaching the outermost physical property line, fences, vehicle gates, and loading bays. |
| **PHY-TAC-02** | **Credential & Identity Interception** | Harvesting, cloning, relaying, or forging access control tokens and electronic credentials. |
| **PHY-TAC-03** | **Portal & Architectural Ingress** | Defeating pedestrian doors, turnstiles, latch assemblies, and egress sensor mechanisms. |
| **PHY-TAC-04** | **Enclave & Asset Containment Breach**| Bypassing server racks, secure vaults, data center cages, and demarcation partitions. |
| **PHY-TAC-05** | **Physical Interface & Signal Tapping**| Gaining unauthenticated electrical/data access via wall drops, PoE lines, or consoles. |

---

## 3. Techniques, Sub-Techniques & Mitigations Matrix

Below is the foundational technique mapping, featuring our 3 core MVP field controls:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  APCAF TECHNIQUE MATRIX (CORE)                                   │
├──────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────────┤
│ PHY-TAC-02:          │ PHY-TAC-03:          │ PHY-TAC-03:          │ PHY-TAC-05:                 │
│ Credential Intercept │ Portal Ingress       │ Portal Ingress       │ Interface & Tapping         │
├──────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────────┤
│ PHY-T1001            │ PHY-T1002            │ PHY-T1003            │ PHY-T1004                   │
│ Unencrypted RFID     │ Mechanical Latch     │ REX Sensor Blind     │ Unauthenticated L1/L2       │
│ Harvesting           │ Manipulation         │ Activation           │ Physical Drop               │
│                      │                      │                      │                             │
│ ├─ .001 LF 125kHz    │ ├─ .001 Latch Slip   │ ├─ .001 Aerosol /    │ ├─ .001 Active PHY Link     │
│ └─ .002 MIFARE CSN   │ ├─ .002 Under-Door   │    Thermal Inversion │ └─ .002 Missing 802.1X      │
│                      │ └─ .003 Transom Gap  │ └─ .002 Line-of-Sight│                             │
└──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────────┘
```

### Detailed Technique Specifications

#### Technique: `PHY-T1001` - Unencrypted RFID Harvesting
* **Tactic:** `PHY-TAC-02: Credential & Identity Interception`
* **MVP Control Mapping:** `APCAF-01`
* **Mechanics:** The access control credential transmits an unencrypted identifier (UID, CSN, or Facility Code) over radio frequency, which can be sniffed or read by low-cost equipment without cryptographic mutual authentication.
* **Sub-Techniques:**
  * `PHY-T1001.001`: Low-Frequency (125 kHz) ASK/FSK Proximity broadcast (HID Prox, EM4100, Indala).
  * `PHY-T1001.002`: High-Frequency (13.56 MHz) ISO 14443-A CSN-only read (MIFARE Classic 1K/4K with static keys).
* **Passive QA Standard (5s):** Interrogate card using a pocket dual-frequency reader. If credential returns an unencrypted UID/Facility Code, classify as **Legacy / Soft**.
* **Mitigation (`PHY-M1001`):** Mandate ISO/IEC 14443-4 or ISO/IEC 7816 credentials with AES-128/256 mutual authentication (MIFARE DESFire EV2/EV3, HID Seos, PIV/CAC PKI smartcards).
* **Compliance Mapping:** ISO 27001:2022 `A.7.2`, PCI DSS v4 `Req 9.2.1`, SOC 2 `CC6.4`.

---

#### Technique: `PHY-T1002` - Mechanical Latch Manipulation
* **Tactic:** `PHY-TAC-03: Portal & Architectural Ingress`
* **MVP Control Mapping:** `APCAF-02 (A)`
* **Mechanics:** An adversary retracts an exposed latch bolt through a door jamb gap using a physical tool (slip knife, shove knife, or under-door lever tool) due to the absence of physical latch shielding.
* **Sub-Techniques:**
  * `PHY-T1002.001`: Latch bolt slipping on outward-opening doors via unguarded frame gap.
  * `PHY-T1002.002`: Under-door tool (UDT) reach targeting interior lever handle.
* **Passive QA Standard (15s):** Visual alignment and feeler gap gauge measurement. Under **NFPA 80 (2022) §6.3.1.7.1** and **ANSI/SDI A250.8 / SDI-122**, the maximum allowable perimeter operating clearance between door and frame is **1/8 in. (3.18 mm / 3.2 mm)** for hollow metal doors. If door gap exceeds 3.2mm and lacks an overlapping continuous stainless steel astragal plate, classify as **Legacy / Soft**.
* **Citations & Standards:** NFPA 80 §6.3.1.7.1, ANSI/SDI A250.8, SDI-122, IBC Chapter 7/10.
* **Mitigation (`PHY-M1002`):** Install full-height, continuous heavy-gauge stainless steel interlocking astragal latch guards and deadlocking latch bolts under contractor warranty.
* **Compliance Mapping:** ISO 27001:2022 `A.7.4`, PCI DSS v4 `Req 9.1.1`, NDPA `Part V`.

---

#### Technique: `PHY-T1003` - Request-to-Exit (REX) Sensor Blind Activation
* **Tactic:** `PHY-TAC-03: Portal & Architectural Ingress`
* **MVP Control Mapping:** `APCAF-02 (B)`
* **Mechanics:** An adversary activates an unshielded interior passive infrared (PIR) or microwave Request-to-Exit motion sensor from outside the secure portal by injecting heated air, inverted canned compressed air, or inserting a probe through a frame gap.
* **Sub-Techniques:**
  * `PHY-T1003.001`: Aerosol/compressed gas thermal gradient injection through frame/transom gap.
  * `PHY-T1003.002`: Direct optical line-of-sight trip through gap using reaching tools.
* **Passive QA Standard (15s):** Check line-of-sight through top/side door gaps. If REX PIR sensor lens is visible without a directional deflector shroud, classify as **Legacy / Soft**.
* **Mitigation (`PHY-M1003`):** Install UL-listed directional REX PIR beam deflector collars/hoods and weather-stripping perimeter brush seals.
* **Compliance Mapping:** ISO 27001:2022 `A.7.4`, SOC 2 `CC6.4`.

---

#### Technique: `PHY-T1004` - Unauthenticated Physical Layer 1/2 Network Tap
* **Tactic:** `PHY-TAC-05: Physical Interface & Signal Tapping`
* **MVP Control Mapping:** `APCAF-03`
* **Mechanics:** An adversary connects a rogue physical device into an unmonitored RJ-45 wall drop or PoE line in a public/semi-public zone, immediately receiving a Layer 1/2 physical link state and Layer 3 IP connectivity without authentication.
* **Sub-Techniques:**
  * `PHY-T1004.001`: Active Ethernet PHY link pulse on unmonitored wall drop.
  * `PHY-T1004.002`: Missing IEEE 802.1X Port-Based Network Access Control (NAC).
* **Passive QA Standard (10s):** Insert passive zero-packet LED link-state tester. If link LED illuminates on an unmonitored drop, classify as **Legacy / Soft**.
* **Mitigation (`PHY-M1004`):** Administratively disable unused switch ports (`shutdown`), physically patch down public drops to isolated VLANs, and enforce IEEE 802.1X with MACsec.
* **Compliance Mapping:** ISO 27001:2022 `A.7.4` / `A.8.20`, PCI DSS v4 `Req 9.1.2`, NIST SP 800-53 `PE-3`.

---

---

## 4. Methodological Distinction: Observable Susceptibility vs. Exploitability

A fundamental tenet of APCAF is maintaining a strict, legally sound boundary between **non-invasive passive assessment** and **destructive exploitation**:

| Assessment Layer | What APCAF Measures | What APCAF Does NOT Do |
| :--- | :--- | :--- |
| **Passive QA Specification** | Verifies whether the installed hardware presents **observable conditions associated with known bypasses** (e.g. frame margin $> 3.2\text{mm}$, plaintext UID transmission, live carrier signaling). | Does **not** insert destructive tools, pick cylinder pins, force latch mechanisms, or inject rogue network packets into client subnets. |
| **Finding Interpretation** | Classifies whether a physical barrier satisfies the contractor's hardened installation specification. | Does **not** claim a facility has suffered a demonstrated physical breach. |

---

## 5. Architectural Roadmap: From 3-Control MVP to Multi-Variable Scoring

```
PHASE 1 (MVP SHIP MONTH)           PHASE 2 (POST-10 FIELD CASES)      PHASE 3 (INDUSTRY STANDARD)
┌───────────────────────────────┐  ┌───────────────────────────────┐  ┌───────────────────────────────┐
│ The 3-Control Core MVP        │  │ Empirical Data Integration    │  │ Full Open Behavioral Matrix   │
│ • PHY-T1001 (RFID Harvest)    │  │ • 10+ Validated Field Cases   │  │ • Complete PHY-TAC-01 to 05   │
│ • PHY-T1002/1003 (Portal/REX) │─>│ • Non-Binary Resistance Scale │─>│ • STIX 2.1 / TAXII Export     │
│ • PHY-T1004 (Port Tap)        │  │ • Multi-Factor Confidence     │  │ • Automated CISO Punch List   │
│ • Canonical YAML / Schema     │  │ • Community Case Pipeline     │  │ • Full Vendor Defect Archive  │
└───────────────────────────────┘  └───────────────────────────────┘  └───────────────────────────────┘
```

### Multi-Variable Evaluation Model (Phase 2 Progression)
While the MVP utilizes a fast-path binary classification (**Hardened** vs. **Legacy/Soft**) to enable rapid 45-second site walks, APCAF is engineered to evolve toward a multi-variable scoring model:

$$\text{Evaluation} = \text{Applicability} \rightarrow \text{Observed Condition} \rightarrow \text{Resistance Level} \rightarrow \text{Confidence} \rightarrow \text{Remediation Priority}$$

* **Hardened:** Control actively resists known attack mechanics with cryptographic or physical barriers (e.g. AES-128 crypto, continuous overlapping steel astragal).
* **Partially Hardened:** Primary defense is in place but lacks secondary depth (e.g. astragal installed, but door closer speed allows latch hang-up).
* **Susceptible / Defect:** Observable physical condition permits straightforward bypass with zero resistance.

### Architectural Guardrails
1. **Never stall field execution for taxonomy expansion:** All taxonomy IDs (`PHY-TXXXX`) map directly to executable field checks.
2. **Every technique must define a Passive QA Spec:** A technique cannot exist in APCAF unless it can be evaluated objectively without destructive testing or liability.
3. **Every technique must produce Vendor Warranty Leverage:** It must give the CISO contractual leverage to enforce fixes under existing warranty budgets.
