# 03. Okablowanie

## Założenie

W tym starterze kod zakłada następujące przypisanie pinów `Daisy Seed`.

### Potencjometry

- `A0`: Drive
- `A1`: Tone
- `A2`: Mod
- `A3`: Time
- `A4`: Mix
- `A5`: Level

### Footswitche

- `D0`: Bypass
- `D1`: Mod Mode
- `D2`: Preset

Jeśli w swojej płytce chcesz użyć innych pinów, zmieniasz tylko sekcję pinów na początku pliku `firmware/src/main.cpp`.

## Jak podłączyć potencjometry

Każdy potencjometr:

- lewy pin do `3V3`
- prawy pin do `GND`
- środkowy pin do wejścia ADC

Jeśli po uruchomieniu gałka działa "odwrotnie", zamień skrajne nóżki miejscami albo użyj odwrócenia w kodzie.

## Jak podłączyć footswitche

Każdy footswitch chwilowy:

- jedna nóżka do pinu GPIO
- druga nóżka do `GND`

W firmware są użyte wewnętrzne `pull-up`, więc pin w stanie spoczynku jest wysoki, a po naciśnięciu spada do `GND`.

## Wejście gitarowe

Najprostsza bezpieczna wersja:

```text
jack input
  -> rezystor 1 MOhm do masy
  -> bufor op-amp high-Z
  -> ograniczenie poziomu / unity gain lub lekki boost
  -> kondensator sprzęgający
  -> Daisy audio in L
```

Ważne:
- nie wpinasz pasywnej gitary bezpośrednio w "gołe" wejście bez bufora
- sygnał powinien być czysty i bez przesterowania na wejściu przetwornika

## Wyjście audio

Najprostsza pierwsza wersja:

```text
Daisy audio out L
  -> potencjometr poziomu albo rezystor szeregowy
  -> jack output
```

Jeżeli później będziesz chciał lepsze sterowanie poziomem i niższą impedancję wyjściową, dodaj osobny bufor wyjściowy na op-ampie.

## Masa i prowadzenie przewodów

- wejście audio prowadź przewodem ekranowanym
- masę audio prowadź gwiazdą, nie "łańcuszkiem"
- przewody od footswitchy trzymaj z dala od wejścia audio
- zasilanie i audio rozdziel mechanicznie w obudowie

## Piny jako źródło prawdy

Źródłem prawdy dla projektu jest:
- logika pinów w `firmware/src/main.cpp`

Pin numerowany na nadruku płytki i nazwa logiczna `seed::A0`, `seed::D0` to nie zawsze to samo, więc przed lutowaniem sprawdź aktualny pinout swojej rewizji `Daisy Seed`.
