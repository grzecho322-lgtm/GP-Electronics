# plc-mvp

MVP scaffold for a custom PLC controller and ST-lite language toolchain.

## Scope

- Firmware target profiles: `host`, AVR (`arduino`/`atmega`), STM32, Raspberry Pi (build scaffolds)
- PLC runtime: deterministic scan cycle (`read -> execute -> write`)
- Language: ST-lite subset (Rust compiler) with `IF/ELSE`, `CASE`, `WHILE`, `FOR`, `AND/OR`, `+ - * /`, `= <> < > <= >=`, `%IX/%QX`, and FB calls `TON/TOF/TP/CTU/CTD`
- Tests: compiler unit/integration tests + firmware test placeholders

## Repository layout

```text
plc-mvp/
  docs/                Architecture, bytecode and memory-map notes
  firmware/            C firmware scaffold (runtime + IO stubs)
  compiler/            Rust ST-lite compiler scaffold
  tests/               End-to-end fixtures and placeholders
  scripts/             Convenience scripts for local development
```

## Quick start

### Containerized environment (recommended)

```bash
./scripts/compose.sh up -d --build
./scripts/compose.sh exec dev bash
```

`compose.sh` auto-detects: `docker compose`, `docker-compose`, or Docker Desktop plugin paths.

Inside the container:

```bash
cd /workspace/plc-mvp
./scripts/run_compiler_tests.sh
./scripts/build_firmware.sh
```

To stop the environment:

```bash
./scripts/compose.sh down
```

If `docker` is not found on macOS:

```bash
brew install --cask docker
open -a Docker
```

Wait until Docker Desktop is running, then repeat `./scripts/compose.sh ...`.

### Dev Container (VS Code / Codex-compatible)

- Open the `plc-mvp` folder.
- Reopen in container using `.devcontainer/devcontainer.json`.
- The container includes `cargo`, `cmake`, native build tools, and ARM GCC.

### Local toolchain (alternative)

Install required tools on macOS:

```bash
brew install rust cmake
```

Quick local check:

```bash
./scripts/check_prereqs.sh
```

### Compiler

```bash
cd compiler
cargo test
cargo run -- examples/blink.st --out /tmp/blink.bin
```

### Firmware (host build)

```bash
./scripts/build_firmware.sh
```

### Firmware (multi-target scaffold builds)

```bash
# AVR / Arduino
./scripts/build_firmware_target.sh --target arduino-uno
./scripts/build_firmware_target.sh --target arduino-nano
./scripts/build_firmware_target.sh --target arduino-leonardo
./scripts/build_firmware_target.sh --target avr-atmega328p
./scripts/build_firmware_target.sh --target avr-atmega32u4

# STM32
./scripts/build_firmware_target.sh --target stm32f103c8
./scripts/build_firmware_target.sh --target stm32f411re
./scripts/build_firmware_target.sh --target stm32h743zi

# Raspberry Pi (cross or native on ARM host)
./scripts/build_firmware_target.sh --target raspberry-pi
```

More details: `docs/FIRMWARE_TARGETS.md`.

### Firmware (AVR build + flash: Uno/Nano/Leonardo/Mega)

```bash
# Build + flash Arduino Uno (ATmega328P)
./scripts/flash_firmware_avr.sh --board uno --port /dev/cu.usbmodem1101

# Build + flash Arduino Nano (ATmega328P)
./scripts/flash_firmware_avr.sh --board nano --port /dev/cu.usbmodem1101

# Build + flash Arduino Leonardo (ATmega32U4)
./scripts/flash_firmware_avr.sh --board leonardo --port /dev/cu.usbmodem1101

# Build + flash Arduino Mega 2560 (ATmega2560)
./scripts/flash_firmware_avr.sh --board mega2560 --port /dev/cu.usbmodem1101
```

### Firmware (STM32 build + flash: F103/F411/H743)

```bash
# Build + flash STM32F103C8 (Blue Pill)
./scripts/flash_firmware_stm32.sh --board f103

# Build + flash STM32F411RE (Nucleo / Black Pill)
./scripts/flash_firmware_stm32.sh --board f411

# Build + flash STM32H743ZI (Nucleo)
./scripts/flash_firmware_stm32.sh --board h743
```

### End-to-end check (no Docker)

```bash
./scripts/run_e2e.sh
```

`run_e2e.sh` now also validates safety behavior:

- watchdog trip -> fail-safe outputs forced to safe state (`0x0000`)
- communication timeout (Modbus heartbeat supervision) -> fail-safe outputs forced to safe state

### Modbus runtime E2E (real firmware Modbus TCP path)

```bash
./scripts/run_modbus_e2e.sh
```

This test starts `plc_firmware` in continuous scan mode (`PLC_SCAN_COUNT=0`), enables Modbus runtime,
writes `%IX0.0` via Modbus coil, and verifies `%QX0.0` response from firmware VM.

### Run firmware as Modbus slave (host runtime)

```bash
PLC_MODBUS_ENABLE=1 \
PLC_MODBUS_MODE=tcp \
PLC_MODBUS_ENDPOINT=0.0.0.0:1502 \
PLC_MODBUS_MAP_PATH=build/firmware/runtime_modbus_map.json \
PLC_SCAN_COUNT=0 \
./build/firmware/plc_firmware build/ide/uploaded_program.bin
```

Notes:

- `PLC_SCAN_COUNT=0` = continuous runtime loop.
- Supported transports: `tcp` and `rtu` (`PLC_MODBUS_ENDPOINT` for RTU: `/dev/ttyUSB0:115200`).
- If runtime map file is missing/empty, firmware falls back to a default map:
  - coils `0..15` -> `%QX`
  - discrete inputs `0..15` -> `%IX`
  - holding/input registers `0..255` -> globals `G0..G255`
