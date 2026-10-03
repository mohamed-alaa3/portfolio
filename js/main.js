/* =========================================================
   TOAST HELPER (shared, used by contact.js)
   ========================================================= */
function showToast(title, message, variant = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const icon = variant === "success" ? "bi-check-circle" : variant === "error" ? "bi-exclamation-circle" : "bi-info-circle";

  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
    <div class="toast-header">
      <i class="bi ${icon} me-2"></i>
      <strong class="me-auto">${title}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">${message}</div>
  `;
  container.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
  toast.show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- LOADING SCREEN ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader && loader.classList.add("loaded"), 300);
  });

  /* ---------- CURRENT YEAR ---------- */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const nav = document.getElementById("mainNav");
  const toggleNavState = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  toggleNavState();
  window.addEventListener("scroll", toggleNavState, { passive: true });

  /* Collapse mobile menu after clicking a link */
  document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const collapseEl = document.getElementById("navMenu");
      const collapse = bootstrap.Collapse.getInstance(collapseEl);
      if (collapse && collapseEl.classList.contains("show")) collapse.hide();
    });
  });

  /* ---------- SCROLL PROGRESS ---------- */
  const progressBar = document.getElementById("scroll-progress-bar");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  /* ---------- ACTIVE SECTION INDICATOR ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('#navMenu .nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- THEME TOGGLE ---------- */
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const applyTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    themeIcon.className = theme === "dark" ? "bi bi-moon-stars" : "bi bi-sun";
    themeToggle.setAttribute("aria-pressed", theme === "light");
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(target => revealObserver.observe(target));

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const duration = 900;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- TERMINAL TYPING EFFECT ---------- */
  const terminalLines = [
    { prompt: "whoami", output: "Mohamed Alaa" },
    { prompt: "role", output: "IT Student & Full Stack Developer" },
    { prompt: "stack", output: "Angular | Node.js | MongoDB" },
    { prompt: "learning", output: "AWS | Cloud | Cybersecurity" },
    { prompt: "status", output: "Building & Learning" }
  ];

  const terminalBody = document.getElementById("terminalBody");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderTerminalInstant() {
    terminalBody.innerHTML = terminalLines.map(line => `
      <div class="terminal-line"><span class="terminal-prompt">$</span> ${line.prompt}</div>
      <div class="terminal-output">${line.output}</div>
    `).join("");
  }

  async function typeTerminal() {
    for (const line of terminalLines) {
      const promptLine = document.createElement("div");
      promptLine.className = "terminal-line";
      promptLine.innerHTML = `<span class="terminal-prompt">$</span> `;
      terminalBody.appendChild(promptLine);

      for (const char of line.prompt) {
        promptLine.innerHTML += char;
        await new Promise(r => setTimeout(r, 28));
      }
      await new Promise(r => setTimeout(r, 220));

      const outputLine = document.createElement("div");
      outputLine.className = "terminal-output";
      outputLine.textContent = line.output;
      terminalBody.appendChild(outputLine);
      await new Promise(r => setTimeout(r, 260));
    }
    const cursor = document.createElement("span");
    cursor.className = "terminal-cursor";
    terminalBody.appendChild(cursor);
  }

  if (terminalBody) {
    if (prefersReducedMotion) renderTerminalInstant();
    else typeTerminal();
  }

  /* ---------- BOOTSTRAP TOOLTIPS ---------- */
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
});
