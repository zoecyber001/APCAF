/**
 * APCAF Framework Core Application Controller
 * Pure SVG Icons, Zero Emojis, Institutional Standards Architecture
 */

// SVG Icon Helper Constants
const SVG_ICONS = {
  shield: `<svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  warning: `<svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  check: `<svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  clock: `<svg class="icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  sparkle: `<svg class="icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  close: `<svg class="icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
};

// --- 1. APCAF Canonical Technique Knowledge Base ---
const TECHNIQUES = [
  {
    id: "PHY-T1001",
    tacticId: "PHY-TAC-02",
    tacticName: "Credential & Identity Protection",
    title: "Credential Technology Assessment",
    isMVP: true,
    severity: "base_coverage",
    inspectionTime: "5 Seconds",
    tool: "Pocket Multi-Frequency RFID Reader",
    citations: ["ISO/IEC 14443-4", "NIST SP 800-116 Rev 1"],
    plainEnglish: "Interrogates credential carrier frequency to determine whether authentication relies on static unencrypted identifiers without cryptographic challenge-response validation.",
    mechanics: "Evaluates whether contactless tokens broadcast unencrypted static UIDs (125 kHz Prox / MIFARE CSN) without mutual AES-128 cryptographic authentication.",
    passiveQA: "Contactless read of badge credential. If card emits unencrypted 125 kHz carrier or static CSN without mutual authentication, classify as Deficient.",
    mitigationId: "PHY-M1001",
    mitigationTitle: "Cryptographic Smartcard Migration",
    mitigation: "Mandate ISO/IEC 14443-4 credentials with AES-128 mutual authentication (DESFire EV2/EV3, Seos, PIV smartcards) and activate SAM keys on readers.",
    compliance: ["ISO 27001 A.7.2", "PCI DSS Req 9.2.1"],
    limitations: {
      canEstablish: ["Operating carrier frequency and static UID broadcast exposure."],
      cannotEstablish: ["Cloning equipment availability or reader-side PIN/biometric policies."]
    }
  },
  {
    id: "PHY-T1002",
    tacticId: "PHY-TAC-03",
    tacticName: "Portal & Architectural Barrier Protection",
    title: "Door & Latch Protection Assessment",
    isMVP: true,
    severity: "base_coverage",
    inspectionTime: "15 Seconds",
    tool: "Metric Feeler Gauge / Visual Margin Check",
    citations: ["NFPA 80 (2022) §6.3.1.7.1", "ANSI/SDI A250.8 / SDI-122"],
    plainEnglish: "Measures door frame operating clearance against NFPA 80 tolerances (3.2mm) and checks for continuous steel astragal latch protection.",
    mechanics: "Evaluates outward-opening doors for exposed latch bolt access through perimeter frame clearances exceeding 3.2mm without protective astragal shielding.",
    passiveQA: "Measure frame strike gap with feeler gauge. If gap > 3.2mm and lacks continuous stainless steel astragal plate, classify as Deficient.",
    mitigationId: "PHY-M1002",
    mitigationTitle: "Continuous Security Astragal Installation",
    mitigation: "Install full-height continuous stainless steel astragal latch guards overlapping the frame stop on the exterior approach side.",
    compliance: ["ISO 27001 A.7.1", "PCI DSS Req 9.1.1"],
    limitations: {
      canEstablish: ["Perimeter strike clearance and protective guard coverage."],
      cannotEstablish: ["Lock cylinder pin resistance or interior deadbolt status."]
    }
  },
  {
    id: "PHY-T1003",
    tacticId: "PHY-TAC-03",
    tacticName: "Portal & Architectural Barrier Protection",
    title: "REX Sensor Placement Assessment",
    isMVP: true,
    severity: "base_coverage",
    inspectionTime: "15 Seconds",
    tool: "Optical Line-of-Sight Check",
    citations: ["NFPA 101 §7.2.1.6.2", "UL 294 Standard"],
    plainEnglish: "Inspects perimeter transom and threshold margins for optical line-of-sight to the interior Request-to-Exit motion detector.",
    mechanics: "Evaluates whether interior REX PIR sensor optical field is visible through door perimeter gaps without a directional deflector hood.",
    passiveQA: "Inspect optical line-of-sight through door gaps. If REX PIR lens is visible from exterior without a directional deflector shroud, classify as Deficient.",
    mitigationId: "PHY-M1003",
    mitigationTitle: "Directional REX Deflector Shroud Installation",
    mitigation: "Install UL-listed directional deflector hoods limiting sensor field-of-view strictly to interior exit paths, paired with perimeter brush seals.",
    compliance: ["ISO 27001 A.7.1", "SOC 2 CC6.4"],
    limitations: {
      canEstablish: ["Direct line-of-sight to sensor lens and presence of deflector hoods."],
      cannotEstablish: ["Internal sensor sensitivity threshold or verified bypass tripping without active environmental testing."]
    }
  },
  {
    id: "PHY-T1004",
    tacticId: "PHY-TAC-05",
    tacticName: "Physical Interface & Hardware Layer Protection",
    title: "Exposed Physical Network Interface Assessment",
    isMVP: true,
    severity: "base_coverage",
    inspectionTime: "10 Seconds",
    tool: "Passive LED Link Tester",
    citations: ["IEEE 802.1X-2020", "NIST SP 800-53 PE-3"],
    plainEnglish: "Tests unmonitored common area network drops for active Layer 1 carrier signaling to verify port shutdown and isolation.",
    mechanics: "Evaluates whether exposed wall jacks in public or visitor zones maintain an active physical Layer 1 link state without administrative shutdown.",
    passiveQA: "Insert zero-packet passive LED tester into drop. If Layer 1 PHY carrier illuminates on unmonitored drop, classify as Deficient / Condition Requires Validation.",
    mitigationId: "PHY-M1004",
    mitigationTitle: "Administrative Port Quarantine & 802.1X Enforcement",
    mitigation: "Administratively shut down unused switch ports at the patch panel and enforce IEEE 802.1X port security.",
    compliance: ["ISO 27001 A.8.20", "PCI DSS Req 9.1.2"],
    limitations: {
      canEstablish: ["Physical Layer 1 carrier signaling and administrative port shutdown state."],
      cannotEstablish: ["IEEE 802.1X network access control enforcement, VLAN placement, or IP-layer reachability."]
    }
  }
];

// --- 2. Workbench State ---
const workbenchState = {
  c1: "Soft",
  c2: "Soft",
  c3: "Hardened",
  activeRepoTactic: "all",
  repoSearchQuery: ""
};

// --- 3. Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  renderRepoGrid();
  renderExecutiveNotice();

  const dateEl = document.getElementById("memoCurrentDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTechniqueModal();
      closeSowModal();
    }
  });
  
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target.id === "modalOverlay") closeTechniqueModal();
    });
  }
  const sowOverlay = document.getElementById("sowModalOverlay");
  if (sowOverlay) {
    sowOverlay.addEventListener("click", (e) => {
      if (e.target.id === "sowModalOverlay") closeSowModal();
    });
  }

  ["input-notes-c1", "input-notes-c2", "input-notes-c3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderExecutiveNotice);
  });
});

// --- 4. Rule Repository Engine ---
function handleRepoSearch(query) {
  workbenchState.repoSearchQuery = query.toLowerCase().trim();
  renderRepoGrid();
}

function filterRepoTactic(tacticId, btnElement) {
  document.querySelectorAll(".tactic-tab-btn").forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  workbenchState.activeRepoTactic = tacticId;
  renderRepoGrid();
}

function renderRepoGrid() {
  const container = document.getElementById("repoGridContainer");
  if (!container) return;

  const query = workbenchState.repoSearchQuery;
  const tactic = workbenchState.activeRepoTactic;

  const filtered = TECHNIQUES.filter(tech => {
    const matchesTactic = (tactic === "all" || tech.tacticId === tactic);
    const matchesQuery = !query || (
      tech.id.toLowerCase().includes(query) ||
      tech.title.toLowerCase().includes(query) ||
      tech.mechanics.toLowerCase().includes(query) ||
      tech.tool.toLowerCase().includes(query) ||
      tech.compliance.some(c => c.toLowerCase().includes(query))
    );
    return matchesTactic && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 36px; text-align: center; color: var(--text-dim); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-card);">
        No techniques found matching "<strong>${query}</strong>". Try searching for "RFID", "Latch", "PHY-T1001", or "ISO 27001".
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tech => `
    <div class="technique-card" onclick="openTechniqueModal('${tech.id}')">
      <div class="card-top-row">
        <span class="card-tech-id">${tech.id}</span>
        <div class="card-meta-tags">
          <span class="chip-tag" style="font-size: 0.65rem;">Base Coverage</span>
        </div>
      </div>
      <div class="card-title">${tech.title}</div>
      <div class="card-desc">${tech.mechanics}</div>
      <div class="card-footer-info">
        <span style="display: inline-flex; align-items: center; gap: 4px;">
          ${SVG_ICONS.clock} ${tech.inspectionTime}
        </span>
        <span style="color: var(--accent-sky); font-weight: 600;">View Specification →</span>
      </div>
    </div>
  `).join("");
}

function openTechniqueModal(techId) {
  const tech = TECHNIQUES.find(t => t.id === techId);
  if (!tech) return;

  const targetObject = tech.id === "PHY-T1001" ? "badge" : (tech.id === "PHY-T1002" ? "door" : (tech.id === "PHY-T1003" ? "sensor" : "port"));

  document.getElementById("modalTacticTag").textContent = `${tech.tacticId}: ${tech.tacticName}`;
  document.getElementById("modalTitle").textContent = `${tech.id} - ${tech.title}`;
  
  const plainEl = document.getElementById("modalPlainEnglish");
  if (plainEl) plainEl.textContent = tech.plainEnglish || tech.mechanics;

  document.getElementById("modalMechanics").textContent = tech.mechanics;
  
  const citeEl = document.getElementById("modalCitations");
  if (citeEl && tech.citations) {
    citeEl.innerHTML = `<strong>Standards / Citations:</strong> ${tech.citations.join(" • ")}`;
  } else if (citeEl) {
    citeEl.innerHTML = "";
  }

  document.getElementById("modalTime").textContent = tech.inspectionTime;
  document.getElementById("modalPassiveQA").textContent = tech.passiveQA;
  document.getElementById("modalTool").textContent = tech.tool;
  document.getElementById("modalMitigationId").textContent = tech.mitigationId;
  document.getElementById("modalMitigation").textContent = `${tech.mitigationTitle}: ${tech.mitigation}`;
  
  const compWrap = document.getElementById("modalCompliance");
  compWrap.innerHTML = tech.compliance.map(c => `<span class="chip-tag">${c}</span>`).join(" ");

  const testBtn = document.getElementById("modalTestInTriageBtn");
  if (testBtn) {
    testBtn.href = `tools/field-triage.html?object=${targetObject}`;
  }

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeTechniqueModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "auto";
}

// --- 5. SOW Consent Modal ---
function openSowModal() {
  const overlay = document.getElementById("sowModalOverlay") || document.getElementById("sowModal");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeSowModal() {
  const overlay = document.getElementById("sowModalOverlay") || document.getElementById("sowModal");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

function copySowClauseAndClose() {
  copyConsentClause();
  closeSowModal();
}

// --- 6. Workbench State & Findings Summary Renderer ---
function setWorkbenchState(controlKey, status) {
  workbenchState[controlKey] = status;

  const ctrlNum = controlKey.replace('c', '');
  const hardBtn = document.getElementById(`btn-toggle-${ctrlNum}-hard`);
  const softBtn = document.getElementById(`btn-toggle-${ctrlNum}-soft`);

  if (status === "Hardened") {
    hardBtn.className = "switch-toggle-btn active-hardened";
    softBtn.className = "switch-toggle-btn";
  } else {
    hardBtn.className = "switch-toggle-btn";
    softBtn.className = "switch-toggle-btn active-soft";
  }

  renderExecutiveNotice();
}

function renderExecutiveNotice() {
  const tableBody = document.getElementById("punchlistTableBody");
  const stamp = document.getElementById("noticeStatusStamp");
  const summaryText = document.getElementById("memoExecutiveSummaryText");
  if (!tableBody || !stamp) return;

  const softItems = [];
  const notes1 = document.getElementById("input-notes-c1")?.value || "";
  const notes2 = document.getElementById("input-notes-c2")?.value || "";
  const notes3 = document.getElementById("input-notes-c3")?.value || "";

  if (workbenchState.c1 === "Soft") {
    softItems.push({
      id: "PHY-T1001",
      observed: notes1 || "Unencrypted static UID broadcast observed",
      standard: "Encrypted High-Frequency Smartcards (AES-128 / DESFire EV3 / ISO 14443-4)",
      remediation: "Deploy compliant encrypted smartcards; configure cryptographic SAM profiles on readers."
    });
  }
  if (workbenchState.c2 === "Soft") {
    softItems.push({
      id: "PHY-T1002/T1003",
      observed: notes2 || "Door strike gap > 3.2mm without protective astragal",
      standard: "Continuous Steel Astragal Latch Guard (Gap <= 3.2mm) + Directional REX PIR Hood",
      remediation: "Install full-height interlocking steel astragals and UL-listed REX beam deflectors."
    });
  }
  if (workbenchState.c3 === "Soft") {
    softItems.push({
      id: "PHY-T1004",
      observed: notes3 || "Active Layer 1 PHY carrier signaling illuminated",
      standard: "Administrative Port Shutdown / IEEE 802.1X Network Access Control",
      remediation: "Administratively disable unassigned switch ports and verify 802.1X policy."
    });
  }

  if (softItems.length > 0) {
    stamp.className = "notice-badge-stamp hold";
    stamp.textContent = `Deficiencies Identified (${softItems.length} Finding(s))`;
    if (summaryText) {
      summaryText.textContent = "An independent APCAF Quality Assurance inspection identified physical security non-conformances requiring technical remediation.";
    }
    
    tableBody.innerHTML = softItems.map(item => `
      <tr>
        <td><strong style="color: var(--text-pure); font-family: var(--font-mono); font-size: 0.78rem;">${item.id}</strong></td>
        <td><span style="font-weight: 600; color: var(--text-pure);">${item.observed}</span></td>
        <td style="color: var(--text-body);">${item.standard}</td>
        <td><strong style="color: var(--text-pure);">${item.remediation}</strong></td>
      </tr>
    `).join("");
  } else {
    stamp.className = "notice-badge-stamp cleared";
    stamp.textContent = "All Evaluated Controls Hardened";
    if (summaryText) {
      summaryText.textContent = "An independent APCAF Quality Assurance inspection verified that all evaluated physical security controls satisfy hardened engineering specifications.";
    }
    
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-pure); padding: 24px; font-size: 0.88rem;">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            ${SVG_ICONS.check} All evaluated physical access controls verified as Hardened Spec. Zero physical deficiencies identified.
          </span>
        </td>
      </tr>
    `;
  }
}

