const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const mobileMenuPanel = mobileMenu?.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector("#mobile-menu-close");
const mobileMenuOverlay = mobileMenu?.querySelector(".mobile-menu-overlay");
const mobileMenuLinks = [...document.querySelectorAll("[data-menu-link]")];
const languageToggle = document.querySelector("#language-toggle");
const languageToggleLabel = document.querySelector("#language-toggle-label");
const mobileLanguageToggle = document.querySelector("#mobile-language-toggle");
const mobileLanguageLabel = document.querySelector("#mobile-language-label");
const backToTopButton = document.querySelector("#back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectCards = document.querySelectorAll("[data-project-id]");
const projectFilterButtons = [...document.querySelectorAll("[data-project-filter]")];
const projectResultsStatus = document.querySelector("#project-results-status");
const projectDetailsButtons = document.querySelectorAll("[data-project-details]");
const projectModal = document.querySelector("#project-modal");
const projectModalClose = document.querySelector("#project-modal-close");
const projectModalImage = document.querySelector("#project-modal-image");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalDescription = document.querySelector("#project-modal-description");
const projectModalTechnologies = document.querySelector("#project-modal-technologies");
const projectModalFeatures = document.querySelector("#project-modal-features");
const projectModalArchitecture = document.querySelector("#project-modal-architecture");
const projectModalLayers = document.querySelector("#project-modal-layers");
const projectModalGithub = document.querySelector("#project-modal-github");
const projectModalYoutube = document.querySelector("#project-modal-youtube");
const projectModalYoutubeLabel = projectModalYoutube?.querySelector("[data-i18n='projects.watchYoutube']");
const copyEmailButton = document.querySelector("#copy-email");
const contactEmail = document.querySelector("#contact-email");
const copyEmailIcon = document.querySelector(".copy-email-icon");
const copySuccessIcon = document.querySelector(".copy-success-icon");
const copyEmailFeedback = document.querySelector("#copy-email-feedback");
const pageDescription = document.querySelector('meta[name="description"]');
const localeCatalog = window.portfolioTranslations;
const lockedBodyStyles = {};
const projects = [
  {
    id: "project-one",
    title: "Student Management System",
    titleKey: "project.one.title",
    description:
      "Student Management System is a Windows desktop application built with C# and Windows Forms. It allows users to manage student records and their course grades, search for students, calculate average grades, and save data locally in an Excel workbook.",
    technologies: ["C#", ".NET 10 for Windows", "Windows Forms", "ClosedXML 0.104.2", "Excel (.xlsx)"],
    categories: ["desktop-applications"],
    features: [
      "Add, edit, and delete student records.",
      "Search students by student ID, full name, or major.",
      "Manage course grades for each student.",
      "Validate required student fields and enforce unique student IDs when adding students.",
      "Validate grades within the range of 0–100.",
      "Calculate and display each student's average grade.",
      "Save and load student and grade data from a local Excel workbook.",
      "Display validation, loading, and saving error messages.",
    ],
    image: "./assets/images/student-management-system-dashboard-card.webp",
    detailImage: "./assets/images/student-management-system-dashboard-detail.webp",
    imageWidth: 768,
    imageHeight: 432,
    imageAltKey: "project.image.one",
    githubUrl: "https://github.com/azher-devs/Student-Management-System",
    youtubeUrl: "https://youtu.be/9AqC1JDK598?si=rj4etM1C9XWKPT0w",
  },
  {
    id: "project-two",
    title: "ITSM Device Registration System",
    titleKey: "project.two.title",
    description:
      "A Flutter mobile application for registering employee devices, verifying assignments, scanning barcodes, and managing device assignments through a simple workflow.",
    technologies: ["Flutter", "Dart", "Riverpod", "Dio", "Google ML Kit Barcode Scanning", "Shared Preferences", "Flutter Localization", "Image Picker", "Permission Handler", "Audio Players"],
    categories: ["mobile-applications"],
    features: [
      "Login and device registration workflow.",
      "Device lookup using Tag Number.",
      "Employee verification using Employee ID.",
      "Display device and employee details after validation.",
      "Barcode scanning using the camera and Google ML Kit.",
      "Add and remove device assignments.",
      "English and Arabic localization.",
      "Light and Dark themes.",
      "Persisted language and appearance preferences.",
      "Demo mode for reviewing the UI without a backend.",
    ],
    image: "./assets/images/itsm-device-registration-showcase-card.webp",
    detailImage: "./assets/images/itsm-device-registration-showcase-detail.webp",
    imageWidth: 768,
    imageHeight: 432,
    imageAltKey: "project.image.two",
    githubUrl: "https://github.com/azher-devs/itsm-device-registration-system",
    youtubeUrl: "https://youtube.com/shorts/YnAZRDnqSNs?si=NSnE66X8hRv67TOJ",
  },
  {
    id: "project-three",
    title: "Habit Tracker",
    titleKey: "project.three.title",
    description:
      "An offline Flutter app for tracking daily habits and goals, with monthly calendars, detailed statistics, daily notes, and local backup and restore.",
    technologies: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "GoRouter", "Flutter Quill", "FL Chart", "Archive", "File Picker", "Path Provider", "UUID", "Intl", "Flutter Localization"],
    categories: ["mobile-applications"],
    features: [
      "Create, edit, organize, archive, and restore goal folders.",
      "Track daily progress using a monthly calendar.",
      "Mark days as completed or missed.",
      "Add rich-text daily notes.",
      "View monthly completion rates and current/longest streaks.",
      "Review weekly and monthly statistics.",
      "Compare performance with the previous month.",
      "Back up and restore local data using ZIP files.",
      "Switch between Arabic and English.",
      "Choose light or dark appearance.",
      "Store data locally without requiring an account or backend.",
    ],
    image: "./assets/images/habit-tracker-showcase-card.webp",
    detailImage: "./assets/images/habit-tracker-showcase-detail.webp",
    imageWidth: 768,
    imageHeight: 432,
    imageAltKey: "project.image.three",
    githubUrl: "https://github.com/azher-devs/habit-tracker",
    youtubeUrl: "https://youtube.com/shorts/Q9aArNgEMTI?si=yFn2S4T1EVMBL-Lm",
  },
  {
    id: "project-four",
    isVisible: false,
    title: "Project 4",
    titleKey: "project.four.title",
    description: "A sample web application designed to simplify everyday tasks through a clean and user-friendly interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    categories: ["web-development"],
    features: ["Placeholder example: organize everyday tasks.", "Placeholder example: review and update task information.", "Replace these examples with verified project features."],
    image: "./assets/images/project-commerce-placeholder.svg",
    imageAltKey: "project.image.four",
    githubUrl: "https://github.com/REPLACE_WITH_PROJECT_4_REPOSITORY",
    youtubeUrl: "", // TODO: Add this project's YouTube video URL.
  },
  {
    id: "project-five",
    isVisible: false,
    title: "Project 5",
    titleKey: "project.five.title",
    description: "A sample desktop application for organizing information, managing records, and improving productivity.",
    technologies: ["C#", ".NET", "SQL Server"],
    categories: ["desktop-applications"],
    features: ["Placeholder example: organize information and records.", "Placeholder example: browse and update stored records.", "Replace these examples with verified project features."],
    image: "./assets/images/project-dashboard-placeholder.svg",
    imageAltKey: "project.image.five",
    githubUrl: "https://github.com/REPLACE_WITH_PROJECT_5_REPOSITORY",
    youtubeUrl: "", // TODO: Add this project's YouTube video URL.
  },
  {
    id: "project-six",
    isVisible: false,
    title: "Project 6",
    titleKey: "project.six.title",
    description: "A sample mobile application for tracking activities, viewing progress, and managing personal goals.",
    technologies: ["Flutter", "Dart", "SQLite"],
    categories: ["mobile-applications"],
    features: ["Placeholder example: track personal activities.", "Placeholder example: review progress toward goals.", "Replace these examples with verified project features."],
    image: "./assets/images/project-mobile-placeholder.svg",
    imageAltKey: "project.image.six",
    githubUrl: "https://github.com/REPLACE_WITH_PROJECT_6_REPOSITORY",
    youtubeUrl: "", // TODO: Add this project's YouTube video URL.
  },
];
let lastFocusedElement = null;
let lockedScrollY = 0;
let activeProjectId = null;
let activeProjectCategory = "all";
let copyEmailFeedbackTimeout = null;
let mobileMenuCloseTimeout = null;
let mobileMenuOpenFrame = null;

function getSavedLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    return savedLanguage === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

let currentLanguage = getSavedLanguage();

function translate(key) {
  return localeCatalog[currentLanguage].strings[key] || key;
}

function updateProjectResults({ animate = false } = {}) {
  let visibleCount = 0;
  const totalCount = projects.filter((project) => project.isVisible !== false).length;

  projectCards.forEach((card) => {
    const project = projects.find((item) => item.id === card.dataset.projectId);
    if (!project) return;

    const categoryMatches = project.isVisible !== false &&
      (activeProjectCategory === "all" || project.categories?.includes(activeProjectCategory));

    const wasHidden = card.hidden;
    card.hidden = !categoryMatches;
    card.inert = !categoryMatches;

    if (categoryMatches) {
      card.removeAttribute("aria-hidden");

      if (animate && !prefersReducedMotion.matches && wasHidden) {
        card.classList.add("is-filtering-in");
        card.getBoundingClientRect();
        card.classList.remove("is-filtering-in");
      } else {
        card.classList.remove("is-filtering-in");
      }
    } else {
      card.setAttribute("aria-hidden", "true");
      card.classList.remove("is-filtering-in");
    }

    if (categoryMatches) visibleCount += 1;
  });

  projectResultsStatus.textContent = translate("projects.results")
    .replace("{visibleCount}", String(visibleCount))
    .replace("{totalCount}", String(totalCount));
  projectResultsStatus.classList.toggle("is-empty", visibleCount === 0);
}

