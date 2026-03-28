const siteConfig = {
  siteName: "GP Electronics",
  githubUrl: "https://github.com/grzecho322-lgtm",
  githubRepoUrl: "https://github.com/grzecho322-lgtm/GP-Electronics",
  githubEditProjectsUrl: "https://github.com/grzecho322-lgtm/GP-Electronics/edit/main/app.js",
  patroniteUrl: "#patronite",
  email: "grzegorzpyda@yahoo.com",
  website: "https://grzecho322-lgtm.github.io/GP-Electronics/",
};

const defaultProjects = [
  {
    id: "plc-mvp",
    title: "PLC MVP",
    category: "PLC / Firmware / IDE",
    shortDescription:
      "MVP własnego sterownika PLC z firmware, lekkim językiem ST-lite, runtime scan-cycle, Modbus oraz przeglądarkowym IDE do diagnostyki i testów.",
    tags: ["Rust", "C", "Modbus", "ST-lite"],
    status: "Aktywnie rozwijany",
    featured: true,
    demoUrl: "",
    repoUrl: "",
    coverA: "#1d4ed8",
    coverB: "#0f766e",
  },
  {
    id: "truck-service-niezbednik",
    title: "Truck Service Niezbędnik",
    category: "Flutter / Serwis",
    shortDescription:
      "Monorepo Flutter dla serwisu ciężarówek z lokalną bazą, diagnostyką, podpowiedziami napraw, eksportem PDF, backupem i synchronizacją przez Supabase.",
    tags: ["Flutter", "Drift", "Supabase", "PDF"],
    status: "Rozwijany",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#9a3412",
    coverB: "#d97706",
  },
  {
    id: "moto-service-app",
    title: "Moto Service App",
    category: "Flutter / Moto Serwis",
    shortDescription:
      "Aplikacja Flutter do prowadzenia serwisu pojazdów z lokalną bazą Isar, planami zadań, historią wpisów, załącznikami, backupem, widgetami oraz powiadomieniami o terminach.",
    tags: ["Flutter", "Isar", "PDF", "Notifications"],
    status: "Rozwijany",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#9a3412",
    coverB: "#0f766e",
  },
  {
    id: "rgb-ble-controller-app",
    title: "RGB BLE Controller App",
    category: "Flutter / BLE",
    shortDescription:
      "Aplikacja Flutter na Androida do skanowania urządzeń BLE, łączenia z ESP32-C3 RGB i sterowania kolorem przez suwaki, presety oraz przyciski zasilania.",
    tags: ["Flutter", "BLE", "Android", "ESP32-C3"],
    status: "Działające MVP",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#1d4ed8",
    coverB: "#0f766e",
  },
  {
    id: "gp-electronics-ide",
    title: "GP Electronics IDE",
    category: "Flutter / Desktop IDE",
    shortDescription:
      "Desktopowe IDE w Flutterze dla workflow embedded z PlatformIO: tworzenie projektów z presetów płytek, edycja `src/main.cpp` oraz akcje build, upload i monitor na macOS, Windows i Linux.",
    tags: ["Flutter", "PlatformIO", "Desktop", "Embedded"],
    status: "Aktywnie rozwijany",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#0f766e",
    coverB: "#1d4ed8",
  },
  {
    id: "esp32-c3-rgb-ble-controller",
    title: "ESP32-C3 RGB BLE Controller",
    category: "ESP32 / BLE",
    shortDescription:
      "Firmware dla ESP32-C3 SuperMini sterujący diodą RGB przez PWM i BLE, z płynnymi przejściami kolorów oraz dodatkowymi komendami przez Serial Monitor.",
    tags: ["ESP32-C3", "BLE", "PWM", "RGB"],
    status: "Gotowy do testów",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#0f766e",
    coverB: "#1d4ed8",
  },
  {
    id: "ws2805-driver-esp32-supermini",
    title: "WS2805 Driver for ESP32 Super Mini",
    category: "ESP32 / LED",
    shortDescription:
      "Sterownik taśm i modułów WS2805 wykorzystujący RMT w ESP32 Super Mini, z obsługą 40 bitów na piksel i testami kanałów RGBWW.",
    tags: ["WS2805", "RMT", "ESP32", "RGBWW"],
    status: "Gotowy szkic",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#d97706",
    coverB: "#0f766e",
  },
  {
    id: "guitar-multieffect-daisy",
    title: "Cyfrowy Multi-Effect Gitarowy",
    category: "Audio DSP / Daisy",
    shortDescription:
      "Starter własnego multi-efektu gitarowego na Daisy Seed z torem gate, compressor, drive, modulation, delay i reverb oraz dokumentacją hardware.",
    tags: ["Daisy Seed", "C++", "DSP", "Audio"],
    status: "Starter projektu",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#1d4ed8",
    coverB: "#9a3412",
  },
  {
    id: "arduino-rgb-led-controller",
    title: "Arduino RGB LED Controller",
    category: "Arduino / LED",
    shortDescription:
      "Prosty sterownik RGB LED dla Arduino Uno i Nano z trybem demo, komendami przez Serial Monitor i obsługą common cathode oraz common anode.",
    tags: ["Arduino", "PWM", "RGB", "Serial"],
    status: "Gotowy szkic",
    featured: false,
    demoUrl: "",
    repoUrl: "",
    coverA: "#475569",
    coverB: "#0f766e",
  },
  {
    id: "gp-electronics-site",
    title: "GP Electronics Site",
    category: "Web / GitHub Pages",
    shortDescription:
      "Statyczna strona portfolio GP Electronics do publikacji projektów, filtrowania realizacji i kierowania odbiorców do GitHub oraz Patronite, hostowana na GitHub Pages.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    status: "Opublikowany",
    featured: false,
    demoUrl: "https://grzecho322-lgtm.github.io/GP-Electronics/",
    repoUrl: "https://github.com/grzecho322-lgtm/GP-Electronics",
    coverA: "#1d4ed8",
    coverB: "#9a3412",
  },
];

