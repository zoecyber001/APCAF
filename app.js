/**
 * APCAF Interactive Engine
 * SigmaHQ Search Repository, Atomic Test Docs & Executive Notice Generator
 * Pure SVG Icons, Zero Emojis, Auto Currency Localizer
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

// --- 1. APCAF Technique Knowledge Base ---
const TECHNIQUES = [
  {
    id: "PHY-T1001",
    tacticId: "PHY-TAC-02",
    tacticName: "Credential Intercept",
    title: "Unencrypted RFID Harvesting",
    isMVP: true,
    severity: "critical",
    inspectionTime: "5 Seconds",
    tool: "Pocket Multi-Frequency RFID Reader",
    mechanics: "Unencrypted 125 kHz or MIFARE Classic cards transmit static UIDs that can be cloned in under 5 seconds using handheld copiers.",
    passiveQA: "Contactless read of badge credential. If card emits unencrypted 125 kHz carrier (HID Prox, EM4100) or static MIFARE CSN, classify as Legacy / Soft.",
    mitigationId: "PHY-M1001",
    mitigationTitle: "Encrypted Smartcards (AES-128 / DESFire EV3)",
    mitigation: "Mandate ISO/IEC 14443-4 credentials with AES-128 mutual authentication (DESFire EV2/EV3, Seos, PIV smartcards) with cryptographic SAM keys configured on readers.",
    compliance: ["ISO 27001 A.7.2", "PCI DSS Req 9.2.1", "SOC 2 CC6.4"],
    atomicDoc: {
      prerequisites: [
        "Pocket RFID Interrogator (Proxmark3 / Keysy / Multi-reader)",
        "Assessor badge holder consent",
        "Zero RF field perturbation on active reader panels"
      ],
      steps: [
        "Power on pocket RFID interrogator in passive listen/read mode.",
        "Hold the badge within 2-5 cm of the interrogator coil for 3 seconds.",
        "Check interrogation logs: Observe carrier frequency and data payload structure.",
        "Evaluate modulation: Identify whether response contains static unencrypted UID (125 kHz Prox / CSN) or initiates ISO 14443-4 cryptochip challenge."
      ],
      passCriteria: "Card initiates encrypted handshake (AES-128 / DESFire EV2/EV3 / Seos) and refuses plaintext static UID cloning.",
      failCriteria: "Card immediately broadcasts unencrypted 26-bit to 37-bit facility/card code on 125 kHz carrier, or returns plaintext MIFARE Classic UID.",
      warrantyRemediation: "Integrator must exchange issued legacy credentials for AES-128 crypto-smartcards and configure cryptographic SAM keys across all access controllers under original contract warranty."
    }
  },
  {
    id: "PHY-T1002",
    tacticId: "PHY-TAC-03",
    tacticName: "Portal Ingress",
    title: "Mechanical Latch Manipulation (Slip & UDT)",
    isMVP: true,
    severity: "critical",
    inspectionTime: "15 Seconds",
    tool: "Metric Feeler Gauge / Visual Margin Check",
    mechanics: "Exposed latch bolts on outward-opening doors can be retracted with shove knives or reached via under-door tools due to excessive frame clearance.",
    passiveQA: "Check door perimeter margins. If gap > 3.2mm (1/8\") and lacks a continuous overlapping astragal latch plate, classify as Legacy / Soft.",
    mitigationId: "PHY-M1002",
    mitigationTitle: "Full-Length Continuous Steel Astragals",
    mitigation: "Install full-height continuous stainless steel astragal latch guards to completely shield the latch bolt from tool insertion.",
    compliance: ["ISO 27001 A.7.4", "PCI DSS Req 9.1.1"],
    atomicDoc: {
      prerequisites: [
        "Pocket metric feeler gauge (0.5mm - 5.0mm blades)",
        "Inspection penlight",
        "Visual access to closed exterior door perimeter"
      ],
      steps: [
        "Verify the door is fully engaged in its locked strike position without touching the handle.",
        "Insert the feeler gauge into the vertical jamb margin directly in front of the latch bolt.",
        "Measure the clearance distance between the door edge and the frame stop.",
        "Inspect the external surface for a continuous full-height steel astragal plate overlapping the jamb."
      ],
      passCriteria: "Frame clearance is <= 3.2mm (1/8\") OR an overlapping continuous steel astragal completely shields the latch bolt from direct line-of-sight and tool insertion.",
      failCriteria: "Clearance exceeds 3.2mm with direct line-of-sight to the bevel of the latch bolt, allowing tool bypass without frame contact.",
      warrantyRemediation: "Integrator must supply and mount full-height stainless steel security astragals and adjust door closer latching speeds to ensure positive mechanical latching."
    }
  },
  {
    id: "PHY-T1003",
    tacticId: "PHY-TAC-03",
    tacticName: "Portal Ingress",
    title: "REX Sensor Blind Activation",
    isMVP: true,
    severity: "high",
    inspectionTime: "15 Seconds",
    tool: "Line-of-Sight Check",
    mechanics: "Interior Request-to-Exit (REX) PIR sensors unlock doors when tripped from outside using compressed air canisters or reaching tools through gaps.",
    passiveQA: "Inspect optical line-of-sight to the interior REX sensor through door threshold/transom. If the sensor PIR lens is visible without a directional deflector hood, classify as Legacy / Soft.",
    mitigationId: "PHY-M1003",
    mitigationTitle: "Directional REX PIR Deflector Hoods",
    mitigation: "Install UL-listed directional deflector hoods limiting sensor field-of-view strictly to interior exit paths, paired with perimeter brush seals.",
    compliance: ["ISO 27001 A.7.4", "SOC 2 CC6.4"],
    atomicDoc: {
      prerequisites: [
        "Visual line-of-sight through threshold or door perimeter",
        "Penlight for interior transom inspection",
        "Zero deployment of pressurized aerosol or heat sources"
      ],
      steps: [
        "Stand on the unsecure exterior side of the closed server room door.",
        "Look through the top transom gap and bottom door threshold sweep.",
        "Locate the interior REX PIR sensor mounted above the door header.",
        "Verify whether the sensor has a downward-facing shroud or directional optical deflector limiting its cone."
      ],
      passCriteria: "REX sensor has a physical deflector shroud or is configured as a dual-technology (PIR + capacitive touch bar) system immune to threshold air currents.",
      failCriteria: "Wide-angle unhooded PIR sensor is visible directly through door margins, allowing exterior thermal plumes or aerosol sprays to trip the sensor.",
      warrantyRemediation: "Integrator must install UL-listed directional deflector hoods over all REX motion detectors and install heavy-duty perimeter brush weatherstripping."
    }
  },
  {
    id: "PHY-T1004",
    tacticId: "PHY-TAC-05",
    tacticName: "Interface & Tap",
    title: "Unauthenticated Physical L1/L2 Network Drop",
    isMVP: true,
    severity: "high",
    inspectionTime: "10 Seconds",
    tool: "Passive LED Link Tester",
    mechanics: "Accessible wall drops in public or common areas provide immediate physical layer link pulses without port isolation or 802.1X authentication.",
    passiveQA: "Insert zero-packet passive LED link tester into drop. If Layer 1 link LED illuminates continuously on an unmonitored drop, classify as Legacy / Soft.",
    mitigationId: "PHY-M1004",
    mitigationTitle: "Port Shutdown & IEEE 802.1X NAC",
    mitigation: "Administratively shut down unused switch ports at the patch panel and enforce 802.1X Network Access Control across all perimeter wall jacks.",
    compliance: ["ISO 27001 A.7.4 & A.8.20", "PCI DSS Req 9.1.2"],
    atomicDoc: {
      prerequisites: [
        "Passive RJ-45 LED Link Tester (zero packet transmission, purely electrical LED indication)",
        "Target public/lobby wall jacks within audit scope",
        "Zero network packet sniffing or injection"
      ],
      steps: [
        "Identify accessible network RJ-45 jacks in unmonitored common areas.",
        "Insert the passive LED link tester dongle into the jack.",
        "Observe the hardware link pulse indicator LEDs for 5 seconds.",
        "Log whether electrical Layer 1 PHY carrier signaling is active."
      ],
      passCriteria: "No link LED activity (port administratively shut down) OR port immediately rejects unauthenticated connection via 802.1X quarantine.",
      failCriteria: "Link LED illuminates steady green/amber, indicating an active unauthenticated Layer 1/2 switch port in an unrestricted public area.",
      warrantyRemediation: "Integrator/Network team must disable all unassigned patch panel drops and configure 802.1X Port-Based Network Access Control with dynamic VLAN assignment."
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

  // Set date in executive notice
  const dateEl = document.getElementById("memoCurrentDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Close modals on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTechniqueModal();
      closeSowModal();
      closeCurrencyDropdown();
    }
  });
  
  // Close modals on overlay click
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

  // Close currency dropdown on outside click
  document.addEventListener("click", (e) => {
    const wrap = document.querySelector(".currency-selector-wrap");
    if (wrap && !wrap.contains(e.target)) {
      closeCurrencyDropdown();
    }
  });

  // Attach input listeners for live updates
  ["input-notes-c1", "input-notes-c2", "input-notes-c3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderExecutiveNotice);
  });
});

// --- 4. Currency Selector Dropdown Controller ---
function toggleCurrencyDropdown() {
  const menu = document.getElementById("currencyDropdownMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

function closeCurrencyDropdown() {
  const menu = document.getElementById("currencyDropdownMenu");
  if (menu) {
    menu.classList.remove("open");
  }
}

function selectCurrency(code) {
  if (typeof setAppCurrency === "function") {
    setAppCurrency(code);
  }
  closeCurrencyDropdown();
}

// --- 5. SigmaHQ-Style Rule Repository Engine ---
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
          <span class="card-badge-severity ${tech.severity}">${tech.severity.toUpperCase()}</span>
          ${tech.isMVP ? '<span class="chip-tag" style="font-size: 0.65rem;">MVP</span>' : ''}
        </div>
      </div>
      <div class="card-title">${tech.title}</div>
      <div class="card-desc">${tech.mechanics}</div>
      <div class="card-footer-info">
        <span style="display: inline-flex; align-items: center; gap: 4px;">
          ${SVG_ICONS.clock} ${tech.inspectionTime}
        </span>
        <span style="color: var(--accent-sky); font-weight: 600;">Inspect Rule →</span>
      </div>
    </div>
  `).join("");
}

function openTechniqueModal(techId) {
  const tech = TECHNIQUES.find(t => t.id === techId);
  if (!tech) return;

  document.getElementById("modalTacticTag").textContent = `${tech.tacticId}: ${tech.tacticName}`;
  document.getElementById("modalTitle").textContent = `${tech.id} - ${tech.title}`;
  document.getElementById("modalMechanics").textContent = tech.mechanics;
  document.getElementById("modalTime").textContent = tech.inspectionTime;
  document.getElementById("modalPassiveQA").textContent = tech.passiveQA;
  document.getElementById("modalTool").textContent = tech.tool;
  document.getElementById("modalMitigationId").textContent = tech.mitigationId;
  document.getElementById("modalMitigation").textContent = `${tech.mitigationTitle}: ${tech.mitigation}`;
  
  const compWrap = document.getElementById("modalCompliance");
  compWrap.innerHTML = tech.compliance.map(c => `<span class="chip-tag">${c}</span>`).join(" ");

  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeTechniqueModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "auto";
}

// --- 6. SOW Consent Modal ---
function openSowModal() {
  const overlay = document.getElementById("sowModalOverlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeSowModal() {
  const overlay = document.getElementById("sowModalOverlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

function copySowClauseAndClose() {
  copyConsentClause();
  closeSowModal();
}

// --- 7. Workbench State & Executive Notice Renderer ---
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
      observed: notes1,
      standard: "Encrypted High-Frequency Smartcards (AES-128 / DESFire EV3 / ISO 14443-4)",
      remediation: "Supply compliant encrypted smartcards; configure cryptographic SAM profiles on readers."
    });
  }
  if (workbenchState.c2 === "Soft") {
    softItems.push({
      id: "PHY-T1002/T1003",
      observed: notes2,
      standard: "Continuous Steel Astragal Latch Guard (Gap &le; 3.2mm) + Directional REX PIR Hood",
      remediation: "Install full-height interlocking steel astragals and UL-listed REX beam deflectors."
    });
  }
  if (workbenchState.c3 === "Soft") {
    softItems.push({
      id: "PHY-T1004",
      observed: notes3,
      standard: "Administrative Port Shutdown / IEEE 802.1X Network Access Control",
      remediation: "Patch out unmonitored drops and administratively disable unused switch ports."
    });
  }

  if (softItems.length > 0) {
    stamp.className = "notice-badge-stamp hold";
    stamp.textContent = `Retainage Hold (${softItems.length} Defect(s) Identified)`;
    if (summaryText) {
      summaryText.textContent = "An independent APCAF Quality Assurance inspection identified latent hardware installation deficiencies. In accordance with standard contractual warranty terms, final invoice retainage is placed on hold pending zero-cost vendor rectification.";
    }
    
    tableBody.innerHTML = softItems.map(item => `
      <tr>
        <td><strong style="color: var(--accent-sky); font-family: var(--font-mono);">${item.id}</strong></td>
        <td><span style="color: var(--status-defect);">${item.observed}</span></td>
        <td>${item.standard}</td>
        <td><strong style="color: var(--text-head);">${item.remediation}</strong></td>
      </tr>
    `).join("");
  } else {
    stamp.className = "notice-badge-stamp cleared";
    stamp.textContent = "100% Spec Compliant - Retainage Approved";
    if (summaryText) {
      summaryText.textContent = "An independent APCAF Quality Assurance inspection has verified that all physical security controls satisfy hardened engineering specifications. All installed credentials, portal barriers, and network interfaces are approved for final invoice sign-off.";
    }
    
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--status-hardened); padding: 24px; font-size: 0.88rem;">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            ${SVG_ICONS.check} All 3 physical access vectors verified as Hardened Spec. Zero installation warranty defects identified. Approved for final milestone retainage disbursement.
          </span>
        </td>
      </tr>
    `;
  }
}

// --- 8. Memo Copy Logic with Clearance Guard Clause ---
function copyExecutiveMemoText() {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const softItems = [workbenchState.c1, workbenchState.c2, workbenchState.c3].filter(s => s === "Soft");
  const notes1 = document.getElementById("input-notes-c1")?.value || "";
  const notes2 = document.getElementById("input-notes-c2")?.value || "";
  const notes3 = document.getElementById("input-notes-c3")?.value || "";

  let memo = "";

  if (softItems.length === 0) {
    memo = `EXECUTIVE MEMORANDUM: PHYSICAL SECURITY QA CLEARANCE
--------------------------------------------------------------------------------
TO:       Physical Security Systems Integrator
FROM:     Office of the CISO & Corporate Security Operations
DATE:     ${dateStr}
FACILITY: [Target Facility / Room 101]
STATUS:   RETAINAGE APPROVED (100% Specification Compliant)
--------------------------------------------------------------------------------

All audited physical access vectors (RF Credentials, Perimeter Barrier, and Network Drops) have met hardened specification standards. Final milestone retainage payment is cleared for disbursement.

Authorized by: Office of the Chief Information Security Officer`;
  } else {
    memo = `EXECUTIVE MEMORANDUM: PHYSICAL SECURITY INSTALLATION WARRANTY DEFECT NOTICE
--------------------------------------------------------------------------------
TO:       Physical Security Systems Integrator
FROM:     Office of the CISO & Corporate Security Operations
DATE:     ${dateStr}
FACILITY: [Target Facility / Room 101]
STATUS:   RETAINAGE PAYMENT ON HOLD (${softItems.length} Specification Defect(s) Identified)
--------------------------------------------------------------------------------

1. EXECUTIVE NOTICE
In accordance with contractual hardware specifications, an independent APCAF
Quality Assurance inspection was performed. Final invoice retainage payment is
placed on hold pending zero-cost vendor rectification of the following items:

${workbenchState.c1 === 'Soft' ? `* [PHY-T1001] CREDENTIAL MODERNITY DEFECT:
  - Observed: ${notes1}
  - Contract Standard: Encrypted Smartcards (AES-128 / DESFire EV3 / ISO 14443-4).
  - Required Warranty Action: Supply compliant smartcards and apply encryption keys to readers.\n\n` : ''}${workbenchState.c2 === 'Soft' ? `* [PHY-T1002/T1003] PERIMETER HARDENING DEFECT:
  - Observed: ${notes2}
  - Contract Standard: Continuous steel astragal latch guards & shielded REX PIR hoods.
  - Required Warranty Action: Install full-height astragal plates and UL-listed REX beam deflectors.\n\n` : ''}${workbenchState.c3 === 'Soft' ? `* [PHY-T1004] EXPOSED INTERFACE DEFECT:
  - Observed: ${notes3}
  - Contract Standard: Public drop isolation / Port Shutdown / 802.1X NAC.
  - Required Warranty Action: Patch out unused public drops and administratively disable switch interfaces.\n\n` : ''}
2. RECTIFICATION PROTOCOL
- Vendor must submit written remediation plan within 5 business days.
- A 45-second APCAF QA re-inspection will verify 'Hardened' status prior to invoice release.

Authorized by: Office of the Chief Information Security Officer`;
  }

  navigator.clipboard.writeText(memo).then(() => {
    showToast("Copied Executive Notice to clipboard");
  });
}

function copyConsentClause() {
  const clause = `Client explicitly authorizes the assessment team to perform non-invasive, passive radio frequency (RF) credential reads and non-intrusive passive physical network port link detection during the inspection to verify vendor hardware installation specifications.`;
  navigator.clipboard.writeText(clause).then(() => {
    showToast("Copied SOW Consent Clause");
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

// Global click outside to close menus
document.addEventListener("click", (e) => {
  const currencyMenu = document.getElementById("currencyDropdownMenu");
  const currencyBtn = document.querySelector(".btn-nav-currency");
  if (currencyMenu && currencyMenu.classList.contains("open")) {
    if (!currencyMenu.contains(e.target) && (!currencyBtn || !currencyBtn.contains(e.target))) {
      currencyMenu.classList.remove("open");
    }
  }

  const mobileMenu = document.getElementById("mobileNavMenu");
  const mobileBtn = document.getElementById("mobileMenuToggleBtn");
  if (mobileMenu && mobileMenu.classList.contains("open")) {
    if (!mobileMenu.contains(e.target) && (!mobileBtn || !mobileBtn.contains(e.target))) {
      closeMobileMenu();
    }
  }
});

