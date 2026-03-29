window.GP_SITE_DATA = window.GP_SITE_DATA || { siteConfig: {}, projects: [] };
window.GP_SITE_DATA.projects = window.GP_SITE_DATA.projects.concat([
  {
    "id": "esp32-c3-rgb-ble-controller",
    "title": "ESP32-C3 RGB BLE Controller",
    "category": "ESP32 / BLE",
    "shortDescription": "Firmware dla ESP32-C3 SuperMini sterujący diodą RGB przez PWM i BLE, z płynnymi przejściami kolorów oraz dodatkowymi komendami przez Serial Monitor.",
    "fullDescription": [
      "To firmware do małego kontrolera RGB opartego o ESP32-C3. Obsługuje komunikację BLE i płynne sterowanie kanałami koloru, dzięki czemu może współpracować z aplikacją mobilną albo własnym panelem sterowania.",
      "Projekt dobrze nadaje się na podstronę z kodem źródłowym, schematem połączeń, opisem usług BLE i krótką instrukcją wgrywania szkicu na płytkę."
    ],
    "tags": [
      "ESP32-C3",
      "BLE",
      "PWM",
      "RGB"
    ],
    "highlights": [
      "Sterowanie RGB przez BLE i PWM",
      "Płynne przejścia między kolorami",
      "Komendy pomocnicze przez Serial Monitor",
      "Naturalne połączenie z aplikacją Flutter RGB BLE"
    ],
    "resources": [
      {
        "title": "Kod firmware (.ino)",
        "description": "Publiczny szkic `.ino` firmware dla ESP32-C3 RGB BLE Controller.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/esp32-c3-rgb-ble-controller/esp32_c3_rgb_ble_controller.ino",
        "kind": "code"
      },
      {
        "title": "Schemat / opis BLE",
        "description": "README z UUID, pinoutem i instrukcją wgrywania firmware.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/esp32-c3-rgb-ble-controller/README.md",
        "kind": "docs"
      }
    ],
    "status": "Gotowy do testów",
    "featured": false,
    "demoUrl": "",
    "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/esp32-c3-rgb-ble-controller",
    "coverA": "#0f766e",
    "coverB": "#1d4ed8"
  },
  {
    "id": "ws2805-driver-esp32-supermini",
    "title": "WS2805 Driver for ESP32 Super Mini",
    "category": "ESP32 / LED",
    "shortDescription": "Sterownik taśm i modułów WS2805 wykorzystujący RMT w ESP32 Super Mini, z obsługą 40 bitów na piksel i testami kanałów RGBWW.",
    "fullDescription": [
      "Projekt skupia się na firmware do sterowania taśmami i modułami WS2805 z użyciem ESP32 Super Mini. Kluczowa jest tutaj poprawna obsługa transmisji i kanałów RGBWW.",
      "To dobry kandydat na podstronę z kodem źródłowym, opisem sygnałów oraz materiałami pokazującymi testy kanałów i zachowanie diod w praktyce."
    ],
    "tags": [
      "WS2805",
      "RMT",
      "ESP32",
      "RGBWW"
    ],
    "highlights": [
      "Obsługa 40 bitów na piksel",
      "Wykorzystanie peryferium RMT w ESP32",
      "Testy kanałów RGBWW",
      "Baza pod sterowniki oświetlenia custom"
    ],
    "resources": [
      {
        "title": "Kod sterownika (.ino)",
        "description": "Publiczny szkic `.ino` sterownika WS2805 dla ESP32 Super Mini.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/ws2805-driver-esp32-supermini/arduino_ws2805_esp32_supermini.ino",
        "kind": "code"
      },
      {
        "title": "Notatki techniczne",
        "description": "README z opisem timingu, poziomów logicznych i uruchomienia.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/ws2805-driver-esp32-supermini/README.md",
        "kind": "docs"
      }
    ],
    "status": "Gotowy szkic",
    "featured": false,
    "demoUrl": "",
    "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/ws2805-driver-esp32-supermini",
    "coverA": "#d97706",
    "coverB": "#0f766e"
  },
  {
    "id": "guitar-multieffect-daisy",
    "title": "Cyfrowy Multi-Effect Gitarowy",
    "category": "Audio DSP / Daisy",
    "shortDescription": "Starter własnego multi-efektu gitarowego na Daisy Seed z torem gate, compressor, drive, modulation, delay i reverb oraz dokumentacją hardware.",
    "fullDescription": [
      "To baza pod własny cyfrowy multi-efekt gitarowy, łączący DSP, embedded i hardware audio. Projekt dotyczy zarówno toru efektów, jak i samej konstrukcji urządzenia.",
      "Na osobnej podstronie świetnie sprawdzi się opis toru audio, lista efektów, schemat hardware oraz pliki z materiałami dla kolejnych iteracji prototypu."
    ],
    "tags": [
      "Daisy Seed",
      "C++",
      "DSP",
      "Audio"
    ],
    "highlights": [
      "Tor gate, compressor, drive, modulation, delay i reverb",
      "Platforma Daisy Seed pod własny hardware",
      "Połączenie DSP i elektroniki audio",
      "Dobry fundament pod autorski procesor gitarowy"
    ],
    "resources": [
      {
        "title": "Kod firmware DSP",
        "description": "Główny plik `main.cpp` dla firmware efektu gitarowego na Daisy Seed.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/main.cpp",
        "kind": "code"
      },
      {
        "title": "README projektu",
        "description": "Główne wprowadzenie do projektu multi-efektu gitarowego.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/README.md",
        "kind": "docs"
      },
      {
        "title": "Dokumentacja architektury",
        "description": "Opis architektury, toru audio i etapów budowy projektu.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/01_architektura.md",
        "kind": "docs"
      },
      {
        "title": "BOM projektu",
        "description": "Lista komponentów i założeń sprzętowych do budowy prototypu.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/02_bom.md",
        "kind": "docs"
      },
      {
        "title": "Okablowanie",
        "description": "Notatki o połączeniach i okablowaniu urządzenia.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/03_okablowanie.md",
        "kind": "docs"
      },
      {
        "title": "Instrukcja uruchomienia",
        "description": "Kroki startowe do odpalenia prototypu i pierwszych testów.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/guitar-multieffect-daisy/04_uruchomienie.md",
        "kind": "docs"
      },
      {
        "title": "Materiały projektu",
        "description": "Publiczny katalog z README, BOM, okablowaniem i kodem firmware.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/guitar-multieffect-daisy",
        "kind": "repo"
      }
    ],
    "status": "Starter projektu",
    "featured": false,
    "demoUrl": "",
    "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/guitar-multieffect-daisy",
    "coverA": "#1d4ed8",
    "coverB": "#9a3412"
  },
  {
    "id": "arduino-rgb-led-controller",
    "title": "Arduino RGB LED Controller",
    "category": "Arduino / LED",
    "shortDescription": "Prosty sterownik RGB LED dla Arduino Uno i Nano z trybem demo, komendami przez Serial Monitor i obsługą common cathode oraz common anode.",
    "fullDescription": [
      "To prosty, czytelny projekt Arduino, który dobrze nadaje się do pokazania kodu źródłowego bezpośrednio na podstronie albo jako plik do pobrania.",
      "Dzięki temu odwiedzający mogą od razu zobaczyć szkic `.ino`, sprawdzić sposób sterowania diodą i pobrać gotowy kod do własnych testów na Uno lub Nano."
    ],
    "tags": [
      "Arduino",
      "PWM",
      "RGB",
      "Serial"
    ],
    "highlights": [
      "Tryb demo i sterowanie przez Serial Monitor",
      "Obsługa common cathode i common anode",
      "Dobry przykład prostego szkicu Arduino",
      "Idealny projekt pod publikację kodu `.ino`"
    ],
    "resources": [
      {
        "title": "Kod Arduino (.ino)",
        "description": "Publiczny szkic Arduino do podglądu i pobrania.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/arduino-rgb-led-controller/arduino_rgb_led_controller.ino",
        "kind": "code"
      },
      {
        "title": "Instrukcja podłączenia",
        "description": "README z opisem pinów, komend i sposobu podłączenia RGB LED.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/arduino-rgb-led-controller/README.md",
        "kind": "docs"
      }
    ],
    "status": "Gotowy szkic",
    "featured": false,
    "demoUrl": "",
    "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/arduino-rgb-led-controller",
    "coverA": "#475569",
    "coverB": "#0f766e"
  },
  {
    "id": "gp-electronics-site",
    "title": "GP Electronics Site",
    "category": "Web / GitHub Pages",
    "shortDescription": "Statyczna strona portfolio GP Electronics do publikacji projektów, filtrowania realizacji i kierowania odbiorców do GitHub oraz Patronite, hostowana na GitHub Pages.",
    "fullDescription": [
      "To obecna strona portfolio GP Electronics. Jest hostowana na GitHub Pages i działa jako lekka, statyczna wizytówka projektów embedded, aplikacji oraz narzędzi desktopowych.",
      "W tej wersji ma filtrowanie projektów, owner-only aktualizację treści przez GitHub oraz osobne podstrony z pełnym opisem projektu, kodem, plikami do pobrania i materiałami dodatkowymi."
    ],
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "GitHub Pages"
    ],
    "highlights": [
      "Publikacja bez backendu na GitHub Pages",
      "Filtrowanie portfolio i sekcja wsparcia Patronite",
      "Podstrony projektów z pełnym opisem",
      "Treść aktualizowana tylko przez właściciela repo"
    ],
    "resources": [
      {
        "title": "Publiczna wersja strony",
        "description": "Aktualnie opublikowana wersja portfolio.",
        "url": "https://grzecho322-lgtm.github.io/GP-Electronics/",
        "kind": "live"
      },
      {
        "title": "Repo strony",
        "description": "Kod źródłowy strony i danych projektów.",
        "url": "https://github.com/grzecho322-lgtm/GP-Electronics",
        "kind": "repo"
      }
    ],
    "status": "Opublikowany",
    "featured": false,
    "demoUrl": "https://grzecho322-lgtm.github.io/GP-Electronics/",
    "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics",
    "coverA": "#1d4ed8",
    "coverB": "#9a3412"
  }
]);
