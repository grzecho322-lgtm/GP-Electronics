# WS2805 driver for ESP32 Super Mini

Gotowy szkic Arduino dla `ESP32 Super Mini`, ktory wysyla dane do `WS2805` przez `RMT`.

Szkic jest przygotowany pod `arduino-esp32 3.x`. W starszym `2.x` API `RMT` wyglada inaczej.

## Co obsluguje

- `WS2805` w kolejnosci `R,G,B,W1,W2`
- 40 bitow na piksel
- latch po stanie niskim `>280 us`
- test wszystkich 5 kanalow po kolei

## Domyslna konfiguracja

- pin danych: `GPIO4`
- liczba pikseli: `10`

Zmien te stale w pliku szkicu:

```cpp
constexpr uint8_t WS2805_PIN = 4;
constexpr uint16_t PIXEL_COUNT = 10;
```

## Podlaczenie

- `ESP32 GPIO4` -> `DIN` paska / modulu `WS2805`
- `GND ESP32` -> `GND` paska
- zasilacz paska -> zgodnie z paskiem, zwykle `12V` albo `24V`

Jesli Twoj pasek ma `BI/BIN` jako zapasowe wejscie danych, najprosciej podaj ten sam sygnal co na `DIN`.

## Bardzo wazne

ESP32 pracuje na `3.3V`, a datasheet `WS2805` podaje `VIH = 0.7 * VDD`. Przy logice `5V` oznacza to, ze `3.3V` moze byc niestabilne. Najbezpieczniej dodac konwerter poziomow `3.3V -> 5V`, np.:

- `74AHCT125`
- `74HCT14`

## Arduino IDE

1. Wybierz plytke z rodziny `ESP32`.
2. Otworz `arduino_ws2805_esp32_supermini.ino`.
3. Ustaw poprawny port.
4. Wgraj szkic.

## Jak sprawdzic kolejnosc kolorow

Po uruchomieniu szkic pokazuje kolejno:

1. czerwony
2. zielony
3. niebieski
4. `W1`
5. `W2`
6. dwa kolory mieszane

Jesli kolory nie zgadzaja sie z rzeczywistoscia, zmien kolejnosc bajtow w funkcji `encodeFrame()`.