const state = {
  search: "",
  category: "Wszystkie",
};

const elements = {
  featuredProject: document.querySelector("#featured-project"),
  projectsCount: document.querySelector("#projects-count"),
  categoriesCount: document.querySelector("#categories-count"),
  categoryFilters: document.querySelector("#category-filters"),
  resultsSummary: document.querySelector("#results-summary"),
  projectsGrid: document.querySelector("#projects-grid"),
  searchInput: document.querySelector("#project-search"),
  menuToggle: document.querySelector("#menu-toggle"),
  mobileNav: document.querySelector("#mobile-nav"),
  githubProfileLink: document.querySelector("#github-profile-link"),
  githubRepositoryLink: document.querySelector("#github-repository-link"),
  githubRepositoryLinkOwner: document.querySelector("#github-repository-link-owner"),
  githubEditProjectsLink: document.querySelector("#github-edit-projects-link"),
  patroniteLinkHeader: document.querySelector("#patronite-link-header"),
  patroniteLinkMobile: document.querySelector("#patronite-link-mobile"),
  patroniteLinkSection: document.querySelector("#patronite-link-section"),
  contactEmail: document.querySelector("#contact-email"),
  contactWebsite: document.querySelector("#contact-website"),
  contactGithub: document.querySelector("#contact-github"),
};

function getAllProjects() {
  return defaultProjects;
}

function getCategories(projects) {
  return ["Wszystkie", ...new Set(projects.map((project) => project.category))];
}

function getFilteredProjects(projects) {
  const phrase = state.search.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      state.category === "Wszystkie" || project.category === state.category;
    const haystack = [
      project.title,
      project.shortDescription,
      project.category,
      project.status,
      ...(project.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !phrase || haystack.includes(phrase);
    return matchesCategory && matchesSearch;
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isSafeUrl(value) {
  return /^https?:\/\//i.test(value);
}

function normalizeUrl(value) {
  return isSafeUrl(value) ? value : "#";
}

function paletteForCategory(category) {
  const palettes = {
    "ESP32 / Motocykl": ["#0f766e", "#1d4ed8"],
    "Automatyka / ESP32": ["#d97706", "#9a3412"],
    "Flutter / Mobile": ["#1d4ed8", "#0f766e"],
  };

  return palettes[category] || ["#475569", "#0f766e"];
}

function projectCoverMarkup(project, kind = "card") {
  const coverA = project.coverA || paletteForCategory(project.category)[0];
  const coverB = project.coverB || paletteForCategory(project.category)[1];
  const topClass = kind === "featured" ? "cover-topline" : "cover-chip";
  const bottomClass = "cover-bottomline";
  const tagLine = (project.tags || []).slice(0, 3).join(" • ");

  return `
    <div class="${kind === "featured" ? "featured-cover" : "project-cover"}" style="--cover-a:${escapeHtml(coverA)}; --cover-b:${escapeHtml(coverB)};">
      <div class="cover-grid" aria-hidden="true"></div>
      <span class="${topClass}">${escapeHtml(project.category)}</span>
      <div class="${bottomClass}">${escapeHtml(tagLine || project.title)}</div>
    </div>
  `;
}

function buildProjectLinks(project) {
  const links = [];

  if (isSafeUrl(project.demoUrl)) {
    links.push(
      `<a class="button button-secondary" href="${escapeHtml(normalizeUrl(project.demoUrl))}" target="_blank" rel="noreferrer">Zobacz projekt</a>`
    );
  }

  if (isSafeUrl(project.repoUrl)) {
    links.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(project.repoUrl))}" target="_blank" rel="noreferrer">Repo projectu</a>`
    );
  } else if (isSafeUrl(siteConfig.githubUrl)) {
    links.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(siteConfig.githubUrl))}" target="_blank" rel="noreferrer">Profil GitHub</a>`
    );
  }

  return links.join("");
}

