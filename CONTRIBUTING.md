# Contributing to APCAF

Thank you for contributing to the **Adversarial Physical Control Assessment Framework (APCAF)**. 

APCAF is an open specification for standardized, non-invasive physical security control assessment. We welcome contributions from building engineers, physical security consultants, auditors, facility managers, and hardware security researchers.

---

## 1. Contribution Principles

Every technique proposed in APCAF must adhere to three foundational rules:

1. **Non-Invasive Procedure:** Assessments must rely exclusively on non-destructive, non-exploitative observations (e.g. feeler gauges, optical line-of-sight, passive RF frequency analysis, passive zero-packet LED carrier detection).
2. **Zero Life-Safety Interference:** Assessments must NEVER manipulate or compromise life-safety, fire alarm, or emergency egress hardware.
3. **Explicit Evidence & Remediation Boundary:** Every technique must specify:
   - What the non-invasive check can establish and what it cannot establish (Limitations).
   - Verifiable building/engineering code citations (e.g. NFPA 80/101, UL 294, ISO/IEC 14443).
   - Concrete mitigation and remediation guidance (`PHY-Mxxxx`).

---

## 2. Canonical Technique Structure

Each technique resides in its own dedicated directory under `techniques/PHY-TXXXX/`:

```
techniques/
├── PHY-T1001/
│   ├── technique.yaml
│   └── README.md
├── PHY-T1002/
│   ├── technique.yaml
│   └── README.md
...
```

### Technique YAML Schema (`schemas/technique.schema.json`)

All technique definitions must adhere strictly to `schemas/technique.schema.json`:

```yaml
id: "PHY-T100X"
name: "Technique Assessment Name"
status: "candidate" # base_coverage | candidate | deprecated
tactic_id: "PHY-TAC-0X"
tactic_name: "Tactic Name"
target_object: "DOOR" # DOOR | BADGE | PORT | SENSOR | ENCLAVE | PERIMETER
target_time_seconds: 15

hypothesis: "Clear description of the physical bypass hypothesis."

assessment_condition: "Normative test condition verifiable non-invasively."

assessment_procedure:
  method: "visual_and_feeler_gauge" # passive_rf_interrogation | visual_and_feeler_gauge | optical_line_of_sight | passive_led_link_test | visual_inspection
  tools_required:
    - "Feeler gap gauge"
  steps:
    - "Step 1 description"
    - "Step 2 description"

evidence_requirements:
  data_type: "measurement" # measurement | observation | device_read | photo
  acceptable_formats:
    - "Dimension in millimeters (mm)"
  validation_criteria: "Criterion compared against standard tolerance."

result_model:
  hardened_criteria: "Condition indicating hardened defense."
  deficient_criteria: "Condition indicating physical deficiency."
  condition_requires_validation_criteria: "Condition requiring controlled testing."

limitations:
  can_establish:
    - "What the non-invasive check establishes."
  cannot_establish:
    - "What the check cannot prove without active exploitation."

mitigation_id: "PHY-M100X"
mitigation_name: "Mitigation Title"
mitigation_action: "Concrete technical correction guidance."

technical_references:
  - standard: "NFPA 80"
    section: "§6.3.1.7.1"
    title: "Standard for Fire Doors and Other Opening Protectives"

framework_mappings:
  - framework: "ISO/IEC 27001:2022"
    control_id: "A.7.1"
    title: "Physical security perimeters"
```

---

## 3. Pull Request & Verification Workflow

1. **Fork & Branch:** Clone your fork and create a branch (`git checkout -b technique/phy-t100x-name`).
2. **Add Technique Definition:** Create `techniques/PHY-TXXXX/technique.yaml` and `techniques/PHY-TXXXX/README.md`.
3. **Compile and Validate:**
   ```bash
   # Validate technique against canonical schema
   python3 scripts/validate_schemas.py

   # Compile technique into data/techniques.json
   python3 scripts/build_data.py
   ```
4. **Submit PR:** Submit a Pull Request with technical rationale and reference citations for review by the APCAF Maintainers.

---

## 4. Licensing

All documentation, specifications, and taxonomy contributions are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**. Software and tooling code is licensed under **MIT**.
