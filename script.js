document.documentElement.classList.add("js");

const themeToggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  if (themeMeta) themeMeta.content = isDark ? "#151a17" : "#f4f0e8";
  if (persist) {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Theme switching still works for this visit if storage is unavailable.
    }
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
} catch {
  savedTheme = "light";
}
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark", true);
});

const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

function setMenuOpen(isOpen) {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navPanel?.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navPanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const mapProjects = {
  resumate: { name: "ResuMate", tech: ["Python", "Flask", "Auth0", "Affinda", "OpenAI"], target: "project-resumate" },
  goalpost: { name: "GoalPost Gazette", tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS"], target: "project-goalpost" },
  sunplate: { name: "SunPlate", tech: ["React Native", "Expo Router", "TypeScript", "Supabase", "Stripe"], target: "project-sunplate" },
  studieats: { name: "StudiEats", tech: ["Scala", "ScalaFX", "SQL"], target: "project-studieats" },
  pokemon: { name: "Pokémon Ga-Olé", tech: ["Java"], target: "project-pokemon" },
  svps: { name: "SVPS", tech: ["Figma"], target: "project-svps" },
  portfolio: { name: "My Portfolio", tech: ["HTML", "CSS", "JavaScript"], target: "project-portfolio" },
  algorithms: { name: "Algorithm Showcase", tech: ["Python"], target: "project-algorithms" },
};

const mapButtons = [...document.querySelectorAll("[data-map-project]")];
const mapTechList = document.querySelector(".map-tech-list");
const mapStatus = document.querySelector("#map-status");
const mapJump = document.querySelector(".map-jump");

function selectMapProject(key) {
  const project = mapProjects[key];
  if (!project) return;

  mapButtons.forEach((button) => {
    const selected = button.dataset.mapProject === key;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (mapTechList) {
    mapTechList.replaceChildren(...project.tech.map((technology) => {
      const chip = document.createElement("span");
      chip.className = "map-tech is-highlighted";
      chip.textContent = technology;
      return chip;
    }));
  }

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.classList.toggle("map-highlight", card.dataset.project === key);
  });
  if (mapStatus) mapStatus.textContent = `${project.name} connects ${project.tech.join(", ")}.`;
  if (mapJump) {
    mapJump.href = `#${project.target}`;
    mapJump.innerHTML = `View ${project.name} <span aria-hidden="true">↘</span>`;
  }
}

mapButtons.forEach((button) => {
  button.addEventListener("click", () => selectMapProject(button.dataset.mapProject));
});

const copyButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");
copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.copyEmail;
  if (!email || !copyStatus) return;

  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied.";
  } catch {
    copyStatus.textContent = "Copy unavailable. Use the email link.";
  }
  window.setTimeout(() => { copyStatus.textContent = ""; }, 3500);
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = [...document.querySelectorAll(".reveal")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -48px 0px", threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
}
