# RGB BLE Controller App

Aplikacja Flutter na Androida do sterowania dioda RGB przez BLE.

## Co potrafi

- skanuje urzadzenia BLE reklamujace usluge RGB
- laczy sie z `ESP32-C3 RGB`
- steruje kolorem przez 3 suwaki `R/G/B`
- ma presety kolorow i przycisk `Wlacz/Wylacz`
- korzysta z natywnego BLE w Androidzie przez `MethodChannel/EventChannel`

## Wymagane firmware

Ta aplikacja jest sparowana z firmware z katalogu:

- `../esp32_c3_rgb_ble_controller`

UUID musza sie zgadzac:

- service: `7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0001`
- characteristic: `7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0002`

## Uruchomienie

```bash
flutter run
```

## Budowanie APK

```bash
flutter build apk --release
```

Wynikowy plik trafia tutaj:

- `build/app/outputs/flutter-apk/app-release.apk`
- kopia robocza: `output/RGB-BLE-Controller-release.apk`

## Launcher macOS

W repo:

- `launcher/macos/launch.command`

W gotowej paczce:

- `output/RGB-BLE-Launcher-macos.command`
- `output/RGB-BLE-macOS-package.zip`
- `output/RGB-BLE-macOS-package.dmg`

Launcher z paczki jest samowystarczalny: otwiera katalog z APK, README aplikacji i folder firmware ESP32 bez zaleznosci od struktury calego repo.

## Android permissions

Aplikacja prosi o:

- `BLUETOOTH_SCAN`
- `BLUETOOTH_CONNECT`
- `ACCESS_FINE_LOCATION` na Androidzie 11 i starszym

## Uzycie

1. Wgraj firmware na `ESP32-C3 SuperMini`.
2. Wlacz aplikacje.
3. Nadaj uprawnienia BLE.
4. Wlacz Bluetooth w telefonie.
5. Kliknij `Skanuj`.
6. Polacz z `ESP32-C3 RGB`.
7. Steruj kolorem suwakami albo presetami.
