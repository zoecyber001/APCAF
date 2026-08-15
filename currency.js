/**
 * APCAF Global Currency & Country Localization Engine
 * Automatically detects client country via Timezone & Browser Locale,
 * and dynamically localizes all currency amounts, symbols, and toolkit values.
 */

const CURRENCY_CONFIG = {
  USD: { code: "USD", symbol: "$", name: "United States (USD)", kitTotal: "$50", rfidRange: "$20 - $30", feelerRange: "$5 - $8", ledRange: "$10 - $15", zeroBudget: "$0" },
  GBP: { code: "GBP", symbol: "£", name: "United Kingdom (GBP)", kitTotal: "£40", rfidRange: "£16 - £24", feelerRange: "£4 - £7", ledRange: "£8 - £12", zeroBudget: "£0" },
  EUR: { code: "EUR", symbol: "€", name: "European Union (EUR)", kitTotal: "€45", rfidRange: "€18 - €28", feelerRange: "€5 - €8", ledRange: "€9 - €14", zeroBudget: "€0" },
  CAD: { code: "CAD", symbol: "CA$", name: "Canada (CAD)", kitTotal: "CA$68", rfidRange: "CA$27 - CA$40", feelerRange: "CA$7 - CA$11", ledRange: "CA$14 - CA$20", zeroBudget: "CA$0" },
  AUD: { code: "AUD", symbol: "A$", name: "Australia (AUD)", kitTotal: "A$76", rfidRange: "A$30 - A$45", feelerRange: "A$8 - A$12", ledRange: "A$15 - A$23", zeroBudget: "A$0" },
  JPY: { code: "JPY", symbol: "¥", name: "Japan (JPY)", kitTotal: "¥7,500", rfidRange: "¥3,000 - ¥4,500", feelerRange: "¥750 - ¥1,200", ledRange: "¥1,500 - ¥2,250", zeroBudget: "¥0" },
  NGN: { code: "NGN", symbol: "₦", name: "Nigeria (NGN)", kitTotal: "₦75,000", rfidRange: "₦30,000 - ₦45,000", feelerRange: "₦7,500 - ₦12,000", ledRange: "₦15,000 - ₦22,500", zeroBudget: "₦0" },
  INR: { code: "INR", symbol: "₹", name: "India (INR)", kitTotal: "₹4,200", rfidRange: "₹1,700 - ₹2,500", feelerRange: "₹420 - ₹680", ledRange: "₹840 - ₹1,260", zeroBudget: "₹0" },
  ZAR: { code: "ZAR", symbol: "R", name: "South Africa (ZAR)", kitTotal: "R920", rfidRange: "R370 - R550", feelerRange: "R90 - R150", ledRange: "R180 - R280", zeroBudget: "R0" },
  BRL: { code: "BRL", symbol: "R$", name: "Brazil (BRL)", kitTotal: "R$270", rfidRange: "R$110 - R$160", feelerRange: "R$27 - R$43", ledRange: "R$54 - R$80", zeroBudget: "R$0" },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore (SGD)", kitTotal: "S$67", rfidRange: "S$27 - S$40", feelerRange: "S$7 - S$11", ledRange: "S$13 - S$20", zeroBudget: "S$0" },
  CHF: { code: "CHF", symbol: "CHF", name: "Switzerland (CHF)", kitTotal: "CHF 44", rfidRange: "CHF 18 - CHF 26", feelerRange: "CHF 4 - CHF 7", ledRange: "CHF 9 - CHF 13", zeroBudget: "CHF 0" },
  AED: { code: "AED", symbol: "AED", name: "United Arab Emirates (AED)", kitTotal: "AED 184", rfidRange: "AED 74 - AED 110", feelerRange: "AED 18 - AED 30", ledRange: "AED 37 - AED 55", zeroBudget: "AED 0" }
};

// Timezone to Currency Mapping
const TIMEZONE_MAP = {
  "Europe/London": "GBP",
  "Europe/Dublin": "EUR",
  "Europe/Paris": "EUR",
  "Europe/Berlin": "EUR",
  "Europe/Amsterdam": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Zurich": "CHF",
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Denver": "USD",
  "America/Los_Angeles": "USD",
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "America/Montreal": "CAD",
  "America/Sao_Paulo": "BRL",
  "Australia/Sydney": "AUD",
  "Australia/Melbourne": "AUD",
  "Asia/Tokyo": "JPY",
  "Asia/Singapore": "SGD",
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",
  "Asia/Dubai": "AED",
  "Africa/Lagos": "NGN",
  "Africa/Johannesburg": "ZAR"
};

function detectUserCurrency() {
  const saved = localStorage.getItem("apcaf_currency");
  if (saved && CURRENCY_CONFIG[saved]) {
    return saved;
  }

  // 1. Timezone detection
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_MAP[tz]) {
      return TIMEZONE_MAP[tz];
    }
    if (tz && tz.startsWith("Europe/")) return "EUR";
    if (tz && tz.startsWith("America/")) return "USD";
    if (tz && tz.startsWith("Asia/")) return "USD";
    if (tz && tz.startsWith("Africa/")) return "NGN";
  } catch (e) {
    // fallback
  }

  // 2. Language/Locale detection
  try {
    const lang = (navigator.language || navigator.userLanguage || "en-US").toLowerCase();
    if (lang.includes("gb") || lang.includes("uk")) return "GBP";
    if (lang.includes("ca")) return "CAD";
    if (lang.includes("au")) return "AUD";
    if (lang.includes("jp") || lang.includes("ja")) return "JPY";
    if (lang.includes("ng")) return "NGN";
    if (lang.includes("in")) return "INR";
    if (lang.includes("de") || lang.includes("fr") || lang.includes("nl") || lang.includes("es") || lang.includes("it")) return "EUR";
  } catch (e) {
    // fallback
  }

  return "USD";
}

function setAppCurrency(currencyCode) {
  if (!CURRENCY_CONFIG[currencyCode]) return;
  localStorage.setItem("apcaf_currency", currencyCode);
  applyCurrency(currencyCode);
}

function applyCurrency(currencyCode) {
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.USD;

  // 1. Update Hero metric
  const heroBudget = document.getElementById("metricZeroBudget");
  if (heroBudget) {
    heroBudget.textContent = config.zeroBudget;
  }

  // 2. Update Toolkit section title
  const toolkitTitle = document.getElementById("toolkitMainTitle");
  if (toolkitTitle) {
    toolkitTitle.textContent = `The ${config.kitTotal} Non-Invasive Field Kit`;
  }

  // 3. Update individual toolkit price tags
  const tagRfid = document.getElementById("priceTagRfid");
  if (tagRfid) tagRfid.textContent = config.rfidRange;

  const tagFeeler = document.getElementById("priceTagFeeler");
  if (tagFeeler) tagFeeler.textContent = config.feelerRange;

  const tagLed = document.getElementById("priceTagLed");
  if (tagLed) tagLed.textContent = config.ledRange;

  // 4. Update currency selector button
  const selectorLabel = document.getElementById("currentCurrencyLabel");
  if (selectorLabel) {
    selectorLabel.textContent = `${config.code} (${config.symbol})`;
  }

  // 5. Update active class in dropdown
  document.querySelectorAll(".currency-opt-btn").forEach(btn => {
    if (btn.getAttribute("data-currency") === currencyCode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function initCurrencyEngine() {
  const detected = detectUserCurrency();
  applyCurrency(detected);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCurrencyEngine);
} else {
  initCurrencyEngine();
}
