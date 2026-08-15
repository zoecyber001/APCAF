# Executive Memo: Physical Security Installation - Notice of Non-Conformance & Warranty Punch List

**TO:** [General Contractor / Physical Security Systems Integrator]  
**FROM:** [Chief Information Security Officer / VP Corporate Security / Head of Facilities]  
**DATE:** [Date]  
**FACILITY:** [Facility Name / Building / Room ID]  
**CONTRACT REF:** [Master Installation Agreement / Purchase Order Number]  
**SUBJECT:** Post-Installation QA Inspection Findings - Invoice Hold & Warranty Rectification Request  

---

### 1. Executive Notice
In accordance with the physical security specification standards outlined in Contract Ref **[Contract Number]**, an independent Quality Assurance (QA) inspection of installed access control and perimeter hardening infrastructure was conducted on **[Date]**.

The inspection identified **[Number of Deficiencies]** critical hardware specification non-conformances. These items represent latent physical security vulnerabilities resulting from substandard installation and/or outdated component delivery.

> **ACTION REQUIRED:** Final sign-off and release of project retainage / final invoice payment (`$[Invoice Amount]`) are hereby **placed on hold** pending full vendor rectification of the punch list items below under standard contractual warranty provisions at zero additional cost to the Client.

---

### 2. Itemized Warranty Punch List

| Item | Control Vector | Subsystem Location | Observed Condition (Defective / Soft) | Required Contract Specification (Hardened) | Warranty Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **RF Credential Modernity** | Main Lobby & Server Room Access Readers | Legacy 125 kHz unencrypted low-frequency badges (HID Prox / EM4100) or MIFARE Classic CSN deployed. | Encrypted High-Frequency Smartcards (AES-128 / MIFARE DESFire EV3 / HID Seos / ISO 14443-4). | Replace deployed credential inventory with contracted encrypted smartcards; reprogram readers for encrypted SAM profile. |
| **02** | **Perimeter Latch & Sensor Hardening** | Server Room Doors [Door IDs: e.g., SR-101, SR-102] | Outward-opening door has exposed latch bolt (gap > 3.2mm) with no continuous astragal plate; Request-to-Exit (REX) PIR sensor unshielded. | Latch bolt completely guarded by continuous stainless steel astragal plate; REX PIR sensor fitted with directional detection hood/collar. | Supply and install full-length interlocking astragal latch guards; install UL-listed REX PIR directional hoods on all specified doors. |
| **03** | **Perimeter Port State** | Unsecured Common Areas (Reception, Boardrooms) | Wall-mounted RJ-45 drops show active Layer 1 link state with open physical access. | Wall drops in public/unmonitored zones must be physically isolated, patched to disabled switch ports, or enforce 802.1X NAC. | Disable unauthenticated drops at the patch panel/switch level or verify 802.1X port-based access control. |

---

### 3. Rectification Timeline & Verification
1. **Remediation Plan:** Vendor must submit a written rectification schedule within **five (5) business days** of receipt of this notice.
2. **Re-Inspection:** Upon completion of remedial work, a follow-up 45-second APCAF QA re-inspection will be scheduled at vendor expense.
3. **Payment Release:** Retainage funds will be immediately authorized for disbursement upon verified **Hardened** status across all items.

**Authorized Signature:**

____________________________________________  
**[Name]**, Chief Information Security Officer / Authorized Representative  
**[Organization Name]**
