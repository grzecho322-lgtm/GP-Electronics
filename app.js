const siteConfig = {
  siteName: "GP Electronics",
  githubUrl: "https://github.com/grzecho322-lgtm",
  githubRepoUrl: "https://github.com/grzecho322-lgtm/GP-Electronics",
  githubEditProjectsUrl: "https://github.com/grzecho322-lgtm/GP-Electronics/edit/main/app.js",
  patroniteUrl: "#patronite",
  email: "Uzupełnij adres e-mail",
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
