document.documentElement.classList.add("js-enabled");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-links a");
const currentYear = document.querySelector("[data-current-year]");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const pageKey = document.body.dataset.page;
const menuMediaQuery = window.matchMedia("(max-width: 1100px)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const navPanelHome = navPanel
  ? {
      parent: navPanel.parentElement,
      nextSibling: navPanel.nextSibling,
    }
  : null;
let menuOverlay = null;
let menuCloseButton = null;
let lastFocusedElement = null;

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === pageKey) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const focusableMenuSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getMenuFocusableElements = () => {
  if (!navPanel) return [];
  return Array.from(navPanel.querySelectorAll(focusableMenuSelector)).filter((element) => {
    return element.offsetParent !== null || element === document.activeElement;
  });
};

const isDrawerLayout = () => menuMediaQuery.matches;

const moveMenuToDrawerLayer = () => {
  if (!navPanel || !isDrawerLayout()) return;
  if (navPanel.parentElement === document.body) return;
  document.body.appendChild(navPanel);
};

const restoreMenuToHeader = () => {
  if (!navPanel || !navPanelHome?.parent) return;
  if (navPanel.parentElement === navPanelHome.parent) return;
  navPanelHome.parent.insertBefore(navPanel, navPanelHome.nextSibling);
};

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!navToggle || !navPanel) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  navPanel.classList.remove("is-open", "open");
  if (isDrawerLayout()) {
    navPanel.setAttribute("aria-hidden", "true");
  } else {
    navPanel.removeAttribute("aria-hidden");
  }
  navPanel.removeAttribute("role");
  navPanel.removeAttribute("aria-modal");
  if (menuOverlay) {
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("menu-open");
  if (restoreFocus && lastFocusedElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
};

if (navToggle && navPanel) {
  navPanel.classList.add("mobile-menu");

  const brand = document.querySelector(".brand");
  const brandLogo = document.querySelector(".brand-logo");
  const brandName = document.querySelector(".brand-name");
  const drawerHeader = document.createElement("div");
  drawerHeader.className = "mobile-menu__header";

  const drawerBrand = document.createElement("a");
  drawerBrand.className = "mobile-menu__brand";
  drawerBrand.href = brand ? brand.getAttribute("href") || "./" : "./";
  drawerBrand.setAttribute("aria-label", "Accounting & Tax Planners of NY Inc home");

  if (brandLogo) {
    const drawerLogo = document.createElement("img");
    drawerLogo.src = brandLogo.src;
    drawerLogo.alt = "";
    drawerLogo.className = "mobile-menu__logo";
    drawerBrand.appendChild(drawerLogo);
  }

  const drawerBrandText = document.createElement("span");
  drawerBrandText.textContent = brandName ? brandName.textContent : "Accounting & Tax Planners of NY Inc";
  drawerBrand.appendChild(drawerBrandText);

  menuCloseButton = document.createElement("button");
  menuCloseButton.className = "mobile-menu__close menu-close";
  menuCloseButton.type = "button";
  menuCloseButton.setAttribute("aria-label", "Close menu");
  menuCloseButton.innerHTML = "<span></span><span></span>";

  drawerHeader.append(drawerBrand, menuCloseButton);
  navPanel.prepend(drawerHeader);

  const navLinksList = navPanel.querySelector(".nav-links");
  if (navLinksList) {
    navLinksList.classList.add("mobile-menu-links");
  }

  menuOverlay = document.createElement("button");
  menuOverlay.className = "menu-overlay";
  menuOverlay.type = "button";
  menuOverlay.tabIndex = -1;
  menuOverlay.setAttribute("aria-label", "Close menu");
  menuOverlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(menuOverlay);

  const openMenu = () => {
    moveMenuToDrawerLayer();
    lastFocusedElement = document.activeElement;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    navPanel.classList.add("is-open", "open");
    navPanel.setAttribute("role", "dialog");
    navPanel.setAttribute("aria-hidden", "false");
    navPanel.setAttribute("aria-modal", "true");
    if (menuOverlay) {
      menuOverlay.classList.add("open");
      menuOverlay.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("menu-open");
    const focusTarget = menuCloseButton || getMenuFocusableElements()[0];
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu({ restoreFocus: true });
      return;
    }
    openMenu();
  });

  menuCloseButton.addEventListener("click", () => closeMenu({ restoreFocus: true }));
  drawerBrand.addEventListener("click", () => closeMenu());
  menuOverlay.addEventListener("click", () => closeMenu({ restoreFocus: true }));

  const syncMenuLayout = () => {
    if (isDrawerLayout()) {
      moveMenuToDrawerLayer();
      if (!navPanel.classList.contains("is-open")) {
        navPanel.setAttribute("aria-hidden", "true");
      }
      return;
    }
    closeMenu();
    restoreMenuToHeader();
    navPanel.removeAttribute("aria-hidden");
  };

  syncMenuLayout();
  if (typeof menuMediaQuery.addEventListener === "function") {
    menuMediaQuery.addEventListener("change", syncMenuLayout);
  } else {
    menuMediaQuery.addListener(syncMenuLayout);
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu({ restoreFocus: true });
    return;
  }

  if (event.key !== "Tab" || !navPanel || !navPanel.classList.contains("is-open")) return;
  const focusableElements = getMenuFocusableElements();
  if (!focusableElements.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const offset = header ? header.offsetHeight + 18 : 18;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });
});

const updateChrome = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  if (scrollTopButton) {
    scrollTopButton.classList.toggle("is-visible", window.scrollY > 600);
  }
};

window.addEventListener("scroll", updateChrome, { passive: true });
updateChrome();

const parallaxHero = document.querySelector("[data-parallax-hero]");
const parallaxMediaQuery = window.matchMedia("(min-width: 901px)");
const reducedMotionQuery = prefersReducedMotion;
let parallaxFrame = null;

const updateHeroParallax = () => {
  if (!parallaxHero) return;
  parallaxFrame = null;

  if (!parallaxMediaQuery.matches || reducedMotionQuery.matches) {
    parallaxHero.style.setProperty("--hero-parallax-y", "0px");
    return;
  }

  const rect = parallaxHero.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const offset = Math.round((clampedProgress - 0.5) * 72);
  parallaxHero.style.setProperty("--hero-parallax-y", `${offset}px`);
};

const requestHeroParallaxUpdate = () => {
  if (!parallaxHero || parallaxFrame) return;
  parallaxFrame = window.requestAnimationFrame(updateHeroParallax);
};

if (parallaxHero) {
  window.addEventListener("scroll", requestHeroParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestHeroParallaxUpdate);
  if (typeof parallaxMediaQuery.addEventListener === "function") {
    parallaxMediaQuery.addEventListener("change", requestHeroParallaxUpdate);
    reducedMotionQuery.addEventListener("change", requestHeroParallaxUpdate);
  } else {
    parallaxMediaQuery.addListener(requestHeroParallaxUpdate);
    reducedMotionQuery.addListener(requestHeroParallaxUpdate);
  }
  updateHeroParallax();
}

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });
}

const cookieStorageKey = "atpCookieNoticeChoice";
const getCookieChoice = () => {
  try {
    return window.localStorage.getItem(cookieStorageKey);
  } catch (error) {
    return null;
  }
};

const setCookieChoice = (choice) => {
  try {
    window.localStorage.setItem(cookieStorageKey, choice);
  } catch (error) {
    // The banner can still be dismissed for the current page if storage is blocked.
  }
};

