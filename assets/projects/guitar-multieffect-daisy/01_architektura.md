# 01. Architektura

## Cel

Budujemy własny cyfrowy efekt gitarowy w formie stompboxa z jednym głównym łańcuchem DSP i prostym sterowaniem.

## Etapy projektu

### Etap 1: prototyp

Na tym etapie potrzebujesz:
- `Daisy Seed` albo `Daisy Pod`
- potencjometrów na przewodach
- 3 przycisków chwilowych
- prostego bufora wejściowego dla gitary

Cel etapu:
- uruchomić czysty sygnał
- potwierdzić działanie potencjometrów i footswitchy
- przetestować cały łańcuch DSP

### Etap 2: stompbox docelowy

Na tym etapie dodajesz:
- własną płytkę lub perfboard
- gniazda `jack 6.3 mm`
- zasilanie `9V DC`
- metalową obudowę
- finalne okablowanie

## Tor sygnałowy

```text
Gitara
  -> bufor wejściowy 1 MOhm
  -> Daisy audio in
  -> noise gate
  -> compressor
  -> overdrive
  -> filtr tone
  -> modulation (chorus / phaser / tremolo)
  -> ping-pong delay
  -> stereo reverb
  -> output level
  -> Daisy audio out
  -> wyjście do wzmacniacza / interfejsu
```

## Sterowanie

### Potencjometry

- `P1 Drive`: ilość przesteru
- `P2 Tone`: jasność brzmienia
- `P3 Mod`: szybkość i głębokość modulacji
- `P4 Time`: czas delaya
- `P5 Mix`: ilość efektu
- `P6 Level`: poziom wyjściowy

### Footswitche

- `SW1`: bypass programowy
- `SW2`: zmiana typu modulacji
- `SW3`: zmiana presetu

## Presety w tej wersji

- `Studio Clean`
- `Crunch Rhythm`
- `Lead Echo`
- `Ambient Wash`

Presety nie zapisują jeszcze ustawień do pamięci trwałej. Na razie wpływają na wewnętrzne voicingi efektu: charakter drive, głębokość kompresji, ilość delay/reverb i domyślny typ modulacji.

## Założenia sprzętowe

- mono input z gitary
- stereo output z DSP
- zasilanie pedałowe `9V`
- sterowanie na pinach ADC i GPIO Daisy
- brak ekranu w pierwszej wersji

## Dlaczego taki zakres

Taki MVP jest dużo bardziej realistyczny niż od razu:
- looper
- IR cab sim
- MIDI
- preset manager z ekranem
- USB audio editor

Najpierw warto mieć stabilny i brzmiący rdzeń. Reszta może dojść później.
