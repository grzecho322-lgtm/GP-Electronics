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
          "title": "Repo projektu",
          "description": "Po publikacji możesz tu podpiąć publiczne repo z kodem PLC i toolchainem.",
          "url": "",
          "kind": "repo"
        },
        {
          "title": "Dokumentacja / PDF",
          "description": "Dobre miejsce na architekturę, memory mapę, instrukcję uruchomienia albo opis ST-lite.",
          "url": "",
          "kind": "docs"
        }
      ],
      "status": "Aktywnie rozwijany",
      "featured": true,
      "demoUrl": "",
      "repoUrl": "",
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
          "title": "APK do pobrania",
          "description": "Podstaw tutaj gotowy link do release APK, gdy będziesz chciał udostępnić wersję testową.",
          "url": "",
          "kind": "download"
        },
        {
          "title": "Repo projektu",
          "description": "Możesz podpiąć repo monorepo z aplikacją, pakietami i CI.",
          "url": "",
          "kind": "repo"
        }
      ],
      "status": "Rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "",
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
          "title": "APK do pobrania",
          "description": "Możesz tu dodać bezpośredni plik APK albo link do paczki release.",
          "url": "",
          "kind": "download"
        },
        {
          "title": "Opis funkcji / PDF",
          "description": "Dobre miejsce na specyfikację modułów, screeny albo instrukcję dla użytkownika.",
          "url": "",
          "kind": "docs"
        }
      ],
      "status": "Rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "",
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
          "title": "APK do pobrania",
          "description": "Podstaw tutaj gotowy link do wersji release aplikacji Android.",
          "url": "",
          "kind": "download"
        },
        {
          "title": "Opis protokołu BLE",
          "description": "Możesz dodać tu dokumentację UUID, komend i formatu danych.",
          "url": "",
          "kind": "docs"
        }
      ],
      "status": "Działające MVP",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "",
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
          "title": "Instalator / build desktop",
          "description": "Tutaj możesz dodać paczkę macOS, Windows albo link do instalatora.",
          "url": "",
          "kind": "download"
        },
        {
          "title": "Repo projektu",
          "description": "Miejsce na kod IDE, launchery i workflow buildów release.",
          "url": "",
          "kind": "repo"
        }
      ],
      "status": "Aktywnie rozwijany",
      "featured": false,
      "demoUrl": "",
      "repoUrl": "",
      "coverA": "#0f766e",
      "coverB": "#1d4ed8"
    }
  ]
};
