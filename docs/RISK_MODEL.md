# APCAF Risk Context & Treatment Specification

**Standard:** Adversarial Physical Control Assessment Framework (APCAF)  
**Document:** APCAF Risk Context, Scoring & Treatment Specification  
**Status:** Open Specification (Draft v0.1.0)  
**Schema Mapping:** `schemas/risk_context.schema.json` • `schemas/case.schema.json`  

---

## 1. Architectural Motivation: Decoupling Threat from Context

A foundational flaw in traditional physical security auditing is the assumption that a hardware non-conformance constitutes identical risk regardless of operational setting. 

In APCAF, the assessment framework is strictly decoupled into four autonomous layers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               APCAF FOUR-LAYER HIERARCHY                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. APCAF KNOWLEDGE BASE  ──> What can an adversary attempt?                            │
│                              (Catalogues threat vectors across Tactics TA01–TA06)       │
│                                                                                        │
│ 2. APCAF ASSESSMENT      ──> Is a specific physical control susceptible?               │
│                              (Observation ──> Evidence ──> Technical Disposition)      │
│                                                                                        │
│ 3. APCAF RISK CONTEXT    ──> How much does that susceptibility matter to the asset?    │
│                              (Asset Criticality × Physical Exposure × Consequence)     │
│                                                                                        │
│ 4. RISK TREATMENT        ──> What defensible action should the organization take?      │
│                              (Remediate │ Compensate │ Accept │ Avoid)                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> **The Core Separation Rule:**  
> A technique definition (`PHY-T1002`) defines the technical bypass mechanism and observation criteria. It **never** contains a risk decision. Risk decisions belong exclusively to the **Case Assessment Record**, evaluated against the specific asset environment and organizational risk appetite.

---

## 2. The 3-Axis Physical Risk Context Model

APCAF evaluates risk context along three orthogonal, non-invasive physical axes:

```
                      Physical Exposure (PE-1 .. PE-4)
                                   ▲
                                   │
                                   │       ┌──────────────────────┐
                                   │       │   CALCULATED RISK    │
                                   │       │     DETERMINISTIC    │
                                   │       └──────────────────────┘
                                   │
                                   └────────────────────────► Asset Criticality (AC-1 .. AC-4)
                                  ╱
                                 ╱
                                ╱
                               ▼
                    Consequence (C-1 .. C-4)
```

---

### Axis 1: Asset Criticality (`AC`)

Asset Criticality measures the intrinsic organizational, operational, or legal value of the physical assets, operations, or data contained within the boundary protected by the control.

| Level | Code | Classification | Description & Environmental Benchmarks |
| :--- | :--- | :--- | :--- |
| **1** | `AC-1` | **Low** | General office suites, non-sensitive storage, break rooms, common janitorial closets. Physical breach results in minimal asset loss. |
| **2** | `AC-2` | **Moderate** | Staff-only operational zones, routine administrative offices, local IT staging, facilities maintenance closets. |
| **3** | `AC-3` | **High** | Sensitive business operations, human resources record repositories, executive suites, staging rooms with unprovisioned hardware. |
| **4** | `AC-4` | **Critical** | Core production infrastructure, datacenter server suites, payment card enclaves (PCI-DSS CDE), cash processing vaults, industrial SCADA/ICS control centers. |

---

### Axis 2: Physical Exposure (`PE`)

Physical Exposure measures the physical accessibility and perimeter shielding surrounding the control before an adversary can approach it.

| Level | Code | Classification | Description & Spatial Access Benchmarks |
| :--- | :--- | :--- | :--- |
| **1** | `PE-1` | **Controlled** | Deep interior enclave behind multiple concentric access-controlled barriers with 24/7 operational monitoring and verified badge logging. |
| **2** | `PE-2` | **Restricted** | Secondary interior zone behind at least one verified primary perimeter barrier (e.g., card-accessed office floor). |
| **3** | `PE-3` | **Accessible** | Semi-public or shared multi-tenant areas (shared building lobbies, elevator vestibules, shared multi-tenant loading corridors). |
| **4** | `PE-4` | **Publicly Exposed** | Exterior property line, public street-facing entrances, exterior unmonitored perimeter fence lines, public drop-off zones. |

---

### Axis 3: Consequence (`C`)

Consequence measures the direct operational, financial, physical safety, or regulatory impact if the physical control is successfully bypassed by an adversary.

| Level | Code | Classification | Description & Impact Benchmarks |
| :--- | :--- | :--- | :--- |
| **1** | `C-1` | **Negligible** | Zero operational interruption; zero loss of sensitive data; zero life-safety or regulatory exposure. |
| **2** | `C-2` | **Operational** | Localized operational delay or minor disruption; non-confidential physical property damage under standard deductible limits. |
| **3** | `C-3` | **Security / Financial** | Unauthorized lateral movement into restricted operational zones; potential confidential data exposure; significant financial loss or regulatory reporting obligation. |
| **4** | `C-4` | **Critical / Catastrophic** | Direct physical compromise of core critical infrastructure, massive financial/regulatory liability (PCI, HIPAA, SOC 2 non-compliance), or severe life-safety threat. |