function resetCopyEmailFeedback() {
  copyEmailFeedbackTimeout = null;
  if (!copyEmailButton || !copyEmailFeedback) return;

  copyEmailButton.dataset.copyState = "";
  copyEmailButton.setAttribute("aria-label", translate("contact.copyEmail"));
  copyEmailButton.title = translate("contact.copyEmail");
  copyEmailIcon.hidden = false;
  copySuccessIcon.hidden = true;
  copyEmailFeedback.textContent = "";
  copyEmailFeedback.hidden = true;
}

function showCopyEmailFeedback(state) {
  if (!copyEmailButton || !copyEmailFeedback) return;

  window.clearTimeout(copyEmailFeedbackTimeout);
  copyEmailButton.dataset.copyState = state;
  const messageKey = state === "success" ? "contact.copied" : "contact.copyFailed";
  const message = translate(messageKey);
  copyEmailButton.setAttribute("aria-label", message);
  copyEmailButton.title = message;
  copyEmailIcon.hidden = state === "success";
  copySuccessIcon.hidden = state !== "success";
  copyEmailFeedback.textContent = message;
  copyEmailFeedback.hidden = false;
  copyEmailFeedbackTimeout = window.setTimeout(resetCopyEmailFeedback, 2000);
}

function applyLanguage(language, persist = true) {
  currentLanguage = language === "ar" ? "ar" : "en";
  const { strings } = localeCatalog[currentLanguage];
  const switchLanguageKey = currentLanguage === "en" ? "language.switchToArabic" : "language.switchToEnglish";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = strings.pageTitle;
  if (pageDescription) pageDescription.content = strings.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = translate(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = translate(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = translate(element.dataset.i18nAlt);
  });
  if (languageToggleLabel) {
    languageToggleLabel.textContent = localeCatalog[currentLanguage].languageOption;
    languageToggleLabel.lang = currentLanguage === "en" ? "ar" : "en";
  }
  languageToggle?.setAttribute("aria-label", translate(switchLanguageKey));
  if (mobileLanguageLabel) {
    mobileLanguageLabel.textContent = currentLanguage === "en" ? "EN" : "عربي";
    mobileLanguageLabel.lang = currentLanguage;
  }
  mobileLanguageToggle?.setAttribute("aria-label", translate(switchLanguageKey));
  menuToggle?.setAttribute("aria-label", translate(menuToggle.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open"));

  if (copyEmailButton?.dataset.copyState) {
    const messageKey = copyEmailButton.dataset.copyState === "success" ? "contact.copied" : "contact.copyFailed";
    const message = translate(messageKey);
    copyEmailButton.setAttribute("aria-label", message);
    copyEmailButton.title = message;
    copyEmailFeedback.textContent = message;
  }

  updateProjectResults();

  if (activeProjectId && projectModal && !projectModal.hidden) {
    const activeProject = projects.find((project) => project.id === activeProjectId);
    if (activeProject) renderProjectDetails(activeProject);
  }

  if (persist) {
    try {
      window.localStorage.setItem("portfolio-language", currentLanguage);
    } catch {
      // The language still applies for this visit when storage is unavailable.
    }
  }
}

function resetHorizontalScroll() {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
}

function lockBackgroundScroll() {
  if (document.body.dataset.scrollLocked === "true") return;

  lockedScrollY = window.scrollY;
  lockedBodyStyles.position = document.body.style.position;
  lockedBodyStyles.top = document.body.style.top;
  lockedBodyStyles.left = document.body.style.left;
  lockedBodyStyles.right = document.body.style.right;
  lockedBodyStyles.width = document.body.style.width;
  lockedBodyStyles.paddingRight = document.body.style.paddingRight;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.classList.add("overflow-hidden");
  document.body.classList.add("overflow-hidden");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  document.body.dataset.scrollLocked = "true";
}

function unlockBackgroundScroll() {
  if (document.body.dataset.scrollLocked !== "true") return;

  document.documentElement.classList.remove("overflow-hidden");
  document.body.classList.remove("overflow-hidden");
  document.body.style.position = lockedBodyStyles.position || "";
  document.body.style.top = lockedBodyStyles.top || "";
  document.body.style.left = lockedBodyStyles.left || "";
  document.body.style.right = lockedBodyStyles.right || "";
  document.body.style.width = lockedBodyStyles.width || "";
  document.body.style.paddingRight = lockedBodyStyles.paddingRight || "";
  delete document.body.dataset.scrollLocked;

  restoreLockedScrollPosition();
}

function restoreLockedScrollPosition() {
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, lockedScrollY);
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
  updateScrollProgress();
}

function restoreLastFocus() {
  if (!lastFocusedElement) return;

  try {
    lastFocusedElement.focus({ preventScroll: true });
  } catch {
    lastFocusedElement.focus();
  }

  restoreLockedScrollPosition();
}

function setModalOpen(isOpen) {
  if (projectModal) projectModal.hidden = !isOpen;
  projectModal?.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    lockBackgroundScroll();
  } else {
    unlockBackgroundScroll();
  }
}

