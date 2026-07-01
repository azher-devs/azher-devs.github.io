const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const backToTopButton = document.querySelector("#back-to-top");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
