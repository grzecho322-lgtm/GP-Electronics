# Cyfrowy Multi-Effect Gitarowy na Daisy Seed

Ten katalog to kompletny starter projektu własnego cyfrowego efektu gitarowego typu `multi-effect` na `Electro-Smith Daisy Seed`.

W środku masz:
- architekturę urządzenia i kolejność prac
- listę części do prototypu i wersji docelowej
- opis okablowania i toru audio
- starter firmware w `C++` dla `Daisy Seed`

## Co budujemy

MVP tego projektu ma:
- wejście gitarowe o wysokiej impedancji
- cyfrowy łańcuch: `gate -> compressor -> drive -> modulation -> delay -> reverb`
- `6` potencjometrów
- `3` footswitche
- tryb `bypass` programowy
- kilka gotowych presetów brzmieniowych

## Kolejność działania

Najprostsza i najbezpieczniejsza ścieżka:

1. Zbuduj i uruchom firmware na `Daisy Seed` albo `Daisy Pod`.
2. Zrób prostą płytkę wejściową z buforem `1 MOhm` dla gitary.
3. Podłącz potencjometry i footswitche według pliku okablowania.
4. Sprawdź czysty sygnał i dopiero potem kolejne bloki DSP.
5. Przenieś całość do obudowy stompbox.

## Ważna uwaga o torze audio

`Daisy Seed` ma audio `24-bit` i wejścia/wyjścia AC-coupled, ale nie jest to gotowe wejście instrumentowe dla pasywnej gitary. Dlatego w wersji docelowej potrzebujesz własnego bufora wejściowego o wysokiej impedancji.

## Struktura katalogu

- `docs/01_architektura.md`
- `docs/02_bom.md`
- `docs/03_okablowanie.md`
- `docs/04_uruchomienie.md`
- `docs/05_lista_elementow.md`
- `firmware/Makefile`
- `firmware/src/main.cpp`

## Co dalej

Jeśli chcesz rozwinąć ten projekt po pierwszym uruchomieniu, następne sensowne kroki to:
- zapis presetów do pamięci
- OLED i enkoder
- hardware true bypass
- osobna płytka PCB w `KiCad`
