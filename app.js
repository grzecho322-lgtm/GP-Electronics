const gpSiteData = window.GP_SITE_DATA || {};
const siteConfig = gpSiteData.siteConfig || {};
const defaultProjects = gpSiteData.projects || [];

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
      ...((project.highlights || []).slice(0, 3)),
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

function projectPageUrl(project) {
  return `./project.html?id=${encodeURIComponent(project.id)}`;
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
  const pageUrl = projectPageUrl(project);

  return `
    <a class="${kind === "featured" ? "cover-link featured-cover" : "cover-link project-cover"}" href="${escapeHtml(pageUrl)}" style="--cover-a:${escapeHtml(coverA)}; --cover-b:${escapeHtml(coverB)};">
      <div class="cover-grid" aria-hidden="true"></div>
      <span class="${topClass}">${escapeHtml(project.category)}</span>
      <div class="${bottomClass}">${escapeHtml(tagLine || project.title)}</div>
    </a>
  `;
}

function buildProjectLinks(project) {
  const links = [];

  links.push(
    `<a class="button button-secondary" href="${escapeHtml(projectPageUrl(project))}">Pełny opis projektu</a>`
  );

  if (isSafeUrl(project.demoUrl)) {
    links.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(project.demoUrl))}" target="_blank" rel="noreferrer">Demo / live</a>`
    );
  }

  if (isSafeUrl(project.repoUrl)) {
    links.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(project.repoUrl))}" target="_blank" rel="noreferrer">Repo projektu</a>`
    );
  } else if (!isSafeUrl(project.demoUrl) && isSafeUrl(siteConfig.githubUrl)) {
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

  elements.featuredProject.innerHTML = `
    <article class="featured-project">
      ${projectCoverMarkup(project, "featured")}
      <div class="featured-content">
        <div class="featured-meta">
          <span class="pill">${escapeHtml(project.category)}</span>
          <span class="pill status">${escapeHtml(project.status)}</span>
        </div>
        <h3><a class="project-title-link" href="${escapeHtml(projectPageUrl(project))}">${escapeHtml(project.title)}</a></h3>
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
      const activeClass =
        state.category === category ? "filter-button is-active" : "filter-button";

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
            <h3><a class="project-title-link" href="${escapeHtml(projectPageUrl(project))}">${escapeHtml(project.title)}</a></h3>
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
  const githubShort = (siteConfig.githubUrl || "").replace(/^https?:\/\//i, "");

  applyLink(elements.githubProfileLink, siteConfig.githubUrl);
  applyLink(elements.githubRepositoryLink, siteConfig.githubRepoUrl);
  applyLink(elements.githubRepositoryLinkOwner, siteConfig.githubRepoUrl);
  applyLink(elements.githubEditProjectsLink, siteConfig.githubEditProjectsUrl);
  applyLink(elements.patroniteLinkHeader, siteConfig.patroniteUrl);
  applyLink(elements.patroniteLinkMobile, siteConfig.patroniteUrl);
  applyLink(elements.patroniteLinkSection, siteConfig.patroniteUrl);
  elements.contactEmail.textContent = siteConfig.email || "";
  elements.contactWebsite.textContent = siteConfig.website || "";
  elements.contactGithub.textContent = githubShort;
}

function applyLink(anchor, url) {
  if (!anchor) {
    return;
  }

  anchor.href = url || "#";

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
