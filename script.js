document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("section"));
  const navToggle = document.getElementById("navToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const yearSpan = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const skillBars = Array.from(document.querySelectorAll(".skill-bar-fill"));
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  /* Set current year in footer */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* Mobile nav toggle */
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinksContainer.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navLinksContainer.classList.remove("open");
      });
    });
  }

  /* Smooth scrolling enhancement */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* IntersectionObserver for reveals & skills */
  const observerOptions = { threshold: 0.25 };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.classList.add("in-view");

      if (el.id === "skills") {
        skillBars.forEach((bar) => {
          const percent = bar.getAttribute("data-percent") || "0";
          bar.style.width = `${percent}%`;
        });
      }

      observer.unobserve(el);
    });
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  revealElements.forEach((el) => observer.observe(el));

  /* Highlight active nav link on scroll */
  const setActiveLink = () => {
    const scrollPos = window.scrollY;
    const offset = 130;

    let currentId = "hero";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + scrollPos - offset;
      if (scrollPos >= top) currentId = section.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href === `#${currentId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(setActiveLink);
  });
  setActiveLink();

  /* Contact form (front‑end only) */
  if (form && formStatus) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.style.color = "#f97373";
        return;
      }

      formStatus.textContent =
        "Thank you! Your message has been captured locally. Please use the email or LinkedIn links to contact me directly.";
      formStatus.style.color = "#a7f3d0";
      form.reset();
    });
  }
});

