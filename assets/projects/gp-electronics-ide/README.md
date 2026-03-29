# GP Electronics IDE

Desktop IDE shell for embedded workflows built with Flutter + PlatformIO.

## Current Scope

- Desktop-only UI (macOS / Windows / Linux)
- PlatformIO project creation from board presets
- Actions: Build / Upload / Monitor
- Integrated `src/main.cpp` editor (load / edit / save)

## Board Presets (UI)

- ESP32-C3 DevKitM-1
- ESP32-S3 DevKitC-1
- STM32 Nucleo F446RE
- STM32 Blue Pill F103C8
- AVR Arduino Uno
- AVR Arduino Nano (ATmega328)

## Requirements

- Flutter SDK in `PATH`
- PlatformIO (`pio`) in `PATH` or set `PIO_BIN`

## Launcher

Use ready scripts from [`launcher/README.md`](/Users/grzegorzpyda/development/gp_electronics_ide_local/launcher/README.md):

- macOS dev: `launcher/macos/launch.command`
- macOS release build: `launcher/macos/build_release.command`
- Windows dev: `launcher\\windows\\launch.bat` or `launcher\\windows\\launch.ps1`
- Windows release build: `launcher\\windows\\build_release.bat`
- Release packages are generated in `release/macos/...` and `release/windows/...`.

## Manual Run

```bash
flutter pub get
flutter run -d macos
```

## Manual Build

```bash
flutter build macos --release
```

## Windows EXE

Native `gp_electronics_ide.exe` must be built on Windows.

- Local Windows build: `launcher\\windows\\build_release.bat`
- Local Windows installer: `launcher\\windows\\build_installer.bat`
- GitHub Actions build: `.github/workflows/windows_release.yml`
- Workflow artifacts:
  - packaged folder with `app\\gp_electronics_ide.exe` and `launch.bat`
  - ready `.zip`
  - installer `.exe`

Windows release artifact path:

`build\\windows\\x64\\runner\\Release\\gp_electronics_ide.exe`

Packaged release output:

- macOS: `release/macos/gp_electronics_ide_macos_<timestamp>/`
- Windows: `release\\windows\\gp_electronics_ide_windows_<timestamp>\\`