- Example map fixture: `tests/modbus/runtime_map_tcp.json`
- Safety envs (host runtime):
  - `PLC_FAILSAFE_OUTPUTS=1|0`
  - `PLC_WATCHDOG_LIMIT_MS=<ms>` (default `60`)
  - `PLC_COMM_TIMEOUT_SCANS=<n>` (0 disables heartbeat timeout)
  - `PLC_COMM_SUPERVISION_REQUIRED=1|0` (force heartbeat supervision even without Modbus socket)
  - `PLC_SIMULATE_SCAN_WORK_MS=<ms>` (fault-injection helper for tests)

### GPElectronic PLC IDE (Editor + Online + Diagnostics)

Start local web IDE:

```bash
./scripts/start_ide.sh
```

or use launcher (menu + quick commands):

```bash
./scripts/launcher.sh
```

direct launch command:

```bash
./scripts/launcher.sh ide-open
```

background launch (no terminal window, opens browser):

```bash
./scripts/launcher.sh ide-bg
```

stop background IDE:

```bash
./scripts/launcher.sh ide-stop
```

macOS one-click launchers (double click in Finder):

```text
GPElectronic-PLC-IDE.app
GPElectronic-PLC-IDE.command
```

Note:

- `GPElectronic-PLC-IDE.app` starts IDE in background (without Terminal window).
- `GPElectronic-PLC-IDE.command` opens Terminal by design.
- if `.app` fails to start, check log:
  - `${TMPDIR}/gpelectronic_plc_app.log`
  - `${TMPDIR}/gpelectronic_plc_ide.log`
  - `${TMPDIR}/gpelectronic_plc_ide.pid`
- if Finder still blocks app execution, move `GPElectronic-PLC-IDE.app` to `/Applications` and run it from there.

Windows launchers:

```text
GPElectronic-PLC-IDE.bat        (start IDE + open browser)
GPElectronic-PLC-Launcher.bat   (interactive menu)
launcher/windows/launch_ide_hidden.bat (hidden start, no terminal window)
```

Windows PowerShell launcher:

```powershell
.\scripts\launcher.ps1
.\scripts\launcher.ps1 ide-open
```

Note for Windows pipeline actions (`check/tests/build/e2e`):

- `scripts/launcher.ps1` uses `bash` scripts under `scripts/*.sh`
- install Git for Windows (Git Bash) and ensure `bash.exe` is available in PATH
- hidden launcher utilities are available in `launcher/windows/`

Open:

```text
http://127.0.0.1:8088
```

Available backend endpoints:

- `POST /api/build`
- `POST /api/upload`
- `POST /api/firmware/upload`
- `GET /api/firmware/upload/status`
- `GET /api/firmware/ports`
- `POST /api/run`
- `POST /api/stop`
- `GET /api/watch`
- `POST /api/force`
- `GET /api/diag`
- `POST /api/project/export_package`
- `POST /api/project/release_package`
- `POST /api/project/import_package`
- `POST /api/modbus/map/test`
- `GET /api/modbus/map/runtime`
- `POST /api/modbus/map/runtime`

### IDE workflow (step-by-step, no Docker)

1. Open `Schematic` tab.
2. Pick `Board Pinout` (Arduino/AVR/STM32/RPi/Host).
3. Add blocks:
   - Inputs: `IX`, `SENSOR_*`, `AI` (0-10V / 4-20mA + engineering scale)
   - Logic: `AND`, `OR`, `TON/TOF/TP`, `CTU/CTD`
   - Outputs/actuators: `QX`, `DISPLAY_*`, `SERVO`, `MOTOR`, `VALVE`, `RELAY`, `HBRIDGE`, `BUZZER`, `PWM`, `AQ`
4. Use block buttons:
   - `Pins`: select physical `%IX/%QX` mapping from board-limited pin list
   - `Ports`: set dynamic input/output count on execution blocks
5. Use simulation controls:
   - Input blocks can be toggled `LOW/HIGH`
   - `Simulate Scan` for single pass
   - `Start Auto Scan` for continuous preview
   - HIL 2.0: choose compare source `Runtime Watch` or `Live Hardware (Modbus)` and run signal-by-signal compare with auto-report on fail
   - Timeline + Scenario Assertions validate expected signal state after N scans
6. Use cards (`+ Add Card`) and card metadata to split large projects into clean pages.
7. Use `Generate ST` or `Build From Schematic`.
8. Open `HMI` tab for lamps, gauges, trend, and alarms preview.
9. Open `Communication` tab (Modbus RTU/TCP, CAN, MQTT + Modbus register/coil mapping table).
10. Open `Firmware` tab:
    - choose target (host/boards/raw MCU aliases),
    - upload firmware,
    - monitor bottom progress bar,
    - run `One-Click Deploy` (build -> upload -> run),
    - export firmware package or release package (ZIP + SHA256 + manifest).
11. Use `Diagnostics` tab for runtime log, watchdog and fail-safe/emergency controls.

Cross-target note:

- `host` build is fully runnable in this MVP.
- AVR has a bootloader flash flow (`.hex` + `avrdude`) for Uno/Nano/Leonardo/Mega.
- STM32 has transport-level flash flow (`.bin` + `st-flash`/`openocd`) for F103/F411/H743.
- Raspberry Pi currently uses build/stage artifact flow (no remote deploy transport in this MVP).

## Next implementation steps

1. Replace IO/HAL stubs with real board drivers and 24V isolated IO mapping.
2. Integrate FreeRTOS tasks and watchdog handling.
3. Extend FB support with structured outputs (for example `CV`, `ET`) and edge-case semantics parity with IEC 61131-3.
4. Add program upload protocol and online variable/watch interface.