const getScriptBasePath = () => {
  const scriptElement =
    document.currentScript ||
    document.querySelector('script[src$="script.js"], script[src*="script.js?"]');
  const scriptSrc = scriptElement ? scriptElement.getAttribute("src") || "" : "";
  return scriptSrc.replace(/script\.js(?:[?#].*)?$/, "");
};

const siteRootPath = getScriptBasePath();
const privacyNoticePath = `${siteRootPath}privacy/`;

const cookieBanner = document.createElement("section");
cookieBanner.id = "privacy-cookie-notice";
cookieBanner.className = "cookie-banner";
cookieBanner.setAttribute("aria-label", "Privacy and cookie notice");
cookieBanner.hidden = Boolean(getCookieChoice());
cookieBanner.innerHTML = `
  <p><strong>Privacy &amp; Cookie Notice.</strong> This website uses essential browser storage for preferences and basic site functionality. Please do not submit sensitive tax documents through public forms. <a href="${privacyNoticePath}">Privacy &amp; Cookie Notice</a></p>
  <div class="cookie-banner__actions">
    <button class="cookie-banner__reject" type="button" data-cookie-reject>Reject</button>
    <button class="cookie-banner__accept" type="button" data-cookie-accept>Accept</button>
  </div>
`;
document.body.appendChild(cookieBanner);

const hideCookieBanner = (choice) => {
  setCookieChoice(choice);
  cookieBanner.hidden = true;
};

cookieBanner.querySelector("[data-cookie-accept]").addEventListener("click", () => hideCookieBanner("accepted"));
cookieBanner.querySelector("[data-cookie-reject]").addEventListener("click", () => hideCookieBanner("rejected"));

document.querySelectorAll("[data-cookie-settings]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    cookieBanner.hidden = false;
    cookieBanner.querySelector("[data-cookie-accept]").focus({ preventScroll: true });
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const accordion = document.querySelector("[data-accordion]");

if (accordion) {
  accordion.addEventListener("click", (event) => {
    const trigger = event.target.closest(".accordion-trigger");
    if (!trigger) return;

    const item = trigger.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    accordion.querySelectorAll(".accordion-trigger").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      const currentItem = button.closest(".accordion-item");
      currentItem.classList.remove("is-open");
      currentItem.querySelector(".accordion-panel").style.maxHeight = null;
    });

    if (!isOpen) {
      trigger.setAttribute("aria-expanded", "true");
      item.classList.add("is-open");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
}

const taxHelpFinder = document.querySelector("[data-tax-help-finder]");

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const applySearchCorrections = (value) => {
  let corrected = ` ${normalizeText(value)} `;
  const replacements = [
    [/\brefunf\b/g, "refund"],
    [/\brefnd\b/g, "refund"],
    [/\bpaymnt\b/g, "payment"],
    [/\bnotic\b/g, "notice"],
    [/\bbussiness\b/g, "business"],
    [/\bpayrol\b/g, "payroll"],
    [/\bnewyork\b/g, "new york"],
    [/\bnys\b/g, "new york state"],
    [/\bwheres\b/g, "where is"],
    [/\b1040x\b/g, "1040 x"],
    [/\b1120s\b/g, "1120 s"],
    [/\bw2\b/g, "w 2"],
    [/\bw3\b/g, "w 3"],
    [/\bw4\b/g, "w 4"],
    [/\bw9\b/g, "w 9"],
    [/\befile\b/g, "e file"]
  ];

  replacements.forEach(([pattern, replacement]) => {
    corrected = corrected.replace(pattern, replacement);
  });

  return corrected.replace(/\s+/g, " ").trim();
};

const taxHelpIntents = {
  refund: [
    "refund",
    "where refund",
    "check refund",
    "where is my refund",
    "refund status",
    "return money",
    "tax refund",
    "nys refund",
    "ny refund",
    "nj refund",
    "ca refund",
    "new york refund",
    "new jersey refund",
    "california refund",
    "federal refund",
    "irs refund"
  ],
  payment: [
    "pay tax",
    "pay taxes",
    "pay irs",
    "pay federal",
    "pay state",
    "make payment",
    "tax bill",
    "balance due",
    "payment plan",
    "direct pay",
    "eftps"
  ],
  notice: ["notice", "letter", "irs letter", "irs notice", "got notice", "received notice", "cp2000", "state notice", "tax letter"],
  poa: ["poa", "power attorney", "power of attorney", "form 2848", "representative", "authorize accountant", "irs authorization"],
  payroll: ["payroll", "payroll tax", "employment tax", "941", "944", "w 2", "wage", "employer tax", "payroll deadline", "payroll due date"],
  fbar: ["fbar", "foreign bank", "foreign account", "fincen", "form 114", "overseas account", "international account"],
  sales: ["sales tax", "resale", "seller permit", "sales tax filing", "sales tax web file", "collect sales tax"],
  ein: ["ein", "tax id", "business id", "employer identification", "get ein", "apply ein"],
  account: ["account", "online account", "tax account", "irs account", "transcript", "get transcript", "ip pin", "withholding estimator"],
  business: ["business tax", "s corp", "s corporation", "partnership", "corporation", "llc", "company tax", "business filing"],
  forms: ["forms", "tax form", "instructions", "publication", "schedule", "irs form", "extension", "amended return"]
};

const intentCategoryMap = {
  refund: "Refunds",
  payment: "Payments",
  notice: "Notices / POA",
  poa: "Notices / POA",
  payroll: "Payroll",
  fbar: "FBAR / Foreign Accounts",
  sales: "Sales Tax",
  ein: "Business Tax",
  account: "IRS Account / Transcript",
  business: "Business Tax",
  forms: "Forms"
};

const defaultTaxHelpIds = [
  "irs-direct-pay",
  "irs-refund-status",
  "ny-refund-status",
  "nj-refund-status",
  "ca-refund-status",
  "irs-notice",
  "irs-poa-form-2848",
  "fbar-overview",
  "payroll-due-dates",
  "ein"
];
const didYouMeanMap = {
  return: ["irs-refund-status", "ny-refund-status", "irs-forms"],
  letter: ["irs-notice"]
};

const getTaxHelpKeywords = (resource) => (Array.isArray(resource.keywords) ? resource.keywords : String(resource.keywords || "").split(","));

const getTaxHelpText = (resource) =>
  applySearchCorrections([resource.title, resource.answer, resource.source, resource.state, resource.category, ...getTaxHelpKeywords(resource)].join(" "));

const getResourceCategories = (resource) => [resource.category, ...(resource.relatedCategories || [])];

const singularize = (token) => {
  if (token.length > 4 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
};

const levenshteinDistance = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let previousRow = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const currentRow = [i];
    for (let j = 1; j <= b.length; j += 1) {
      currentRow[j] = Math.min(
        previousRow[j] + 1,
        currentRow[j - 1] + 1,
        previousRow[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    previousRow = currentRow;
  }

  return previousRow[b.length];
};

const isFuzzyMatch = (queryToken, candidateToken) => {
  const token = singularize(queryToken);
  const candidate = singularize(candidateToken);
  if (token === candidate || candidate.includes(token) || token.includes(candidate)) return true;
  if (token.length < 5 || candidate.length < 5) return false;
  const allowedDistance = Math.max(token.length, candidate.length) >= 8 ? 2 : 1;
  return levenshteinDistance(token, candidate) <= allowedDistance;
};

const getQueryTokens = (query) =>
  query
    .split(" ")
    .map(singularize)
    .filter((token) => token && !["i", "my", "a", "an", "the", "to", "for", "about", "please", "need", "how", "do", "does", "can"].includes(token));

const detectIntent = (query) => {
  let bestIntent = "";
  let bestScore = 0;
  const tokens = getQueryTokens(query);

  Object.entries(taxHelpIntents).forEach(([intent, phrases]) => {
    phrases.forEach((phrase) => {
      const normalizedPhrase = applySearchCorrections(phrase);
      let score = 0;
      if (query.includes(normalizedPhrase)) {
        score = normalizedPhrase.split(" ").length * 12;
      } else {
        const phraseTokens = getQueryTokens(normalizedPhrase);
        const matches = phraseTokens.filter((phraseToken) => tokens.some((token) => isFuzzyMatch(token, phraseToken))).length;
        if (matches === phraseTokens.length && matches > 0) score = matches * 7;
      }

      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    });
  });

  return bestScore > 0 ? bestIntent : "";
};

const detectState = (query, selectedState) => {
  if (selectedState && selectedState !== "all") return selectedState;

  const states = Array.isArray(window.taxHelpStates) ? window.taxHelpStates : [];
  const paddedQuery = ` ${query} `;

  for (const item of states) {
    const names = [item.state, item.abbreviation, ...(item.aliases || [])].map((name) => applySearchCorrections(name));
    if (names.some((name) => paddedQuery.includes(` ${name} `))) return item.state;
  }

  return "";
};

const isFederalResource = (resource) => !resource.state && resource.category !== "State";

const matchesTaxHelpFilter = (resource, activeFilter) => {
  if (activeFilter === "all") return true;
  if (activeFilter === "Federal") return isFederalResource(resource);
  if (activeFilter === "State") return resource.category === "State" || Boolean(resource.state);
  return getResourceCategories(resource).includes(activeFilter);
};

const taxHelpResultNotes = {
  refund: "Use this official page to check refund status and review what information may be required.",
  payment: "Use this official page to make or review a tax payment.",
  notice: "Use this official page to review tax notice guidance and next steps.",
  poa: "Use this official page to review authorization or power of attorney information.",
  forms: "Use this official page to open the form, instructions, or forms library.",
  salesTax: "Use this official page for sales tax filing, payment, or guidance.",
  businessTax: "Use this official page for business tax filing, payment, or guidance.",
  payroll: "Use this official page to review payroll tax filing, deposits, or deadlines.",
  fbar: "Use this official page to review FBAR guidance or filing information.",
  ein: "Use this official page to apply for or review EIN information.",
  account: "Use this official page to access tax account, transcript, identity, or withholding services.",
  agency: "Use this official page for state tax information and services.",
  stateAgency: "Use this official page for state tax information and services."
};

const getTaxHelpResultNote = (resource) => {
  if (resource.isFallback) {
    return "Use this official state agency page as a fallback for this tax action.";
  }

  if (resource.matchType === "form" || resource.category === "Forms") {
    return taxHelpResultNotes.forms;
  }

  const categoryActionMap = {
    Refunds: "refund",
    Payments: "payment",
    Payroll: "payroll",
    "Sales Tax": "salesTax",
    "Business Tax": "businessTax",
    "Notices / POA": "notice",
    "FBAR / Foreign Accounts": "fbar",
    State: "agency"
  };

  const action = resource.action || resource.intent || categoryActionMap[resource.category];
  return taxHelpResultNotes[action] || "Use this official link to review the tax action and next steps.";
};

const createTaxHelpResultItem = (resource) => {
  const item = document.createElement("div");
  item.className = "tax-help-result-item";

  const title = document.createElement("div");
  title.className = "tax-help-result-title";
  title.textContent = resource.title;

  const note = document.createElement("div");
  note.className = "tax-help-result-note";
  note.textContent = getTaxHelpResultNote(resource);

  const action = document.createElement("a");
  action.className = "tax-help-result-link";
  action.href = resource.url;
  action.target = "_blank";
  action.rel = "noopener noreferrer";
  action.textContent = "Open Link";

  item.append(title, note, action);
  return item;
};

const scoreTaxHelpResource = (resource, context) => {
  if (!matchesTaxHelpFilter(resource, context.activeFilter)) return -1;

  const text = getTaxHelpText(resource);
  const tokens = getQueryTokens(context.query);
  const textTokens = text.split(" ");
  const categories = getResourceCategories(resource);
  const categoryForIntent = intentCategoryMap[context.intent] || "";
  let score = 0;

  if (!context.query) {
    if (context.detectedState && resource.state === context.detectedState) score += resource.category === "State" ? 110 : 80;
    if (!context.detectedState && defaultTaxHelpIds.includes(resource.id)) score += 80 - defaultTaxHelpIds.indexOf(resource.id);
    if (context.activeFilter !== "all" && matchesTaxHelpFilter(resource, context.activeFilter)) score += 50;
    return score;
  }

  if (text.includes(context.rawQuery)) score += 120;
  if (text.includes(context.query)) score += 105;
  if (context.intent && resource.intent === context.intent) score += 70;
  if (context.intent && categories.includes(categoryForIntent)) score += 46;
  if (context.detectedState && resource.state === context.detectedState) score += 62;
  if (context.detectedState && !context.intent && resource.state === context.detectedState && resource.category === "State") score += 80;
  if (context.detectedState && context.intent && resource.state === context.detectedState && categories.includes(categoryForIntent)) score += 75;
  if (context.selectedState !== "all" && resource.state === context.selectedState) score += 52;
  if (resource.category === "State" && context.intent && categories.includes(categoryForIntent)) score += 38;
  if (context.query.includes("pay irs") && resource.id === "irs-direct-pay") score += 35;
  if (context.query.includes("pay irs") && resource.id === "irs-payment-options") score += 22;
  if (context.query.includes("payroll deadline") && resource.id === "payroll-due-dates") score += 35;
  if (context.query.includes("new york") && context.intent === "refund" && resource.id === "ny-refund-status") score += 35;
  if (context.detectedState === "New York" && context.intent === "refund" && resource.id === "ny-refund-status") score += 55;
  if (context.detectedState === "New Jersey" && context.intent === "refund" && resource.id === "nj-refund-status") score += 55;
  if (context.detectedState === "California" && context.intent === "refund" && resource.id === "ca-refund-status") score += 55;
  if (context.intent === "notice" && resource.id === "irs-notice") score += 22;

  tokens.forEach((token) => {
    if (textTokens.includes(token)) {
      score += 10;
    } else if (textTokens.some((candidate) => isFuzzyMatch(token, candidate))) {
      score += 5;
    }
  });

  return score;
};

const stateActionCategoryMap = {
  refund: "Refunds",
  payment: "Payments",
  notice: "Notices / POA",
  forms: "Forms",
  salesTax: "Sales Tax",
  businessTax: "Business Tax",
  payroll: "Payroll",
  fbar: "FBAR / Foreign Accounts",
  ein: "Business Tax",
  account: "IRS Account / Transcript",
  poa: "Notices / POA",
  stateAgency: "State",
  agency: "State"
};

const formSubtypeLabelMap = {
  federalForms: "Federal Forms",
  individualForms: "Individual Forms",
  businessForms: "Business Forms",
  salesTaxForms: "Sales Tax Forms",
  withholdingForms: "Withholding Forms",
  payrollForms: "Payroll Forms",
  corporateForms: "Corporate Forms",
  partnershipForms: "Partnership Forms",
  instructions: "Instructions",
  schedules: "Schedules"
};

const stateActionLabelMap = {
  refund: "Refund Status",
  payment: "Payment",
  notice: "Notice",
  forms: "Forms",
  salesTax: "Sales Tax",
  businessTax: "Business Tax",
  payroll: "Payroll",
  fbar: "FBAR",
  ein: "EIN",
  account: "Account",
  poa: "POA",
  stateAgency: "Agency",
  agency: "Agency"
};

const stateActionKeys = ["refund", "payment", "forms", "salesTax", "businessTax", "notice"];

const taxActionAliases = {
  refund: ["refund", "refunf", "return money", "check refund", "where refund", "where is my refund", "refund status"],
  payment: ["pay", "payment", "paymnt", "make payment", "tax bill", "balance due", "estimated tax", "pay tax", "pay taxes", "irs payment", "pay federal tax", "business tax payment"],
  notice: ["notice", "notic", "letter", "tax letter", "irs letter", "state notice", "cp2000", "notice reply", "respond to notice"],
  poa: ["poa", "power of attorney", "power attorney", "form 2848", "authorize accountant", "representative"],
  forms: ["forms", "form", "instructions", "publication", "schedule", "extension", "amended return"],
  salesTax: ["sales tax", "seller permit", "resale", "collect sales tax", "sales tax filing", "web file"],
  businessTax: ["business tax", "company tax", "llc tax", "corporation", "partnership", "s corp", "business filing"],
  payroll: ["payroll", "payrol", "employment tax", "withholding", "941", "944", "w 2", "w-2", "employer tax", "payroll deadline", "payroll due date"],
  fbar: ["fbar", "foreign bank", "foreign account", "fincen", "overseas account", "form 114"],
  ein: ["ein", "tax id", "employer identification number", "get ein", "apply ein"],
  account: ["account", "online account", "tax account", "irs account", "transcript", "get transcript", "tax record", "ip pin", "identity protection pin", "withholding estimator"],
  stateAgency: ["tax agency", "tax department", "department of revenue", "division of taxation", "tax office"]
};

const taxFormSearchTerms = [
  "form",
  "forms",
  "tax form",
  "instructions",
  "instruction",
  "publication",
  "schedule",
  "pdf",
  "1040",
  "1040 x",
  "1040 sr",
  "1040 nr",
  "1041",
  "1120",
  "1120 s",
  "1065",
  "990",
  "941",
  "944",
  "w 2",
  "w 4",
  "w 9",
  "1099",
  "2848",
  "8821",
  "5472",
  "fincen 114",
  "form 114",
  "it 201",
  "it 203",
  "nj 1040",
  "ca 540",
  "sales tax form",
  "withholding form",
  "business form"
];

const taxActionPriority = ["salesTax", "businessTax", "payroll", "refund", "payment", "notice", "poa", "fbar", "ein", "account", "forms", "stateAgency"];

const categoryFilterToActionKeys = {
  Refunds: ["refund"],
  Payments: ["payment"],
  "Notices / POA": ["notice", "poa"],
  Payroll: ["payroll"],
  "Sales Tax": ["salesTax"],
  "Business Tax": ["businessTax", "ein"],
  "FBAR / Foreign Accounts": ["fbar"],
  Forms: ["forms"]
};

const detectTaxAction = (query) => {
  const tokens = getQueryTokens(query);
  let bestAction = "";
  let bestScore = 0;

  taxActionPriority.forEach((actionKey) => {
    (taxActionAliases[actionKey] || []).forEach((alias) => {
      const normalizedAlias = applySearchCorrections(alias);
      let score = 0;
      if (query.includes(normalizedAlias)) {
        score = normalizedAlias.split(" ").length * 14;
      } else {
        const aliasTokens = getQueryTokens(normalizedAlias);
        const matches = aliasTokens.filter((aliasToken) => tokens.some((token) => isFuzzyMatch(token, aliasToken))).length;
        if (matches === aliasTokens.length && matches > 0) score = matches * 8;
      }

      if (score > bestScore) {
        bestAction = actionKey;
        bestScore = score;
      }
    });
  });

  return bestAction;
};

const detectActionState = (query, selectedState) => {
  const stateActions = Array.isArray(window.stateTaxActions) ? window.stateTaxActions : [];
  if (selectedState && selectedState !== "all") {
    return stateActions.find((item) => item.state === selectedState) || null;
  }

  const paddedQuery = ` ${query} `;

  for (const item of stateActions) {
    const names = [item.state, ...(item.aliases || [])].map((name) => applySearchCorrections(name));
    if (names.some((name) => paddedQuery.includes(` ${name} `))) return item;
  }

  const tokens = query.split(" ").filter(Boolean);
  for (const item of stateActions) {
    const abbreviations = (item.abbreviations || []).map((abbr) => abbr.toLowerCase());
    if (abbreviations.some((abbr) => tokens.includes(abbr))) return item;
  }

  return null;
};

const getFederalActionScore = (resource, query, actionKey) => {
  if (resource.action !== actionKey) return -1;
  const text = applySearchCorrections([resource.title, resource.answer, resource.source, resource.category, resource.state, resource.formNumber, ...(resource.keywords || [])].join(" "));
  let score = 60;
  if (text.includes(query)) score += 75;
  const compactQuery = normalizeFormKey(query);
  const compactText = normalizeFormKey(text);
  if (compactQuery && compactText.includes(compactQuery)) score += 42;
  getQueryTokens(query).forEach((token) => {
    if (text.split(" ").some((candidate) => isFuzzyMatch(token, candidate))) score += 8;
  });
  if (query.includes("pay irs") && resource.id === "irs-direct-pay") score += 60;
  if (actionKey === "payment" && matchesAnyPhrase(query, ["payment", "irs payment", "pay federal tax"]) && resource.id === "irs-payments") score += 110;
  if (actionKey === "payment" && matchesAnyPhrase(query, ["direct pay", "pay irs"]) && resource.id === "irs-direct-pay") score += 90;
  if (actionKey === "notice" && matchesAnyPhrase(query, ["notice", "irs notice", "irs letter", "notice reply", "respond to notice"]) && resource.id === "irs-notice") score += 120;
  if (actionKey === "notice" && query.includes("cp2000") && resource.id === "irs-cp2000") score += 120;
  if (query.includes("payroll deadline") && resource.id === "irs-payroll-due-dates") score += 80;
  if (query.includes("due date") && resource.id === "irs-payroll-due-dates") score += 50;
  if (actionKey === "fbar" && resource.id === "irs-fbar") score += 20;
  if (actionKey === "account" && resource.id === "irs-get-transcript" && query.includes("transcript")) score += 80;
  if (actionKey === "account" && resource.id === "irs-online-account" && query.includes("account")) score += 70;
  return score;
};

const createFederalActionResource = (item) => ({
  id: item.id,
  title: item.title,
  answer: item.answer,
  source: item.source,
  state: item.state || "",
  category: item.category || stateActionCategoryMap[item.action] || "Federal",
  action: item.action,
  actionLabel: stateActionLabelMap[item.action] || "Federal",
  url: item.url,
  buttonText: item.buttonText,
  keywords: item.keywords || [],
  relatedCategories: item.relatedCategories || [],
  formNumber: item.formNumber,
  matchType: item.matchType
});

const createStateActionResource = (stateEntry, actionKey, options = {}) => {
  const action = stateEntry.actions[actionKey] || {};
  const isAgency = actionKey === "agency" || actionKey === "stateAgency";
  const hasDirectUrl = Boolean(action.url) && !action.missingDirectUrl;
  const fallback = !isAgency && !hasDirectUrl;

  if (fallback && !options.silent) {
    console.warn(`Missing direct action URL for ${stateEntry.state} ${stateActionLabelMap[actionKey] || actionKey}. Add it to data/state-tax-actions.js.`);
  }

  const agencyAction = stateEntry.actions.agency;
  return {
    id: `${stateEntry.state.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${actionKey}`,
    title: fallback ? action.title || `${stateEntry.state} ${stateActionLabelMap[actionKey]}` : action.title,
    answer: fallback
      ? "I found the state and topic, but a direct official page has not been added yet. Use the official state tax agency website below as a fallback."
      : action.answer,
    source: action.source || stateEntry.agencyName,
    state: stateEntry.state,
    category: stateActionCategoryMap[actionKey] || "State",
    action: actionKey,
    actionLabel: stateActionLabelMap[actionKey] || "Agency",
    url: fallback ? stateEntry.agencyUrl : action.url || agencyAction.url,
    buttonText: fallback ? agencyAction.buttonText : action.buttonText,
    isFallback: fallback,
    isAgency
  };
};

const getRelatedStateActions = (stateEntry, primaryActionKey) => {
  const relatedKeys = ["payment", "forms", "agency", "salesTax", "businessTax", "notice"].filter((actionKey) => actionKey !== primaryActionKey);
  return relatedKeys
    .map((actionKey) => createStateActionResource(stateEntry, actionKey, { silent: true }))
    .filter((resource) => !resource.isFallback || resource.isAgency)
    .slice(0, 5);
};

const getFederalActionResources = (query, actionKey) =>
  (Array.isArray(window.federalTaxActions) ? window.federalTaxActions : [])
    .map((item) => ({ resource: createFederalActionResource(item), score: getFederalActionScore(item, query, actionKey) }))
    .filter((item) => item.score > -1)
    .sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title))
    .map((item) => item.resource);

const matchesActionFilter = (resource, activeFilter) => {
  if (activeFilter === "all") return true;
  if (activeFilter === "Federal") return !resource.state;
  if (activeFilter === "State") return Boolean(resource.state);
  return resource.category === activeFilter;
};

const normalizeFormKey = (value) => applySearchCorrections(value).replace(/\bform\b/g, "").replace(/\s+/g, "");

const getFormIntentText = (form) => applySearchCorrections([form.title, form.formNumber, form.category, form.answer, ...(form.keywords || [])].join(" "));

const createFederalFormResource = (form) => ({
  id: form.id,
  title: form.title,
  answer: form.answer,
  source: form.source,
  state: "",
  category: "Forms",
  action: "forms",
  actionLabel: form.category,
  formNumber: form.formNumber,
  scope: "Federal",
  url: form.url,
  buttonText: form.buttonText || "Open Official Form Page",
  related: form.related,
  matchType: "form"
});

const scoreFederalForm = (form, query) => {
  const compactQuery = normalizeFormKey(query);
  const compactForm = normalizeFormKey(form.formNumber);
  const text = getFormIntentText(form);
  let score = 0;

  if (compactForm && compactQuery === compactForm) score += 240;
  if (compactForm && compactQuery.includes(compactForm)) score += 220;
  if (text.includes(query)) score += 120;

  (form.keywords || []).forEach((keyword) => {
    const normalizedKeyword = applySearchCorrections(keyword);
    const compactKeyword = normalizeFormKey(keyword);
    if (query.includes(normalizedKeyword)) score += normalizedKeyword.split(" ").length * 28;
    if (compactKeyword && compactQuery.includes(compactKeyword)) score += 80;
  });

  getQueryTokens(query).forEach((token) => {
    if (text.split(" ").some((candidate) => isFuzzyMatch(token, candidate))) score += 5;
  });

  if (query.includes("contractor form") && form.id === "irs-form-w-9") score += 70;
  if (query.includes("nonemployee compensation") && form.id === "irs-form-1099-nec") score += 85;
  if (query.includes("payroll deadline")) score -= 200;

  return score;
};

const getBestFederalForms = (query) =>
  (Array.isArray(window.taxFormIntents) ? window.taxFormIntents : [])
    .map((form) => ({ resource: createFederalFormResource(form), score: scoreFederalForm(form, query) }))
    .filter((item) => item.score > 24)
    .sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title))
    .map((item) => item.resource);

const detectFormSubtype = (query) => {
  if (query.includes("sales tax")) return "salesTax";
  if (query.includes("withholding") || query.includes("payroll")) return "withholding";
  if (query.includes("corporate") || query.includes("corporation")) return "business";
  if (query.includes("partnership")) return "business";
  if (query.includes("business") || query.includes("company") || query.includes("llc")) return "business";
  if (query.includes("individual") || query.includes("resident") || query.includes("nonresident") || query.includes("income tax")) return "individual";
  return "general";
};

const queryHasFormIntent = (query) => {
  if (!query) return false;
  const compactQuery = normalizeFormKey(query);
  return (
    taxFormSearchTerms.some((term) => query.includes(applySearchCorrections(term)) || compactQuery.includes(normalizeFormKey(term))) ||
    getBestFederalForms(query).length > 0
  );
};

const createStateFormResource = (stateEntry, formKey = "general", exactForm = null) => {
  if (exactForm) {
    return {
      id: `${stateEntry.state.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${normalizeFormKey(exactForm.form)}`,
      title: exactForm.title,
      answer: exactForm.answer || `Use the official ${stateEntry.state} forms library for ${exactForm.form}.`,
      source: stateEntry.agencyName,
      state: stateEntry.state,
      category: "Forms",
      action: "forms",
      actionLabel: "Exact State Form",
      formNumber: exactForm.form,
      scope: "State",
      url: exactForm.url || stateEntry.forms.general.url || stateEntry.agencyUrl,
      buttonText: exactForm.buttonText || "Open Official Form Page",
      related: [{ title: stateEntry.forms.general.title, url: stateEntry.forms.general.url }],
      matchType: "form"
    };
  }

  const forms = stateEntry.forms || {};
  const form = forms[formKey] || forms.general;
  const related = Object.entries(forms)
    .filter(([key, value]) => key !== "exactForms" && key !== formKey && value?.url)
    .map(([, value]) => ({ title: value.title, url: value.url }))
    .slice(0, 4);

  return {
    id: `${stateEntry.state.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${formKey}-forms`,
    title: form.title,
    answer: form.answer,
    source: stateEntry.agencyName,
    state: stateEntry.state,
    category: "Forms",
    action: "forms",
    actionLabel: formSubtypeLabelMap[`${formKey}Forms`] || "State Forms",
    formNumber: "Forms Library",
    scope: "State",
    url: form.url || forms.general?.url || stateEntry.agencyUrl,
    buttonText: form.buttonText || "Open Official Form Page",
    related,
    matchType: "form"
  };
};

const findExactStateForm = (stateEntry, query) => {
  const compactQuery = normalizeFormKey(query);
  return (stateEntry.forms?.exactForms || []).find((exactForm) => {
    const candidates = [exactForm.form, exactForm.title, ...(exactForm.keywords || [])];
    return candidates.some((candidate) => {
      const normalized = applySearchCorrections(candidate);
      const compact = normalizeFormKey(candidate);
      return query.includes(normalized) || (compact && compactQuery.includes(compact));
    });
  });
};

const resolveFormResults = (query, stateEntry) => {
  const hasFormIntent = queryHasFormIntent(query);
  const federalForms = getBestFederalForms(query);

  if (stateEntry && hasFormIntent) {
    const exactStateForm = findExactStateForm(stateEntry, query);
    if (exactStateForm) {
      const primary = createStateFormResource(stateEntry, "general", exactStateForm);
      const related = [createStateFormResource(stateEntry, detectFormSubtype(query)), createStateFormResource(stateEntry, "general"), ...federalForms.slice(0, 2)].filter(
        (resource, index, list) => resource.id !== primary.id && list.findIndex((item) => item.id === resource.id) === index
      );
      return { primary, related };
    }

    const subtype = detectFormSubtype(query);
    const primary = createStateFormResource(stateEntry, subtype);
    const related = [createStateFormResource(stateEntry, "general"), ...federalForms.slice(0, 2), createStateActionResource(stateEntry, "agency", { silent: true })].filter(
      (resource, index, list) => resource.id !== primary.id && list.findIndex((item) => item.id === resource.id) === index
    );
    return { primary, related };
  }

  if (federalForms.length) {
    return { primary: federalForms[0], related: federalForms.slice(1, 5) };
  }

  if (hasFormIntent) {
    const formsLibrary = (Array.isArray(window.taxFormIntents) ? window.taxFormIntents : []).find((form) => form.id === "irs-forms-instructions");
    if (formsLibrary) return { primary: createFederalFormResource(formsLibrary), related: federalForms.slice(0, 4) };
  }

  return null;
};

const matchesAnyPhrase = (query, phrases) =>
  phrases.some((phrase) => {
    const normalizedPhrase = applySearchCorrections(phrase);
    if (!normalizedPhrase) return false;
    if (normalizedPhrase.includes(" ")) return query.includes(normalizedPhrase);
    return ` ${query} `.includes(` ${normalizedPhrase} `);
  });

const compactFormNumbers = [
  "1040",
  "1040x",
  "1040sr",
  "1040nr",
  "1041",
  "1120",
  "1120s",
  "1065",
  "990",
  "941",
  "944",
  "w2",
  "w3",
  "w4",
  "w9",
  "1099",
  "1099nec",
  "1099misc",
  "2553",
  "2848",
  "8821",
  "7004",
  "4868",
  "5472",
  "8832",
  "8804",
  "8805",
  "it201",
  "it203",
  "nj1040",
  "ca540",
  "fincen114"
];

const refundIntentPhrases = ["refund", "refunf", "where is my refund", "check refund", "refund status", "where refund"];
const paymentIntentPhrases = ["pay", "payment", "paymnt", "tax bill", "balance due", "direct pay", "eftps", "estimated tax", "pay tax", "pay taxes", "irs payment", "pay federal tax", "make payment", "business tax payment"];
const infoIntentPhrases = [
  "info",
  "information",
  "guide",
  "help",
  "account",
  "online account",
  "tax account",
  "transcript",
  "get transcript",
  "ip pin",
  "identity protection pin",
  "withholding estimator",
  "identity verification",
  "deadline",
  "notice",
  "letter",
  "sales tax",
  "payroll",
  "business tax",
  "fbar",
  "foreign owned",
  "s corp info",
  "partnership info",
  "corporation info",
  "what is"
];
const clearFormIntentPhrases = [
  "form",
  "forms",
  "poa",
  "schedule",
  "instructions",
  "election",
  "extension",
  "amended return",
  "authorization",
  "power of attorney",
  "authorize accountant",
  "personal extension",
  "business extension",
  "partnership return",
  "s corp return",
  "s corporation return",
  "corporation return",
  "quarterly payroll return",
  "annual payroll return",
  "employee withholding",
  "contractor form",
  "nonemployee compensation",
  "foreign owned llc reporting",
  "foreign owned us entity reporting",
  "form 114",
  "fincen 114"
];

const hasExactFormNumberIntent = (query) => {
  const compactQuery = normalizeFormKey(query);
  return compactFormNumbers.some((formNumber) => compactQuery === formNumber || compactQuery.includes(formNumber));
};

const hasClearFormIntent = (query) => {
  if (!query) return false;
  if (hasExactFormNumberIntent(query)) return true;
  if (matchesAnyPhrase(query, clearFormIntentPhrases)) return true;
  if (query.includes("foreign owned") && query.includes("reporting")) return true;
  return false;
};

const detectSimpleTaxIntent = (query, activeFilter = "all") => {
  if (!query && activeFilter === "Forms") return "forms";
  if (matchesAnyPhrase(query, refundIntentPhrases)) return "refund";
  if (matchesAnyPhrase(query, paymentIntentPhrases)) return "payment";
  if (query.includes("what is poa")) return "info";
  if (hasClearFormIntent(query)) return "forms";
  if (matchesAnyPhrase(query, infoIntentPhrases)) return "info";
  if (activeFilter === "Forms") return "forms";
  if (activeFilter === "Refunds") return "refund";
  if (activeFilter === "Payments") return "payment";
  if (["Notices / POA", "Payroll", "Sales Tax", "Business Tax", "FBAR / Foreign Accounts"].includes(activeFilter)) return "info";
  return "";
};

const detectInfoActionKey = (query, activeFilter = "all") => {
  if (matchesAnyPhrase(query, ["account", "online account", "tax account", "irs account", "transcript", "get transcript", "tax record", "ip pin", "identity protection pin", "withholding estimator", "identity verification"])) return "account";
  if (activeFilter === "Notices / POA" || matchesAnyPhrase(query, ["notice", "notic", "letter", "irs letter", "state notice", "cp2000"])) return "notice";
  if (activeFilter === "Payroll" || matchesAnyPhrase(query, ["payroll", "payrol", "employment tax", "withholding", "941 due date", "payroll deadline", "payroll due date"])) return "payroll";
  if (activeFilter === "Sales Tax" || query.includes("sales tax")) return "salesTax";
  if (activeFilter === "FBAR / Foreign Accounts" || matchesAnyPhrase(query, ["fbar", "foreign bank", "foreign account", "fincen"])) return "fbar";
  if (activeFilter === "Business Tax" || matchesAnyPhrase(query, ["business tax", "foreign owned", "s corp", "partnership", "corporation", "company tax", "llc"])) return "businessTax";
  if (matchesAnyPhrase(query, ["poa", "what is poa"])) return "poa";
  if (matchesAnyPhrase(query, ["ein", "tax id", "employer identification"])) return "ein";
  return "businessTax";
};

const taxHelpSearchResourceKeys = ["refund", "payment", "forms", "salesTax", "businessTax", "payroll", "notice", "agency"];

const normalizeTaxHelpResource = (resource) => ({
  id: resource.id,
  title: resource.title,
  answer: resource.answer,
  source: resource.source,
  state: resource.state || "",
  category: resource.category || stateActionCategoryMap[resource.action] || "Federal",
  action: resource.action || resource.intent || "",
  actionLabel: resource.actionLabel || stateActionLabelMap[resource.action] || resource.category || "",
  url: resource.url,
  buttonText: resource.buttonText || resource.buttonLabel,
  keywords: resource.keywords || [],
  relatedCategories: resource.relatedCategories || [],
  formNumber: resource.formNumber,
  matchType: resource.matchType
});

const getStateActionSearchResources = () =>
  (Array.isArray(window.stateTaxActions) ? window.stateTaxActions : []).flatMap((stateEntry) =>
    taxHelpSearchResourceKeys
      .map((actionKey) => createStateActionResource(stateEntry, actionKey, { silent: true }))
      .filter((resource) => resource.url && (!resource.isFallback || resource.isAgency))
  );

const getAllTaxHelpSearchResources = () => {
  const federalActions = (Array.isArray(window.federalTaxActions) ? window.federalTaxActions : []).map(createFederalActionResource);
  const legacyResources = (Array.isArray(window.taxHelpResources) ? window.taxHelpResources : []).map(normalizeTaxHelpResource);
  const stateResources = getStateActionSearchResources();
  const map = new Map();

  [...federalActions, ...legacyResources, ...stateResources].filter((resource) => resource?.url && resource.title).forEach((resource) => {
    const key = resource.id || `${resource.title}|${resource.url}`;
    map.set(key, { ...(map.get(key) || {}), ...resource });
  });

  return Array.from(map.values());
};

const getTaxHelpSearchText = (resource) =>
  applySearchCorrections(
    [
      resource.title,
      resource.answer,
      resource.source,
      resource.state,
      resource.category,
      resource.action,
      resource.actionLabel,
      resource.formNumber,
      resource.url,
      ...(resource.keywords || []),
      ...(resource.relatedCategories || [])
    ].join(" ")
  );

const scoreGenericTaxHelpResource = (resource, query, selectedState, activeFilter, actionKey) => {
  if (!matchesActionFilter(resource, activeFilter)) return -1;

  const text = getTaxHelpSearchText(resource);
  const title = applySearchCorrections(resource.title);
  const source = applySearchCorrections(resource.source);
  const compactQuery = normalizeFormKey(query);
  const compactText = normalizeFormKey(text);
  const tokens = getQueryTokens(query);
  let score = 0;

  if (text.includes(query)) score += 110;
  if (title.includes(query)) score += 90;
  if (source.includes(query)) score += 45;
  if (compactQuery && compactText.includes(compactQuery)) score += 72;

  tokens.forEach((token) => {
    if (` ${text} `.includes(` ${token} `)) {
      score += 18;
    } else if (text.split(" ").some((candidate) => isFuzzyMatch(token, candidate))) {
      score += 8;
    }
  });

  if (actionKey && resource.action === actionKey) score += 55;
  if (actionKey && getResourceCategories(resource).includes(stateActionCategoryMap[actionKey])) score += 38;
  if (selectedState !== "all" && resource.state === selectedState) score += 75;
  if (selectedState !== "all" && resource.state && resource.state !== selectedState) score -= 65;
  if (resource.state && query.includes(applySearchCorrections(resource.state))) score += 70;
  if (query.includes("irs") && source.includes("irs")) score += 65;
  if (query.includes("eftps") && resource.id === "eftps") score += 95;
  if (query.includes("transcript") && resource.id === "irs-get-transcript") score += 100;
  if (query.includes("account") && ["irs-online-account", "irs-business-tax-account"].includes(resource.id)) score += 75;
  if (query.includes("w 9") && resource.id === "irs-form-w-9") score += 100;
  if (query.includes("2848") && resource.id === "irs-form-2848") score += 100;
  if (query.includes("poa") && resource.id === "irs-form-2848") score += 90;
  if (query.includes("ein") && resource.id === "irs-ein") score += 100;

  return score;
};

const resolveGenericTaxActionResults = (query, selectedState = "all", activeFilter = "all", actionKey = "") => {
  if (!query) return null;

  const scoredResources = getAllTaxHelpSearchResources()
    .map((resource) => ({ resource, score: scoreGenericTaxHelpResource(resource, query, selectedState, activeFilter, actionKey) }))
    .filter((item) => item.score >= Math.max(24, getQueryTokens(query).length * 12))
    .sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title))
    .map((item) => item.resource);

  if (!scoredResources.length) return null;
  return {
    primary: scoredResources[0],
    related: scoredResources.slice(1, 8)
  };
};

const getDefaultFederalFormResource = () => {
  const formsLibrary = (Array.isArray(window.taxFormIntents) ? window.taxFormIntents : []).find((form) => form.id === "irs-forms-instructions");
  return formsLibrary ? createFederalFormResource(formsLibrary) : null;
};

const resolveTaxActionResults = (rawInput, selectedState = "all", activeFilter = "all", options = {}) => {
  const rawQuery = normalizeText(rawInput);
  const query = applySearchCorrections(rawQuery);
  const stateEntry = detectActionState(query, selectedState);
  const simpleIntent = detectSimpleTaxIntent(query, activeFilter);
  const actionKey =
    simpleIntent === "info"
      ? detectInfoActionKey(query, activeFilter)
      : simpleIntent || detectTaxAction(query) || (activeFilter !== "all" ? (categoryFilterToActionKeys[activeFilter] || [])[0] : "");
  const defaultFederalIds = ["irs-direct-pay", "irs-refund", "irs-notice", "irs-poa", "irs-fbar", "irs-ein", "irs-forms"];
  let primary = null;
  let related = [];

  if (simpleIntent === "forms") {
    const formResultSet = resolveFormResults(query || "forms", stateEntry);
    if (formResultSet?.primary) return { ...formResultSet, query, stateEntry, actionKey: "forms" };
    primary = getDefaultFederalFormResource();
    related = [];
  } else if (stateEntry && ["payroll", "account"].includes(actionKey)) {
    const genericResultSet = resolveGenericTaxActionResults(query, selectedState, activeFilter, actionKey);
    primary = genericResultSet?.primary || null;
    related = genericResultSet?.related || [];
  } else if (stateEntry && stateActionKeys.includes(actionKey)) {
    primary = createStateActionResource(stateEntry, actionKey, options);
    related = [...getRelatedStateActions(stateEntry, actionKey), ...getFederalActionResources(query, actionKey).slice(0, 2)];
  } else if (stateEntry && (!actionKey || actionKey === "stateAgency")) {
    primary = createStateActionResource(stateEntry, "agency", options);
    related = getRelatedStateActions(stateEntry, "agency");
  } else if (actionKey) {
    const federalResources = getFederalActionResources(query, actionKey);
    primary = federalResources[0] || null;
    related = federalResources.slice(1, 6);
  } else if (!query && selectedState !== "all" && stateEntry) {
    primary = createStateActionResource(stateEntry, "agency", options);
    related = getRelatedStateActions(stateEntry, "agency");
  } else if (!query) {
    const federalDefaults = (Array.isArray(window.federalTaxActions) ? window.federalTaxActions : [])
      .filter((item) => defaultFederalIds.includes(item.id))
      .map(createFederalActionResource);
    primary = federalDefaults[0] || null;
    related = federalDefaults.slice(1);
  }

  if (!primary && query) {
    const genericResultSet = resolveGenericTaxActionResults(query, selectedState, activeFilter, actionKey);
    primary = genericResultSet?.primary || null;
    related = genericResultSet?.related || [];
  }

  if (primary && !matchesActionFilter(primary, activeFilter)) {
    const filteredRelated = related.filter((resource) => matchesActionFilter(resource, activeFilter));
    primary = filteredRelated[0] || null;
    related = filteredRelated.slice(1);
  } else {
    related = related.filter((resource) => !primary || resource.id !== primary.id).filter((resource) => matchesActionFilter(resource, activeFilter));
  }

  return { primary, related, query, stateEntry, actionKey };
};

const taxHelpFinderTests = [
  ["nj refund", "Check New Jersey Refund Status"],
  ["check my refund nys", "Check New York State Refund Status"],
  ["where is my refund", "IRS Where's My Refund"],
  ["irs refund", "IRS Where's My Refund"],
  ["ca refund", "Check California Refund Status"],
  ["ny refund", "Check New York State Refund Status"],
  ["nys refund", "Check New York State Refund Status"],
  ["pay ny tax", "Pay New York State Taxes"],
  ["california pay tax", "Pay California Taxes"],
  ["nj payment", "Pay New Jersey Taxes"],
  ["ca payment", "Pay California Taxes"],
  ["pay irs", "IRS Direct Pay"],
  ["irs notice", "Understand an IRS Notice or Letter"],
  ["poa", "IRS Form 2848, Power of Attorney and Declaration of Representative"],
  ["what is poa", "IRS Power of Attorney, Form 2848"],
  ["fbar", "IRS FBAR Guidance"],
  ["payroll deadline", "IRS Employment Tax Due Dates"],
  ["texas sales tax", "Texas Sales Tax"],
  ["fl business tax", "Florida Business Tax"],
  ["s corp election", "IRS Form 2553, Election by a Small Business Corporation"],
  ["I want to do a S corp election", "IRS Form 2553, Election by a Small Business Corporation"],
  ["power of attorney", "IRS Form 2848, Power of Attorney and Declaration of Representative"],
  ["authorize accountant", "IRS Form 2848, Power of Attorney and Declaration of Representative"],
  ["business extension", "IRS Form 7004, Business Extension"],
  ["personal extension", "IRS Form 4868, Application for Automatic Extension of Time"],
  ["foreign owned llc", "IRS Form 5472, Foreign-Owned U.S. Entity Reporting"],
  ["partnership return", "IRS Form 1065, U.S. Return of Partnership Income"],
  ["s corp return", "IRS Form 1120-S, U.S. Income Tax Return for an S Corporation"],
  ["corporation return", "IRS Form 1120, U.S. Corporation Income Tax Return"],
  ["quarterly payroll return", "IRS Form 941, Employer's Quarterly Federal Tax Return"],
  ["employee withholding", "IRS Form W-4, Employee's Withholding Certificate"],
  ["contractor form", "IRS Form W-9, Request for Taxpayer Identification Number"],
  ["1040", "IRS Form 1040, U.S. Individual Income Tax Return"],
  ["payroll form 941", "IRS Form 941, Employer's Quarterly Federal Tax Return"],
  ["foreign owned llc", "IRS Foreign-Owned U.S. Entity Reporting Information"],
  ["foreign owned llc reporting", "IRS Form 5472, Foreign-Owned U.S. Entity Reporting"],
  ["ny it 201", "New York Form IT-201"],
  ["nj 1040", "New Jersey Form NJ-1040"],
  ["ca 540", "California Form 540"],
  ["nj forms", "New Jersey Tax Forms"],
  ["irs", "Check Federal IRS Refund Status"],
  ["payment", "IRS Make a Payment"],
  ["notice", "IRS Notices and Letters"],
  ["w9", "IRS Form W-9, Request for Taxpayer Identification Number"],
  ["w-9", "IRS Form W-9, Request for Taxpayer Identification Number"],
  ["2848", "IRS Form 2848, Power of Attorney and Declaration of Representative"],
  ["ein", "Apply for an EIN"],
  ["transcript", "IRS Get Transcript"],
  ["ny refund", "Check New York State Refund Status"],
  ["nj payment", "Pay New Jersey Taxes"],
  ["sales tax", "California Sales Tax"]
];

window.runTaxHelpFinderTests = () => {
  taxHelpFinderTests.forEach(([query, expected]) => {
    const result = resolveTaxActionResults(query, "all", "all", { silent: true });
    const actual = result.primary ? result.primary.title : "No result";
    if (actual !== expected) {
      console.warn(`Tax Help Finder test failed: ${query} expected ${expected} but got ${actual}.`);
    }
  });
};

if (taxHelpFinder) {
  const taxHelpSearch = taxHelpFinder.querySelector("#tax-help-search");
  const taxHelpState = taxHelpFinder.querySelector("#tax-help-state");
  const taxHelpResults = taxHelpFinder.querySelector(".tax-help-results");
  const taxHelpPrimary = taxHelpFinder.querySelector("[data-tax-help-primary]");
  const taxHelpRelated = taxHelpFinder.querySelector("[data-tax-help-related]");
  const taxHelpHeading = taxHelpFinder.querySelector("[data-tax-help-heading]");
  const taxHelpRelatedHeading = taxHelpFinder.querySelector("[data-tax-help-related-heading]");
  const taxHelpEmpty = taxHelpFinder.querySelector("[data-tax-help-empty]");
  const taxHelpFilterButtons = taxHelpFinder.querySelectorAll("[data-tax-help-filter]");
  const taxHelpTopicButtons = taxHelpFinder.querySelectorAll("[data-tax-help-topic]");
  let activeTaxHelpFilter = "all";

  const positionTaxHelpResults = () => {
    if (!taxHelpResults || !taxHelpSearch) return;
    const anchor = taxHelpSearch.closest(".tax-help-search-field") || taxHelpSearch;
    const rect = anchor.getBoundingClientRect();
    const viewport = window.visualViewport;
    const viewportLeft = viewport ? viewport.offsetLeft : 0;
    const viewportTop = viewport ? viewport.offsetTop : 0;
    const viewportWidth = Math.min(
      viewport ? viewport.width : Number.POSITIVE_INFINITY,
      window.innerWidth || Number.POSITIVE_INFINITY,
      document.documentElement.clientWidth || Number.POSITIVE_INFINITY
    );
    const viewportHeight = Math.min(
      viewport ? viewport.height : Number.POSITIVE_INFINITY,
      window.innerHeight || Number.POSITIVE_INFINITY,
      document.documentElement.clientHeight || Number.POSITIVE_INFINITY
    );
    const gutter = 14;
    const left = Math.max(gutter + viewportLeft, rect.left + viewportLeft);
    const width = Math.min(rect.width, viewportWidth - gutter * 2);
    const viewportBottom = viewportTop + viewportHeight;
    const anchorTop = rect.top + viewportTop;
    const anchorBottom = rect.bottom + viewportTop;
    let top = anchorBottom + 10;
    let maxHeight = viewportBottom - top - gutter;

    if (rect.top < gutter || rect.bottom > viewportHeight - gutter) {
      top = viewportTop + gutter;
      maxHeight = viewportHeight - gutter * 2;
    } else if (maxHeight < 240 && anchorTop - viewportTop > maxHeight) {
      maxHeight = Math.min(620, anchorTop - viewportTop - gutter * 2);
      top = Math.max(viewportTop + gutter, anchorTop - maxHeight - 10);
    }

    maxHeight = Math.max(180, Math.min(620, maxHeight));

    taxHelpResults.style.setProperty("--tax-help-popup-left", `${left}px`);
    taxHelpResults.style.setProperty("--tax-help-popup-top", `${Math.max(gutter + viewportTop, top)}px`);
    taxHelpResults.style.setProperty("--tax-help-popup-width", `${width}px`);
    taxHelpResults.style.setProperty("--tax-help-popup-max-height", `${maxHeight}px`);
  };

  const closeTaxHelpResults = () => {
    if (taxHelpResults) {
      taxHelpResults.hidden = true;
      taxHelpResults.classList.remove("is-open", "visible");
    }
    if (taxHelpSearch) taxHelpSearch.setAttribute("aria-expanded", "false");
    taxHelpFinder.classList.remove("tax-help-popup-open");
  };

  const openTaxHelpResults = () => {
    if (taxHelpResults) {
      positionTaxHelpResults();
      taxHelpResults.hidden = false;
      taxHelpResults.classList.add("is-open", "visible");
    }
    if (taxHelpSearch) taxHelpSearch.setAttribute("aria-expanded", "true");
    taxHelpFinder.classList.add("tax-help-popup-open");
  };

  const renderTaxHelpResults = () => {
    const rawQuery = taxHelpSearch ? taxHelpSearch.value : "";
    const selectedState = taxHelpState ? taxHelpState.value : "all";
    const hasSearch = Boolean(applySearchCorrections(rawQuery).trim());

    taxHelpPrimary.replaceChildren();
    taxHelpRelated.replaceChildren();
    taxHelpHeading.textContent = "";
    taxHelpRelatedHeading.textContent = "";
    taxHelpEmpty.hidden = true;

    if (!hasSearch) {
      closeTaxHelpResults();
      return;
    }

    const resultSet = resolveTaxActionResults(rawQuery, selectedState, activeTaxHelpFilter);
    openTaxHelpResults();

    if (!resultSet.primary) {
      taxHelpEmpty.textContent = "No matching official tax actions found. Try searching \"IRS payment,\" \"refund,\" \"notice,\" \"W-9,\" or \"EIN.\"";
      taxHelpEmpty.hidden = false;
      return;
    }

    const compactResults = [resultSet.primary, ...resultSet.related].filter(
      (resource, index, list) => resource && list.findIndex((item) => item.id === resource.id) === index
    );

    taxHelpPrimary.replaceChildren(...compactResults.map((resource) => createTaxHelpResultItem(resource)));
  };

  const setTaxHelpFilter = (nextFilter) => {
    activeTaxHelpFilter = nextFilter;
    taxHelpFilterButtons.forEach((button) => {
      button.classList.toggle("is-active", (button.dataset.taxHelpFilter || "all") === activeTaxHelpFilter);
    });
    renderTaxHelpResults();
  };

  taxHelpFilterButtons.forEach((button) => {
    button.addEventListener("click", () => setTaxHelpFilter(button.dataset.taxHelpFilter || "all"));
  });

  taxHelpTopicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (taxHelpSearch) {
        taxHelpSearch.value = button.dataset.taxHelpTopic || "";
      }
      setTaxHelpFilter("all");
    });
  });

  if (taxHelpSearch) taxHelpSearch.addEventListener("input", renderTaxHelpResults);
  if (taxHelpSearch) {
    taxHelpSearch.addEventListener("focus", () => {
      if (applySearchCorrections(taxHelpSearch.value).trim()) renderTaxHelpResults();
    });
    taxHelpSearch.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeTaxHelpResults();
    });
  }
  if (taxHelpState) taxHelpState.addEventListener("change", renderTaxHelpResults);
  window.addEventListener("resize", () => {
    if (taxHelpResults && !taxHelpResults.hidden) positionTaxHelpResults();
  });
  window.addEventListener(
    "scroll",
    () => {
      if (taxHelpResults && !taxHelpResults.hidden) positionTaxHelpResults();
    },
    { passive: true }
  );

  document.addEventListener("click", (event) => {
    if (!taxHelpFinder.contains(event.target)) closeTaxHelpResults();
  });

  renderTaxHelpResults();
  window.runTaxHelpFinderTests();
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sensitivePattern = /\b(\d{3}-?\d{2}-?\d{4}|ssn|social security|bank account|bank information|routing number|w-?2|1099|passport|tax return|tax document|tax form|driver'?s license)\b/i;

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const fullText = [...formData.values()].join(" ");

    if (!name || !email || !service || !message) {
      formStatus.textContent = "Please complete the required fields before submitting.";
      formStatus.className = "form-status error";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.className = "form-status error";
      return;
    }

    if (sensitivePattern.test(fullText)) {
      formStatus.textContent = "Please remove sensitive tax, identity, or banking details before submitting this form.";
      formStatus.className = "form-status error";
      return;
    }

    formStatus.textContent = "Sending...";
    formStatus.className = "form-status sending";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent = "Thank you. Your message has been sent successfully.";
        formStatus.className = "form-status success";
        contactForm.reset();
      } else {
        formStatus.textContent = "Sorry, there was a problem sending your message. Please try again or email rakesh@taxplanners.pro.";
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent = "Sorry, there was a problem sending your message. Please try again or email rakesh@taxplanners.pro.";
      formStatus.className = "form-status error";
    }
  });
}
