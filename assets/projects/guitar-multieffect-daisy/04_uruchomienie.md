# 04. Uruchomienie

## Krok 1: przygotuj toolchain

Zainstaluj oficjalny toolchain Daisy zgodnie z dokumentacją `Electro-Smith`.

Potrzebujesz:
- `libDaisy`
- `DaisySP`
- kompilator `arm-none-eabi`
- narzędzie do flashowania przez `DFU` albo `ST-Link`

## Krok 2: ustaw ścieżki do bibliotek

W katalogu `firmware/` możesz użyć:

```bash
export LIBDAISY_DIR=/sciezka/do/libDaisy
export DAISYSP_DIR=/sciezka/do/DaisySP
make
```

## Krok 3: skompiluj

W katalogu `firmware/`:

```bash
make
```

## Krok 4: wgraj firmware

Najprościej:

- przez `Daisy Web Programmer`
- albo `make program-dfu`, jeśli masz skonfigurowany DFU
- albo przez `ST-Link`

## Krok 5: pierwszy test

Kolejność testów:

1. Uruchom sam bypass i czysty sygnał.
2. Sprawdź, czy `Drive` zmienia ilość przesteru.
3. Sprawdź `Tone`.
4. Przełączaj `Mod Mode`.
5. Zwiększ `Time` i `Mix`, żeby usłyszeć delay i reverb.
6. Przełączaj presety.

## Jeśli coś nie działa

Najczęstsze przyczyny:

- gitara wpięta bez bufora wejściowego
- źle podłączona masa
- zamienione nóżki potencjometru
- switch bez wspólnej masy
- przester na wejściu analogowym przed ADC

## Co poprawić po pierwszym uruchomieniu

- dodać zapis presetów do pamięci
- dodać OLED i nazwę presetu
- dodać hardware true bypass
- zaprojektować PCB