// --- 7. Findings Summary Copy Logic ---
function copyExecutiveMemoText() {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const softItems = [workbenchState.c1, workbenchState.c2, workbenchState.c3].filter(s => s === "Soft");
  const notes1 = document.getElementById("input-notes-c1")?.value || "";
  const notes2 = document.getElementById("input-notes-c2")?.value || "";
  const notes3 = document.getElementById("input-notes-c3")?.value || "";

  let memo = "";

  if (softItems.length === 0) {
    memo = `APCAF ASSESSMENT RECORD: PHYSICAL SECURITY VERIFICATION SUMMARY
--------------------------------------------------------------------------------
FACILITY: [Target Facility / Room 101]
DATE:     ${dateStr}
RESULT:   ALL EVALUATED CONTROLS HARDENED (No Deficiencies Identified)
STANDARD: APCAF Base Draft v0.1.0
--------------------------------------------------------------------------------

All evaluated physical controls (RF Credentials, Portal Hardware, and Network Interfaces) satisfy hardened specification criteria.

Authorized by: Assessor / Physical Security Operations`;
  } else {
    memo = `APCAF ASSESSMENT FINDINGS & REMEDIATION PUNCH LIST
--------------------------------------------------------------------------------
FACILITY: [Target Facility / Room 101]
DATE:     ${dateStr}
RESULT:   DEFICIENCIES IDENTIFIED (${softItems.length} Finding(s))
STANDARD: APCAF Base Draft v0.1.0
--------------------------------------------------------------------------------

1. IDENTIFIED DEFICIENCIES
${workbenchState.c1 === 'Soft' ? `* [PHY-T1001] CREDENTIAL TECHNOLOGY DEFICIENCY:
  - Observed: ${notes1 || 'Unencrypted static UID broadcast'}
  - Standard: Encrypted Smartcards (AES-128 / DESFire EV3 / ISO 14443-4).
  - Remediation: Deploy compliant encrypted smartcards and apply encryption keys to readers.\n\n` : ''}${workbenchState.c2 === 'Soft' ? `* [PHY-T1002/T1003] PORTAL LATCH & SENSOR DEFICIENCY:
  - Observed: ${notes2 || 'Frame strike gap > 3.2mm without protective astragal'}
  - Standard: Continuous steel astragal latch guards & shielded REX PIR hoods.
  - Remediation: Install full-height astragal plates and UL-listed REX beam deflectors.\n\n` : ''}${workbenchState.c3 === 'Soft' ? `* [PHY-T1004] EXPOSED NETWORK INTERFACE DEFICIENCY:
  - Observed: ${notes3 || 'Active Layer 1 PHY carrier signaling illuminated'}
  - Standard: Public drop isolation / Port Shutdown / 802.1X NAC.
  - Remediation: Administratively disable unassigned switch ports and verify 802.1X policy.\n\n` : ''}
2. REMEDIATION PROTOCOL
- Submit technical rectification schedule.
- Conduct APCAF re-inspection to verify 'Hardened' status upon completion.

Authorized by: Assessor / Physical Security Operations`;
  }

  navigator.clipboard.writeText(memo).then(() => {
    showToast("Copied Assessment Record to clipboard");
  });
}

function copyConsentClause() {
  const clause = `Client explicitly authorizes the assessment team to perform non-invasive, passive radio frequency (RF) credential reads and non-intrusive passive physical network port link detection during the inspection to verify vendor hardware installation specifications.`;
  navigator.clipboard.writeText(clause).then(() => {
    showToast("Copied Assessment Authorization Language");
  });
}

function showToast(msg) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-pill";
  toast.innerHTML = `${SVG_ICONS.check} <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 140ms var(--ease-spring)";
    setTimeout(() => toast.remove(), 150);
  }, 2200);
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileNavMenu");
  const btn = document.getElementById("mobileMenuToggleBtn");
  if (!menu) return;
  const isOpen = menu.classList.toggle("open");
  if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileNavMenu");
  const btn = document.getElementById("mobileMenuToggleBtn");
  if (menu) menu.classList.remove("open");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobileNavMenu");
  const mobileBtn = document.getElementById("mobileMenuToggleBtn");
  if (mobileMenu && mobileMenu.classList.contains("open")) {
    if (!mobileMenu.contains(e.target) && (!mobileBtn || !mobileBtn.contains(e.target))) {
      closeMobileMenu();
    }
  }
});
