# Arduino RGB LED Controller

Prosty sterownik RGB LED dla Arduino Uno/Nano.

## Co robi

- steruje dioda RGB przez 3 wyjscia PWM
- po starcie uruchamia tryb demo i zmienia kolory plynnie
- pozwala ustawic kolor przez Serial Monitor
- obsluguje wpisywanie koloru jako `R,G,B`, `SET R G B` albo `HEX RRGGBB`

## Domyslne piny

- `D9` -> kanal czerwony
- `D10` -> kanal zielony
- `D11` -> kanal niebieski

Jesli uzywasz diody `common anode`, ustaw w pliku szkicu:

```cpp
const bool COMMON_ANODE = true;
```

## Przykladowe podlaczenie

Dla osobnych kanalow RGB uzyj rezystorow, np. `220 ohm` dla kazdego koloru.

- `D9` -> rezystor -> `R`
- `D10` -> rezystor -> `G`
- `D11` -> rezystor -> `B`
- wspolna noga LED:
  - `GND` dla `common cathode`
  - `5V` dla `common anode`

## Komendy Serial

Ustaw Serial Monitor na `115200 baud` i zakonczanie linii `Newline`.

```text
255,0,0
SET 0 255 128
HEX FF00AA
#00A0FF
ON
OFF
DEMO
STOP
HELP
```

## Pliki

- `arduino_rgb_led_controller.ino` -> glowny szkic