function renderFeaturedProject(project) {
  if (!project) {
    elements.featuredProject.innerHTML = "";
    return;
  }

  elements.featuredProject.innerHTMH = `
    <article class="featured-project">
      ${projectCoverMarkup(project, "featured")}
      <div class="featured-content">
        <div class="featured-meta">
          <span class="pill">${escapeHtml(project.category)}</span>
          <span class="pill status">${escapeHtml(project.status)}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.shortDescription)}</p>
        <div class="tags">
          ${(project.tags || [])
            .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
            .join("")}
        </div>
        <div class="featured-links">${buildProjectLinks(project)}</div>
      </div>
    </article>
  `;
}

function renderFilters(categories) {
  elements.categoryFilters.innerHTML = categories
    .map((category) => {
      const activeClass = state.category === category ? "filter-button is-active" : "filter-button";

      return `<button type="button" class="${activeClass}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`;
    })
    .join("");

  elements.categoryFilters.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category || "Wszystkie";
      renderApp();
    });
  });
}

function renderProjects(projects) {
  if (!projects.length) {
    elements.projectsGrid.innerHTML = `
      <div class="empty-state">
        <strong>Brak wyników dla podanych filtrów.</strong>
        <p>Spróbuj zmienić kategorię albo wpisz inną frazę wyszukiwania.</p>
      </div>
    `;
    return;
  }

  elements.projectsGrid.innerHTML = projects
    .map((project) => {
      return `
        <article class="project-card">
          ${projectCoverMarkup(project)}
          <div class="project-body">
            <div class="project-meta">
              <span class="pill">${escapeHtml(project.category)}</span>
              <span class="pill status">${escapeHtml(project.status)}</span>
            </div>
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.shortDescription)}</p>
            <div class="tags">
              ${(project.tags || [])
                .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
            <div class="project-links">${buildProjectLinks(project)}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMeta(allProjects, filteredProjects, categories) {
  elements.projectsCount.textContent = String(allProjects.length);
  elements.categoriesCount.textContent = String(categories.length - 1);
  elements.resultsSummary.textContent = `Widoczne projekty: ${filteredProjects.length} z ${allProjects.length}`;
}

function renderContactData() {
  const githubShort = siteConfig.githubUrl.replace(/^https?:\/\//i, "");

  applyLink(elements.githubProfileLink, siteConfig.githubUrl);
  applyLink(elements.githubRepositoryLink, siteConfig.githubRepoUrl);
  applyLink(elements.githubRepositoryLinkOwner, siteConfig.githubRepoUrl);
  applyLink(elements.githubEditProjectsLink, siteConfig.githubEditProjectsUrl);
  applyLink(elements.patroniteLinkHeader, siteConfig.patroniteUrl);
  applyLink(elements.patroniteLinkMobile, siteConfig.patroniteUrl);
  applyLink(elements.patroniteLinkSection, siteConfig.patroniteUrl);
  elements.contactEmail.textContent = siteConfig.email;
  elements.contactWebsite.textContent = siteConfig.website;
  elements.contactGithub.textContent = githubShort;
}

function applyLink(anchor, url) {
  anchor.href = url;

  if (isSafeUrl(url)) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    return;
  }

  anchor.target = "_self";
  anchor.removeAttribute("rel");
}

function renderApp() {
  const allProjects = getAllProjects();
  const categories = getCategories(allProjects);

  if (!categories.includes(state.category)) {
    state.category = "Wszystkie";
  }

  const filteredProjects = getFilteredProjects(allProjects);
  const featuredProject = allProjects.find((project) => project.featured) || allProjects[0];

  renderMeta(allProjects, filteredProjects, categories);
  renderFeaturedProject(featuredProject);
  renderFilters(categories);
  renderProjects(filteredProjects);
}

function setupEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value || "";
    renderApp();
  });

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.mobileNav.classList.toggle("is-open");
    elements.menuToggle.classList.toggle("is-open", isOpen);
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.mobileNav.classList.remove("is-open");
      elements.menuToggle.classList.remove("is-open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

renderContactData();
setupEvents();
renderApp();
