# GP Electronics IDE Launcher

## macOS

- Dev run: `launcher/macos/launch.command`
- Release build: `launcher/macos/build_release.command`
- Release package launcher template: `launcher/macos/launch_release.command`

## Windows

- Dev run (CMD): `launcher\\windows\\launch.bat`
- Dev run (PowerShell): `launcher\\windows\\launch.ps1`
- Release build: `launcher\\windows\\build_release.bat`
- Installer build: `launcher\\windows\\build_installer.bat`
- Release package launcher template: `launcher\\windows\\launch_release.bat`

## Notes

- Launcher checks `flutter` availability.
- If `PIO_BIN` is not set, launcher tries common `pio` locations.
- Release build scripts now create packaged outputs:
  - macOS: `release/macos/gp_electronics_ide_macos_<timestamp>/`
  - Windows: `release\\windows\\gp_electronics_ide_windows_<timestamp>\\`
- Windows release build also creates `release\\windows\\gp_electronics_ide_windows_<timestamp>.zip`
- Windows installer output goes to `release\\windows\\installers\\`
- Package includes launcher, `README.md`, and `SMOKE_TEST_CHECKLIST.md`.
