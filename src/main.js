const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
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
    liveDemoUrl: "#",
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
    liveDemoUrl: "#",
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
    liveDemoUrl: "#",
  },
];
let lastFocusedElement = null;
let lockedScrollY = 0;

function resetHorizontalScroll() {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  localStorage.setItem("theme", theme);
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

  root.classList.add("overflow-hidden");
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

  root.classList.remove("overflow-hidden");
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
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, lockedScrollY);
  root.style.scrollBehavior = previousScrollBehavior;
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
  projectModal?.classList.toggle("hidden", !isOpen);
  projectModal?.classList.toggle("flex", isOpen);
  projectModal?.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    lockBackgroundScroll();
  } else {
    unlockBackgroundScroll();
  }
}

function renderProjectDetails(project) {
  projectModalImage.src = project.image;
  projectModalImage.alt = `${project.title} preview`;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;
  projectModalGithub.href = project.githubUrl;
  projectModalLive.href = project.liveDemoUrl;

  projectModalTechnologies.replaceChildren(
    ...project.technologies.map((technology) => {
      const tag = document.createElement("span");
      tag.className =
        "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300";
      tag.textContent = technology;
      return tag;
    })
  );

  projectModalFeatures.replaceChildren(
    ...project.features.map((feature) => {
      const item = document.createElement("li");
      item.className = "relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500 before:content-[''] dark:before:bg-cyan-300";
      item.textContent = feature;
      return item;
    })
  );
}

function openProjectModal(projectId) {
  const project = projects.find((item) => item.id === projectId);

  if (!project || !projectModal) return;

  lastFocusedElement = document.activeElement;
  renderProjectDetails(project);
  setModalOpen(true);
  projectModalClose?.focus();
}

function closeProjectModal() {
  if (!projectModal || projectModal.classList.contains("hidden")) return;

  setModalOpen(false);
  restoreLastFocus();
}

themeToggle?.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark");
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuToggle?.setAttribute("aria-expanded", "false");
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