function renderProjectDetails(project) {
  const localizedProject = localeCatalog[currentLanguage].projects[project.id];
  projectModalImage.src = project.detailImage || project.image;
  projectModalImage.width = project.detailImage ? 1200 : project.imageWidth || 640;
  projectModalImage.height = project.detailImage ? 675 : project.imageHeight || 360;
  projectModalImage.loading = "eager";
  projectModalImage.alt = project.imageAltKey ? translate(project.imageAltKey) : `${project.title} ${translate("modal.projectPreview")}`;
  projectModalTitle.textContent = project.titleKey ? translate(project.titleKey) : project.title;
  projectModalDescription.textContent = localizedProject.description;
  projectModalGithub.href = project.githubUrl;
  projectModalGithub.setAttribute("aria-label", translate("social.github"));
  projectModalYoutubeLabel.textContent = translate("projects.watchYoutube");
  const youtubeUrl = getValidYoutubeUrl(project.youtubeUrl);
  if (youtubeUrl) {
    projectModalYoutube.href = youtubeUrl;
    projectModalYoutube.target = "_blank";
    projectModalYoutube.rel = "noopener noreferrer";
    projectModalYoutube.removeAttribute("aria-disabled");
    projectModalYoutube.removeAttribute("tabindex");
    projectModalYoutube.classList.remove("project-button-unavailable");
    projectModalYoutube.title = translate("projects.watchYoutube");
  } else {
    projectModalYoutube.removeAttribute("href");
    projectModalYoutube.removeAttribute("target");
    projectModalYoutube.removeAttribute("rel");
    projectModalYoutube.setAttribute("aria-disabled", "true");
    projectModalYoutube.setAttribute("tabindex", "-1");
    projectModalYoutube.classList.add("project-button-unavailable");
    projectModalYoutube.title = translate("projects.videoComingSoon");
  }

  projectModalTechnologies.replaceChildren(
    ...project.technologies.map((technology) => {
      const tag = document.createElement("span");
      tag.className =
        "rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-slate-700";
      tag.dir = "ltr";
      tag.textContent = technology;
      return tag;
    })
  );

  projectModalFeatures.replaceChildren(
    ...localizedProject.features.map((feature) => {
      const item = document.createElement("li");
      item.className = "modal-feature";
      item.textContent = feature;
      return item;
    })
  );

  const architecture = localizedProject.architecture || [];
  projectModalArchitecture.hidden = architecture.length === 0;
  projectModalLayers.replaceChildren(
    ...architecture.map((layer) => {
      const item = document.createElement("li");
      item.textContent = layer;
      return item;
    })
  );
}

function getValidYoutubeUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;

    const host = url.hostname.toLowerCase();
    let videoId = "";
    if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") videoId = url.searchParams.get("v") || "";
      else videoId = url.pathname.match(/^\/(?:shorts|embed)\/([\w-]{11})\/?$/)?.[1] || "";
    } else if (host === "youtu.be" || host === "www.youtu.be") {
      videoId = url.pathname.match(/^\/([\w-]{11})\/?$/)?.[1] || "";
    }

    return /^[\w-]{11}$/.test(videoId) ? url.href : null;
  } catch {
    return null;
  }
}

function openProjectModal(projectId) {
  const project = projects.find((item) => item.id === projectId);

  if (!project || !projectModal) return;

  activeProjectId = projectId;
  lastFocusedElement = document.activeElement;
  renderProjectDetails(project);
  setModalOpen(true);
  projectModalClose?.focus();
}

function closeProjectModal() {
  if (!projectModal || projectModal.hidden) return;

  setModalOpen(false);
  restoreLastFocus();
}

function setMobileMenuOpen(isOpen, { restoreFocus = true } = {}) {
  if (!mobileMenu || !menuToggle || !mobileMenuPanel) return;

  if (isOpen) {
    if (!mobileMenu.hidden) return;
    window.clearTimeout(mobileMenuCloseTimeout);
    window.cancelAnimationFrame(mobileMenuOpenFrame);
    lastFocusedElement = document.activeElement;
    mobileMenu.hidden = false;
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", translate("menu.close"));
    lockBackgroundScroll();
    mobileMenuOpenFrame = requestAnimationFrame(() => {
      if (!mobileMenu.hidden) mobileMenu.classList.add("is-open");
      mobileMenuOpenFrame = null;
    });
    mobileMenuClose?.focus({ preventScroll: true });
    return;
  }

  if (mobileMenu.hidden) return;
  window.cancelAnimationFrame(mobileMenuOpenFrame);
  mobileMenuOpenFrame = null;
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", translate("menu.open"));
  unlockBackgroundScroll();
  if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
  window.clearTimeout(mobileMenuCloseTimeout);
  mobileMenuCloseTimeout = window.setTimeout(() => {
    if (!mobileMenu.classList.contains("is-open")) mobileMenu.hidden = true;
  }, 360);
}

