const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const languageToggle = document.querySelector("#language-toggle");
const languageToggleLabel = document.querySelector("#language-toggle-label");
const backToTopButton = document.querySelector("#back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectCards = document.querySelectorAll("[data-project-id]");
const projectModal = document.querySelector("#project-modal");
const projectModalClose = document.querySelector("#project-modal-close");
const projectModalImage = document.querySelector("#project-modal-image");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalDescription = document.querySelector("#project-modal-description");
const projectModalTechnologies = document.querySelector("#project-modal-technologies");
const projectModalFeatures = document.querySelector("#project-modal-features");
const projectModalGithub = document.querySelector("#project-modal-github");
const projectModalLive = document.querySelector("#project-modal-live");
const pageDescription = document.querySelector('meta[name="description"]');
const localeCatalog = window.portfolioTranslations;
const lockedBodyStyles = {};
const projects = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "A dashboard web application focused on clean analytics views, practical data summaries, and simple reporting workflows for everyday business decisions.",
    technologies: ["ASP.NET Core", "C#", "SQL Server", "JavaScript", "Tailwind CSS"],
    features: [
      "Responsive analytics dashboard layout",
      "Reusable cards for key metrics and charts",
      "Clean data visualization placeholders",
      "GitHub Pages-friendly static preview",
    ],
    image: "./assets/images/project-dashboard-placeholder.svg",
    githubUrl: "https://github.com/azher-devs",
  },
  {
    id: "project-two",
    title: "Project Two",
    description:
      "A cross-platform mobile productivity concept for organizing tasks, tracking progress, and keeping common workflows simple across devices.",
    technologies: ["Flutter", "Dart", "Firebase", "RESTful APIs"],
    features: [
      "Mobile-first task management screens",
      "Simple status and priority organization",
      "Cloud-ready data structure",
      "Clean interface for repeated daily use",
    ],
    image: "./assets/images/project-mobile-placeholder.svg",
    githubUrl: "https://github.com/azher-devs",
  },
  {
    id: "project-three",
    title: "Project Three",
    description:
      "An e-commerce platform concept with product browsing, shopping cart interactions, secure checkout flow planning, and order tracking screens.",
    technologies: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "JavaScript"],
    features: [
      "Product catalog and cart workflow",
      "Order tracking interface",
      "Secure payment flow structure",
      "Responsive storefront layout",
    ],
    image: "./assets/images/project-commerce-placeholder.svg",
    githubUrl: "https://github.com/azher-devs",
  },
];
let lastFocusedElement = null;
let lockedScrollY = 0;
let activeProjectId = null;

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
  menuToggle?.setAttribute("aria-label", translate(menuToggle.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open"));

  document.querySelectorAll(".project-button-unavailable").forEach((element) => {
    element.textContent = translate(element.id === "project-modal-live" ? "projects.liveUnavailable" : "projects.liveDemo");
  });

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
  projectModalImage.src = project.image;
  projectModalImage.alt = `${project.title} ${translate("modal.projectPreview")}`;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = localizedProject.description;
  projectModalGithub.href = project.githubUrl;
  projectModalGithub.setAttribute("aria-label", translate("social.github"));
  projectModalLive.textContent = translate("projects.liveUnavailable");
  projectModalLive.setAttribute("aria-disabled", "true");

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

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.hidden;
  mobileMenu.hidden = !isOpen;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", translate(isOpen ? "menu.close" : "menu.open"));
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "ar" : "en");
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", translate("menu.open"));
  });
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

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal || event.target.matches("[data-modal-overlay]")) {
    closeProjectModal();
  }
});

projectModalClose?.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
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
  resetHorizontalScroll();
  updateScrollProgress();
});
window.addEventListener("load", resetHorizontalScroll);
applyLanguage(currentLanguage, false);
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