---

## 3. Deterministic Risk Calculation Engine

To prevent subjective or divergent risk calculations across different assessors and software implementations, APCAF mandates a **strictly deterministic scoring algorithm**.

### The Mathematical Formula

$$\text{Risk Score} = \text{Asset Criticality (AC)} \times \text{Physical Exposure (PE)} \times \text{Consequence (C)}$$

Where:
* $\text{AC} \in \{1, 2, 3, 4\}$
* $\text{PE} \in \{1, 2, 3, 4\}$
* $\text{C} \in \{1, 2, 3, 4\}$

The resulting $\text{Risk Score}$ is an integer in the discrete domain $[1, 64]$.

### Deterministic Risk Level Thresholds

| Score Range | Risk Level | Description | Action Mandate |
| :--- | :--- | :--- | :--- |
| **1 – 8** | `LOW` | Minor exposure with localized, negligible consequence. | Eligible for routine risk acceptance under standard operational tolerance. |
| **9 – 23** | `MEDIUM` | Moderate exposure with potential operational impact. | Requires formal review; eligible for compensating controls or scheduled maintenance remediation. |
| **24 – 47** | `HIGH` | Significant exposure protecting sensitive or critical assets. | Requires prioritized remediation or rigorous, validated compensating controls. |
| **48 – 64** | `CRITICAL` | Severe exposure directly threatening core critical infrastructure or life-safety. | Requires immediate emergency escalation, physical security hold, and executive risk sign-off. |

---

## 4. Organizational Risk Appetite & Evaluation

Risk appetite is configured by the client organization and represents the maximum level of residual physical risk the organization is willing to tolerate for a given asset tier.

### Risk Appetite Levels

* `LOW`: Organization tolerates only `LOW` residual risk ($1 \le \text{Score} \le 8$). Any finding scoring `MEDIUM`, `HIGH`, or `CRITICAL` exceeds risk appetite.
* `MEDIUM`: Organization tolerates `LOW` and `MEDIUM` residual risk ($1 \le \text{Score} \le 23$). Findings scoring `HIGH` or `CRITICAL` exceed risk appetite.
* `HIGH`: Organization tolerates `LOW`, `MEDIUM`, and `HIGH` residual risk ($1 \le \text{Score} \le 47$). Only `CRITICAL` findings exceed risk appetite.
* `CRITICAL`: Reserved for specialized testing or sacrificial installations; tolerates all scores.

### The Evaluation Boolean

$$\text{exceeds\_appetite} = (\text{Calculated Risk Level} > \text{Configured Risk Appetite})$$

If `exceeds_appetite` is `true`, the finding cannot be closed as acceptable without formal executive risk-waiver escalation.

---

## 5. The Risk Treatment Taxonomy

When an assessment establishes a `Deficient` or `Condition_Requires_Validation` disposition, the organization selects a formalized treatment decision:

```
                             TREATMENT DECISION
                                     │
         ┌───────────────────────────┼───────────────────────────┬───────────────────────────┐
         ▼                           ▼                           ▼                           ▼
   [ REMEDIATE ]              [ COMPENSATE ]                 [ ACCEPT ]                  [ AVOID ]
   Direct physical            Validated secondary           Formal risk owner           Decommission,
   hardware correction        defensive control             sign-off within             isolate, or remove
   (e.g., astragal plate)     (e.g., optical beam)          documented appetite         the exposed asset
```

### 1. Remediate
* **Definition:** Directly correct, replace, or reconfigure the physical hardware to satisfy the baseline APCAF mitigation specification (`PHY-MXXXX`).
* **Expected Residual Risk:** `LOW`
* **Applicability:** Primary recommendation whenever physical modification is feasible and cost-effective.

### 2. Compensate
* **Definition:** Introduce a secondary physical or technical control that directly impedes the attack vector when primary physical remediation is architecturally constrained or cost-prohibitive.
* **Compensating Control Validation Mandate:**  
  Adding CCTV or general lighting does **not** automatically compensate for a mechanical latch-slip weakness. The compensating control must provide a direct, verifiable defensive capability (e.g. real-time forced-entry alarm integration or active optical sensor interlocking).

### 3. Accept
* **Definition:** The designated business risk owner explicitly accepts the residual risk without deploying physical remediation or compensating controls.
* **Mandatory Governance Requirements:**
  * Must specify the authorized Risk Owner (Name, Title, Role).
  * Must document technical rationale explaining why remediation was deferred.
  * Must set a mandatory Review / Expiration Date (maximum 365 days).
  * Must confirm that the calculated risk does not exceed the configured organizational risk appetite.

### 4. Avoid / Remove
* **Definition:** Eliminate the threat surface entirely by decommissioning the exposed port, relocating the sensitive asset to a higher-security zone, or removing the physical opening.

---