menuToggle?.addEventListener("click", () => setMobileMenuOpen(true));
mobileMenuClose?.addEventListener("click", () => setMobileMenuOpen(false));
mobileMenuOverlay?.addEventListener("click", () => setMobileMenuOpen(false));
mobileMenu?.addEventListener("transitionend", (event) => {
  if (event.target !== mobileMenuPanel || event.propertyName !== "transform" || mobileMenu.classList.contains("is-open")) return;
  window.clearTimeout(mobileMenuCloseTimeout);
  mobileMenu.hidden = true;
});

function setActiveMenuLink(hash = window.location.hash || "#home") {
  mobileMenuLinks.forEach((link) => {
    if (link.hash === hash) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

setActiveMenuLink();
window.addEventListener("hashchange", () => setActiveMenuLink());

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveMenuLink(link.hash);
    setMobileMenuOpen(false, { restoreFocus: false });
  });
});

mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => {
  setMobileMenuOpen(false, { restoreFocus: false });
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
});

mobileLanguageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
});

projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeProjectCategory = button.dataset.projectFilter;
    projectFilterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    updateProjectResults({ animate: true });
  });
});

copyEmailButton?.addEventListener("click", async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(contactEmail.textContent.trim());
    showCopyEmailFeedback("success");
  } catch {
    showCopyEmailFeedback("failure");
  }
});

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;

    openProjectModal(card.dataset.projectId);
  });

  card.addEventListener("keydown", (event) => {
    if (event.target.closest("a, button")) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openProjectModal(card.dataset.projectId);
  });
});

projectDetailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const projectCard = button.closest("[data-project-id]");
    openProjectModal(projectCard?.dataset.projectId);
  });
});

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal || event.target.matches("[data-modal-overlay]")) {
    closeProjectModal();
  }
});

projectModalClose?.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (mobileMenu && !mobileMenu.hidden) {
      setMobileMenuOpen(false);
      return;
    }
    closeProjectModal();
    return;
  }

  if (event.key === "Tab" && mobileMenu && !mobileMenu.hidden) {
    const focusableElements = mobileMenuPanel.querySelectorAll('a[href], button:not([disabled])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && (document.activeElement === firstFocusableElement || !mobileMenuPanel.contains(document.activeElement))) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && (document.activeElement === lastFocusableElement || !mobileMenuPanel.contains(document.activeElement))) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
    return;
  }

  if (event.key !== "Tab" || !projectModal || projectModal.hidden) return;

  const focusableElements = projectModal.querySelectorAll(
    'button:not([disabled]), a[href]:not([aria-disabled="true"]), [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (!firstFocusableElement) {
    event.preventDefault();
    return;
  }

  if (event.shiftKey && (document.activeElement === firstFocusableElement || !projectModal.contains(document.activeElement))) {
    event.preventDefault();
    lastFocusableElement.focus();
  } else if (!event.shiftKey && (document.activeElement === lastFocusableElement || !projectModal.contains(document.activeElement))) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
  const degrees = Math.min(progress * 360, 360);

  backToTopButton?.style.setProperty("--progress-value", `${degrees}deg`);
  backToTopButton?.classList.toggle("is-visible", scrollTop > 240);
}

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 720) setMobileMenuOpen(false, { restoreFocus: false });
  resetHorizontalScroll();
  updateScrollProgress();
});
window.addEventListener("load", resetHorizontalScroll);
applyLanguage(currentLanguage, false);
mobileMenu?.addEventListener("transitionend", (event) => {
  if (event.target === mobileMenuOverlay && event.propertyName === "opacity" && !mobileMenu.classList.contains("is-open")) {
    window.clearTimeout(mobileMenuCloseTimeout);
    mobileMenu.hidden = true;
  }
});
updateScrollProgress();

function showRevealElement(element) {
  element.classList.add("is-visible");
}

if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
  revealElements.forEach(showRevealElement);
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        showRevealElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.documentElement.classList.add("reveal-ready");
