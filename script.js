
// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

// Close menu on navigation
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

// Active navigation highlighting
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      links.forEach((link) => {
        const isActive =
          link.getAttribute("href") === `#${currentId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px",
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));

// Footer copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// ==========================================
// PROFESSIONAL SCROLL ANIMATIONS
// ==========================================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {
  const animatedElements = document.querySelectorAll(
    ".section-heading, .about-grid, .about-subsection," +
    ".skill-card, .project-card, .education-card," +
    ".research-card, .experience-card, .contact-section"
  );

  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  const cardSelector =
    ".skill-card, .project-card, " +
    ".education-card, .research-card";

  animatedElements.forEach((element) => {
    element.classList.add("scroll-reveal");

    // Stagger cards within their individual grids
    if (element.matches(cardSelector)) {
      const siblings = Array.from(
        element.parentElement.children
      ).filter((child) => child.matches(cardSelector));

      const index = siblings.indexOf(element);

      element.style.setProperty(
        "--reveal-delay",
        `${(index % 3) * 100}ms`
      );
    }

    // Show content already visible when the page loads
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("show");
    } else {
      animationObserver.observe(element);
    }
  });

  document.documentElement.classList.add("js-animations");
}