## 6. Three Canonical Ground-Truth Test Cases

To demonstrate the deterministic, defensible nature of the APCAF Risk Model, three standard reference scenarios are specified:

---

### Scenario A: Janitorial Mop Closet Door Weakness
* **Observation:** Outward door operating clearance measured at $5.2\text{mm}$ (exceeds $3.2\text{mm}$ tolerance); latch bolt visible; zero astragal guard.
* **Technique:** `PHY-T1002` (Door & Latch Protection Assessment)
* **Technical Disposition:** `Deficient`
* **Risk Context:**
  * **Asset Criticality:** `AC-1` (Low — contains routine cleaning supplies)
  * **Physical Exposure:** `PE-3` (Accessible — located in shared office floor corridor)
  * **Consequence:** `C-1` (Negligible — zero sensitive data or operational impact)
* **Deterministic Calculation:**
  $$\text{Score} = 1 \times 3 \times 1 = 3 \implies \mathbf{LOW}$$
* **Organizational Risk Appetite:** `MEDIUM`
* **Evaluation:** `exceeds_appetite: false`
* **Defensible Treatment:** **`ACCEPT`**  
  *Rationale:* Low asset value and negligible impact fall squarely within operational risk tolerance. Routine hardware replacement at end-of-life cycle.

---

### Scenario B: Human Resources Records Room Door
* **Observation:** Outward door operating clearance measured at $4.8\text{mm}$; unshielded latch bolt.
* **Technique:** `PHY-T1002` (Door & Latch Protection Assessment)
* **Technical Disposition:** `Deficient`
* **Risk Context:**
  * **Asset Criticality:** `AC-3` (High — physical employee records and confidential PII files)
  * **Physical Exposure:** `PE-2` (Restricted — interior staff-only corridor)
  * **Consequence:** `C-3` (Security / Financial — regulatory PII exposure breach)
* **Deterministic Calculation:**
  $$\text{Score} = 3 \times 2 \times 3 = 18 \implies \mathbf{MEDIUM}$$
* **Organizational Risk Appetite:** `LOW`
* **Evaluation:** `exceeds_appetite: true`
* **Defensible Treatment:** **`COMPENSATE`**  
  *Rationale:* Door frame cannot accommodate an external astragal plate due to historic architectural landmark restrictions. Deployed an interlocking balanced magnetic switch (BMS) tamper alarm with immediate localized acoustic alarm and real-time SOC dispatch.
  *Residual Risk:* `LOW` (validated compensating control).

---

### Scenario C: Primary Datacenter Server Suite Door
* **Observation:** Outward double door operating clearance measured at $5.2\text{mm}$; exposed deadlocking latch bolt; zero overlapping astragal guard.
* **Technique:** `PHY-T1002` (Door & Latch Protection Assessment)
* **Technical Disposition:** `Deficient`
* **Risk Context:**
  * **Asset Criticality:** `AC-4` (Critical — primary core datacenter, hosting client production servers and HSMs)
  * **Physical Exposure:** `PE-2` (Restricted — second-floor colocation corridor)
  * **Consequence:** `C-4` (Critical / Catastrophic — direct physical access to unencrypted storage and core hypervisors)
* **Deterministic Calculation:**
  $$\text{Score} = 4 \times 2 \times 4 = 32 \implies \mathbf{HIGH}$$
* **Organizational Risk Appetite:** `LOW`
* **Evaluation:** `exceeds_appetite: true`
* **Defensible Treatment:** **`REMEDIATE`**  
  *Rationale:* Immediate physical remediation mandatory. Install full-height continuous heavy-gauge stainless steel interlocking astragal plate. Issue Vendor Remediation Punch List under APCAF-WF-01 profile with warranty retainage hold.
  *Residual Risk:* `LOW` upon post-installation verification.

---

## 7. Summary Table: Deterministic Risk Scoring Reference Matrix

| AC | PE | C | Score | Calculated Risk Level | Standard Baseline Treatment |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 1 | 1 | **1** | `LOW` | Accept / Routine Maintenance |
| 1 | 2 | 1 | **2** | `LOW` | Accept / Routine Maintenance |
| 1 | 3 | 1 | **3** | `LOW` | Accept / Routine Maintenance |
| 1 | 4 | 1 | **4** | `LOW` | Accept / Scheduled Review |
| 2 | 2 | 2 | **8** | `LOW` | Accept / Scheduled Review |
| 2 | 3 | 2 | **12** | `MEDIUM` | Compensate / Remediate |
| 3 | 2 | 3 | **18** | `MEDIUM` | Compensate / Remediate |
| 3 | 3 | 3 | **27** | `HIGH` | Remediate / Validated Compensate |
| 4 | 2 | 4 | **32** | `HIGH` | Remediate (Prioritized) |
| 4 | 3 | 4 | **48** | `CRITICAL` | Emergency Remediate / Escalate |
| 4 | 4 | 4 | **64** | `CRITICAL` | Emergency Remediate / Physical Hold |
