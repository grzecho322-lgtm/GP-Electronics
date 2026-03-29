# ESP32-C3 RGB BLE Controller

Firmware dla `ESP32-C3 SuperMini`, ktory steruje dioda RGB przez PWM i udostepnia sterowanie po BLE.

## Funkcje

- reklama BLE jako `ESP32-C3 RGB`
- usluga BLE do odczytu i zapisu koloru RGB
- plynne przejscia miedzy kolorami
- sterowanie rowniez przez `Serial Monitor`

## BLE UUID

- service: `7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0001`
- characteristic: `7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0002`

Aplikacja Android z folderu `rgb_ble_controller_app` korzysta z dokladnie tych UUID.

## Domyslne piny

- `GPIO3` -> czerwony
- `GPIO4` -> zielony
- `GPIO5` -> niebieski

Jesli Twoja plytka lub okablowanie wymaga innych pinow, zmien stale na gorze szkicu.

Jesli LED jest `common anode`, ustaw:

```cpp
const bool COMMON_ANODE = true;
```

## Format BLE

Najprostszy zapis z aplikacji to 3 bajty:

```text
[R][G][B]
```

Firmware akceptuje tez tekst:

```text
255,0,0
SET 0 255 128
HEX FF00AA
#00A0FF
```

## Serial Monitor

Ustaw `115200 baud` i `Newline`.

Komendy:

- `SET R G B`
- `R,G,B`
- `HEX RRGGBB`
- `#RRGGBB`
- `ON`
- `OFF`
- `HELP`

## Wgranie

W Arduino IDE:

1. wybierz plytke zgodna z `ESP32C3 Dev Module` lub profilem dla Twojego `ESP32-C3 SuperMini`
2. otworz `esp32_c3_rgb_ble_controller.ino`
3. wybierz port USB
4. wgraj szkic

