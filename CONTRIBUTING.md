# Contributing to APCAF

Thank you for contributing to the **Adversarial Physical Control Assessment Framework (APCAF)**. 

APCAF is an open-source, vendor-neutral standard for physical and hardware-layer security testing. We welcome contributions from red team operators, building engineers, physical penetration testers, CISOs, and hardware integrity researchers.

---

## Contribution Criteria

Every proposed physical technique in APCAF must adhere to the **Three Core Tenets**:

1. **Deterministic 45-Second Budget:** The assessment step must be executable in 45 seconds or less during a standard site walk.
2. **Zero Life-Safety Interference:** Tests must NEVER manipulate, compromise, or bypass life-safety systems (e.g. fire alarm trip relays, panic breakout hardware, emergency stairwell releases).
3. **Contractual Warranty Linkage:** Every technique must define a concrete **Contractor Warranty Mitigation Specification (`PHY-Mxxxx`)** that a facility owner or CISO can cite against a vendor's installation scope of work.

---

## Technique YAML Schema

All technique definitions submitted to the repository must follow this structure:

```yaml
attack_technique: PHY-T100X
display_name: "Technique Name"
tactic: "PHY-TAC-0X"
severity: "critical" # critical | high | medium | low
inspection_time: "XXs"
tool_required: "Tool Name (e.g., Feeler gauge, Pocket RFID reader)"

atomic_tests:
  - name: "Test Step Name"
    auto_generated_guid: "apcaf-t100x-test-01"
    description: "Clear technical description of the passive inspection."
    supported_platforms: ["physical"]
    citations:
      - standard: "NFPA 80 (2022) §6.3.1.7.1"
      - standard: "ANSI/SDI A250.8"
    input_arguments:
      param_name:
        description: "Parameter description"
        default: 3.2
    executor:
      name: "tool_name"
      command: "inspection_command_or_protocol"
    pass_criteria: "What constitutes a hardened installation."
    fail_criteria: "What constitutes an unmitigated installation defect."

mitigation:
  id: "PHY-M100X"
  title: "Contractor Warranty Mitigation Specification"
  contractor_mandate: "Exact contractual language for warranty remediation."
  compliance_mappings:
    - standard: "ISO 27001:2022"
      clause: "A.7.X"
    - standard: "PCI DSS v4.0"
      clause: "Requirement 9.X.X"
```

---

## Submission Process

1. **Fork the Repository:** `git clone https://github.com/zoecyber001/APCAF.git`
2. **Create a Branch:** `git checkout -b technique/phy-t100x-name`
3. **Add Your Definition:** Add the technique YAML file under `techniques/` and update `docs/TAXONOMY.md`.
4. **Cite Industry Building/Fire/Hardware Codes:** Provide authoritative citations (e.g. NFPA 80/101, UL 437/294, ANSI/BHMA, SDI, NIST SP 800-116).
5. **Submit a Pull Request:** Open a PR against `main` for review by the APCAF Working Group.

---

## Maintainership & Governance

* **Core Maintainer:** Zoe Cyber & APCAF Working Group Contributors
* **Contact & Inquiries:** [GitHub Issues & Discussions](https://github.com/zoecyber001/APCAF/issues)
* **License:** All documentation and taxonomy text is contributed under **CC BY 4.0**; tooling code is contributed under **MIT**.
