window.GP_SITE_DATA = {
  "siteConfig": {
    "siteName": "GP Electronics",
    "githubUrl": "https://github.com/grzecho322-lgtm",
    "githubRepoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics",
    "githubEditProjectsUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/edit/main/projects-data.js",
    "patroniteUrl": "#patronite",
    "email": "grzegorzpyda@yahoo.com",
    "website": "https://grzecho322-lgtm.github.io/GP-Electronics/"
  },
  "projects": [
    {
      "id": "plc-mvp",
      "title": "PLC MVP",
      "category": "PLC / Firmware / IDE",
      "shortDescription": "MVP własnego sterownika PLC z firmware, lekkim językiem ST-lite, runtime scan-cycle, Modbus oraz przeglądarkowym IDE do diagnostyki i testów.",
      "fullDescription": [
        "To fundament pod własną platformę PLC: od firmware przez runtime scan-cycle aż po narzędzia do kompilacji i diagnostyki logiki sterownika.",
        "Projekt łączy warstwę embedded z toolchainem developerskim, dzięki czemu można rozwijać zarówno sam sterownik, jak i język programowania ST-lite oraz środowisko do testów i uruchamiania programów."
      ],
      "tags": [
        "Rust",
        "C",
        "Modbus",
        "ST-lite"
      ],
      "highlights": [
        "Deterministyczny cykl read -> execute -> write",
        "Kompilator ST-lite rozwijany w Rust",
        "Scaffold firmware dla wielu targetów",
        "Miejsce na IDE, diagnostykę i testy end-to-end"
      ],
      "resources": [
        {
          "title": "Materiały projektu",
          "description": "Publiczny katalog z kodem, dokumentacją i buildami PLC MVP w repo GP Electronics.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/plc-mvp",
          "kind": "repo"
        },
        {
          "title": "README projektu",
          "description": "Wprowadzenie do PLC MVP, struktury repo i głównych założeń projektu.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/plc-mvp/README.md",
          "kind": "docs"
        },
        {
          "title": "Dokumentacja architektury",
          "description": "Opis architektury projektu PLC, runtime i głównych modułów.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/plc-mvp/ARCHITECTURE.md",
          "kind": "docs"
        },
        {
          "title": "Targety firmware",
          "description": "Notatki o wariantach firmware i wspieranych targetach sprzętowych.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/plc-mvp/FIRMWARE_TARGETS.md",
          "kind": "docs"
        },
        {
          "title": "Przykład programu ST-lite",
          "description": "Przykładowy plik `blink.st` do testów logiki sterownika.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/plc-mvp/blink.st",
          "kind": "code"
        },
        {
          "title": "Firmware Arduino Uno (.hex)",
          "description": "Gotowy build firmware PLC dla wariantu Arduino Uno.",
          "url": "https://grzecho322-lgtm.github.io/GP-Electronics/assets/projects/plc-mvp/plc_firmware_arduino_uno.hex",
          "kind": "download"
        }
      ],
      "status": "Aktywnie rozwijany",
      "featured": true,
      "demoUrl": "",
      "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/plc-mvp",
      "coverA": "#1d4ed8",
      "coverB": "#0f766e"
    },
    {
      "id": "truck-service-niezbednik",
      "title": "Truck Service Niezbędnik",
      "category": "Flutter / Serwis",
      "shortDescription": "Monorepo Flutter dla serwisu ciężarówek z lokalną bazą, diagnostyką, podpowiedziami napraw, eksportem PDF, backupem i synchronizacją przez Supabase.",
      "fullDescription": [
        "To rozbudowana aplikacja serwisowa dla ciężarówek, z podziałem na ciągnik, naczepę i wspólne przypadki. Obejmuje lokalną bazę danych, historię napraw, checklisty, sugestie techniczne i tryb diagnozy.",
        "Projekt jest przygotowany pod realną pracę warsztatową: ma raporty PDF, koszty napraw, zlecenia serwisowe, backup, sync oraz narzędzia do szybkiego wyszukiwania podobnych usterek."
      ],
      "tags": [
        "Flutter",
        "Drift",
        "Supabase",
        "PDF"
      ],
      "highlights": [
        "Historia napraw, checklisty i załączniki",
        "Generator diagnoz i podpowiedzi technicznych",
        "Eksport PDF oraz import/export backupów",
        "Cloud sync i auth przez Supabase"
      ],
      "resources": [
        {
          "title": "Opis projektu",
          "description": "Główny opis monorepo aplikacji serwisowej dla ciężarówek.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/truck-service-niezbednik/README.md",
          "kind": "docs"
        },
        {
          "title": "README aplikacji Flutter",
          "description": "Szczegóły modułu `truck_app` i uruchamiania aplikacji.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/truck-service-niezbednik/truck_app_README.md",
          "kind": "docs"
        },
        {
          "title": "Materiały projektu",
          "description": "Publiczny katalog z materiałami projektu Truck Service Niezbędnik.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/truck-service-niezbednik",
          "kind": "repo"
        }
      ],
      "status": "Rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/truck-service-niezbednik",
      "coverA": "#9a3412",
      "coverB": "#d97706"
    },
    {
      "id": "moto-service-app",
      "title": "Moto Service App",
      "category": "Flutter / Moto Serwis",
      "shortDescription": "Aplikacja Flutter do prowadzenia serwisu pojazdów z lokalną bazą Isar, planami zadań, historią wpisów, załącznikami, backupem, widgetami oraz powiadomieniami o terminach.",
      "fullDescription": [
        "Aplikacja skupia się na planowaniu i prowadzeniu historii serwisu dla pojazdów, z widokiem dashboardu, listą zadań, zarządzaniem pojazdami i zapisywaniem pełnych wpisów serwisowych.",
        "W kodzie widać też funkcje typowo produkcyjne: lokalną bazę Isar, wielojęzyczność, automatyczny backup, powiadomienia, synchronizację widgetów i eksport materiałów do PDF."
      ],
      "tags": [
        "Flutter",
        "Isar",
        "PDF",
        "Notifications"
      ],
      "highlights": [
        "Historia serwisowa i planowanie zadań",
        "Załączniki, backup i ustawienia widgetów",
        "Powiadomienia o terminach i diagnostyka notyfikacji",
        "Wielojęzyczność: PL, EN, DE i ES"
      ],
      "resources": [
        {
          "title": "Materiały projektu",
          "description": "Publiczny katalog z opisem i materiałami Moto Service App.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/moto-service-app",
          "kind": "repo"
        },
        {
          "title": "Opis funkcji aplikacji",
          "description": "README projektu z opisem modułów, backupu, PDF i workflow serwisowego.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/moto-service-app/README.md",
          "kind": "docs"
        },
        {
          "title": "Instrukcja widgetów iOS",
          "description": "Dodatkowe notatki konfiguracyjne dla wersji iOS.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/moto-service-app/widget_setup_ios.md",
          "kind": "docs"
        }
      ],
      "status": "Rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/moto-service-app",
      "coverA": "#9a3412",
      "coverB": "#0f766e"
    },
    {
      "id": "rgb-ble-controller-app",
      "title": "RGB BLE Controller App",
      "category": "Flutter / BLE",
      "shortDescription": "Aplikacja Flutter na Androida do skanowania urządzeń BLE, łączenia z ESP32-C3 RGB i sterowania kolorem przez suwaki, presety oraz przyciski zasilania.",
      "fullDescription": [
        "To lekka aplikacja mobilna do obsługi urządzenia BLE zbudowanego na ESP32-C3. Pozwala wyszukać urządzenie, połączyć się z nim i sterować kolorem przez interfejs z presetami oraz suwakami RGB.",
        "Projekt jest dobrym przykładem połączenia aplikacji Flutter z firmware embedded. W praktyce może służyć jako baza dla bardziej rozbudowanego panelu konfiguracyjnego urządzeń BLE."
      ],
      "tags": [
        "Flutter",
        "BLE",
        "Android",
        "ESP32-C3"
      ],
      "highlights": [
        "Skanowanie urządzeń reklamujących usługę RGB",
        "Połączenie z firmware ESP32-C3 przez BLE",
        "Sterowanie kolorami i presetami w czasie rzeczywistym",
        "Naturalny duet z firmware z projektu ESP32-C3 RGB"
      ],
      "resources": [
        {
          "title": "Materiały projektu",
          "description": "Publiczny katalog z opisem aplikacji RGB BLE Controller.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/rgb-ble-controller-app",
          "kind": "repo"
        },
        {
          "title": "Opis aplikacji i BLE",
          "description": "README projektu z opisem aplikacji oraz powiązania z firmware BLE.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/rgb-ble-controller-app/README.md",
          "kind": "docs"
        }
      ],
      "status": "Działające MVP",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/rgb-ble-controller-app",
      "coverA": "#1d4ed8",
      "coverB": "#0f766e"
    },
    {
      "id": "gp-electronics-ide",
      "title": "GP Electronics IDE",
      "category": "Flutter / Desktop IDE",
      "shortDescription": "Desktopowe IDE w Flutterze dla workflow embedded z PlatformIO: tworzenie projektów z presetów płytek, edycja `src/main.cpp` oraz akcje build, upload i monitor na macOS, Windows i Linux.",
      "fullDescription": [
        "To własna powłoka IDE przygotowana z myślą o projektach embedded opartych o PlatformIO. Ma uprościć tworzenie projektów, wybór płytki i najczęstsze operacje developerskie bez przełączania się między narzędziami.",
        "Projekt łączy desktopowe UI z praktycznym workflow dla mikrokontrolerów: generowanie projektu, uruchamianie buildu, upload firmware oraz podgląd monitora szeregowego z jednego miejsca."
      ],
      "tags": [
        "Flutter",
        "PlatformIO",
        "Desktop",
        "Embedded"
      ],
      "highlights": [
        "Desktop-only UI dla macOS, Windows i Linux",
        "Presety płytek dla ESP32, STM32 i AVR",
        "Akcje build, upload i monitor",
        "Zintegrowana edycja pliku `src/main.cpp`"
      ],
      "resources": [
        {
          "title": "Materiały projektu",
          "description": "Publiczny katalog z dokumentacją i materiałami GP Electronics IDE.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/gp-electronics-ide",
          "kind": "repo"
        },
        {
          "title": "Dokumentacja IDE",
          "description": "README z opisem funkcji, presetów płytek i procesu release.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/gp-electronics-ide/README.md",
          "kind": "docs"
        },
        {
          "title": "Instrukcja launcherów",
          "description": "README launcherów i workflow buildów release dla IDE.",
          "url": "https://github.com/grzecho322-lgtm/GP-Electronics/blob/main/assets/projects/gp-electronics-ide/launcher_README.md",
          "kind": "docs"
        }
      ],
      "status": "Aktywnie rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "https://github.com/grzecho322-lgtm/GP-Electronics/tree/main/assets/projects/gp-electronics-ide",
      "coverA": "#0f766e",
      "coverB": "#1d4ed8"
    }
  ]
};
