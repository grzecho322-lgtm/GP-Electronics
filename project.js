const gpSiteData = window.GP_SITE_DATA || {};
const siteConfig = gpSiteData.siteConfig || {};
const projects = gpSiteData.projects || [];

const detailRoot = document.querySelector("#project-detail-root");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const githubProfileLink = document.querySelector("#project-github-profile-link");
const projectMetaDescription = document.querySelector("#project-meta-description");

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

function projectCoverMarkup(project) {
  const coverA = project.coverA || paletteForCategory(project.category)[0];
  const coverB = project.coverB || paletteForCategory(project.category)[1];
  const tagLine = (project.tags || []).slice(0, 3).join(" • ");

  return `
    <div class="project-page-cover" style="--cover-a:${escapeHtml(coverA)}; --cover-b:${escapeHtml(coverB)};">
      <div class="cover-grid" aria-hidden="true"></div>
      <span class="cover-topline">${escapeHtml(project.category)}</span>
      <div class="cover-bottomline">${escapeHtml(tagLine || project.title)}</div>
    </div>
  `;
}

function resourceKindLabel(kind) {
  const labels = {
    repo: "Repo",
    download: "Pobieranie",
    code: "Kod",
    docs: "Dokumentacja",
    live: "Live",
  };

  return labels[kind] || "Materiał";
}

function renderProjectActions(project) {
  const buttons = [];

  buttons.push(`<a class="button button-secondary" href="./index.html#projekty">Wróć do portfolio</a>`);

  if (isSafeUrl(project.demoUrl)) {
    buttons.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(project.demoUrl))}" target="_blank" rel="noreferrer">Otwórz demo / live</a>`
    );
  }

  if (isSafeUrl(project.repoUrl)) {
    buttons.push(
      `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(project.repoUrl))}" target="_blank" rel="noreferrer">Repo projektu</a>`
    );
  }

  return buttons.join("");
}

function renderResources(resources) {
  if (!resources.length) {
    return `
      <div class="detail-empty">
        <strong>Materiały dodasz tutaj, gdy będą gotowe do publikacji.</strong>
        <p>Możesz podpiąć kod źródłowy, APK, PDF, schemat albo link do repozytorium.</p>
      </div>
    `;
  }

  return `
    <div class="resource-grid">
      ${resources
        .map((resource) => {
          const hasUrl = isSafeUrl(resource.url);
          const action = hasUrl
            ? `<a class="button button-ghost" href="${escapeHtml(normalizeUrl(resource.url))}" target="_blank" rel="noreferrer"${resource.kind === "download" ? " download" : ""}>Otwórz materiał</a>`
            : `<span class="button button-disabled">Dodasz link później</span>`;

          return `
            <article class="resource-card">
              <span class="resource-kind">${escapeHtml(resourceKindLabel(resource.kind))}</span>
              <h3>${escapeHtml(resource.title)}</h3>
              <p>${escapeHtml(resource.description)}</p>
              <div class="resource-action">${action}</div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderProject(project) {
  const fullDescription = project.fullDescription || [];
  const highlights = project.highlights || [];
  const resources = project.resources || [];

  document.title = `${project.title} | GP Electronics`;

  if (projectMetaDescription) {
    projectMetaDescription.content = project.shortDescription;
  }

  detailRoot.innerHTML = `
    <article class="project-detail-page">
      <div class="project-page-hero">
        <div class="project-page-copy">
          <p class="eyebrow">Podstrona projektu</p>
          <div class="project-meta">
            <span class="pill">${escapeHtml(project.category)}</span>
            <span class="pill status">${escapeHtml(project.status)}</span>
          </div>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="project-page-intro">${escapeHtml(project.shortDescription)}</p>
          <div class="tags">
            ${(project.tags || [])
              .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
          <div class="hero-actions">${renderProjectActions(project)}</div>
        </div>

        <div class="project-page-visual">
          ${projectCoverMarkup(project)}
        </div>
      </div>

      <div class="detail-grid">
        <section class="detail-card">
          <p class="info-kicker">Pełny opis</p>
          <h2>O projekcie</h2>
          <div class="detail-copy">
            ${fullDescription.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </div>
        </section>

        <aside class="detail-card">
          <p class="info-kicker">Najważniejsze elementy</p>
          <h2>Co tu pokazujesz</h2>
          <ul class="detail-list">
            ${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </aside>
      </div>

      <section class="detail-card detail-section">
        <p class="info-kicker">Kod, pliki i materiały</p>
        <h2>Materiały projektu</h2>
        <p class="detail-section-copy">
          W tej sekcji możesz publikować kod Arduino, pliki APK, PDF, dokumentację, schematy albo linki do repo. Wszystko jest gotowe pod statyczne hostowanie na GitHub Pages.
        </p>
        ${renderResources(resources)}
      </section>
    </article>
  `;
}

function renderMissingProject() {
  document.title = "Projekt nie znaleziony | GP Electronics";

  detailRoot.innerHTML = `
    <article class="detail-card detail-not-found">
      <p class="info-kicker">Brak projektu</p>
      <h1>Nie znalazłem takiego wpisu w portfolio</h1>
      <p>Link może być niepełny albo projekt nie został jeszcze dodany do pliku z danymi.</p>
      <div class="hero-actions">
        <a class="button button-secondary" href="./index.html#projekty">Wróć do projektów</a>
        <a class="button button-ghost" href="${escapeHtml(normalizeUrl(siteConfig.githubRepoUrl || ""))}" target="_blank" rel="noreferrer">Otwórz repo</a>
      </div>
    </article>
  `;
}

function setupNavigation() {
  if (githubProfileLink && isSafeUrl(siteConfig.githubUrl)) {
    githubProfileLink.href = siteConfig.githubUrl;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = projects.find((item) => item.id === projectId);

  setupNavigation();

  if (!project) {
    renderMissingProject();
    return;
  }

  renderProject(project);
}

initProjectPage();
