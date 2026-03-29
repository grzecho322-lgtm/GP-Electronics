# Firmware Target Profiles

This project now supports one command-based entrypoint for firmware builds:

```bash
./scripts/build_firmware_target.sh --target <profile>
```

## Profiles

- `host`
  - Native host executable for local simulation and e2e tests.
  - Main source: `main_host.c`
  - IO source: `plc_io_host_stub.c`

- `arduino-uno` / `avr-atmega328p`
  - AVR profile for ATmega328P class boards/chips.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `arduino-nano`
  - AVR profile for Arduino Nano (ATmega328P, bootloader flow).
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `arduino-leonardo` / `avr-atmega32u4`
  - AVR profile for ATmega32U4 class boards/chips.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `arduino-mega2560` / `avr-atmega2560`
  - AVR profile for ATmega2560 class boards/chips.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `stm32f103c8`
  - ARM Cortex-M3 scaffold profile.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `stm32f411re`
  - ARM Cortex-M4 scaffold profile.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `stm32h743zi`
  - ARM Cortex-M7 scaffold profile.
  - Main source: `main_embedded.c`
  - IO source: `plc_io_embedded_stub.c`

- `raspberry-pi`
  - Linux ARM profile (cross compile or native on ARM host).
  - Main source: `main_host.c`
  - IO source: `plc_io_host_stub.c`

## Aliases

- `arduino` -> `arduino-uno`
- `avr` -> `avr-atmega328p`
- `nano` -> `arduino-nano`
- `leonardo` -> `arduino-leonardo`
- `stm32` -> `stm32h743zi`
- `f411` -> `stm32f411re`
- `rpi` -> `raspberry-pi`

## Toolchain requirements

- `host`: native `gcc/clang` + `cmake`
- AVR: `avr-gcc`
- STM32: `arm-none-eabi-gcc`
- Raspberry Pi cross build on non-ARM host: `aarch64-linux-gnu-gcc`
- AVR flash (Uno/Nano/Leonardo/Mega bootloader): `avrdude`
- STM32 flash: `st-flash` (from `stlink`) or `openocd`

## Build output

- Host profile: `build/firmware/plc_firmware`
- Other profiles: `build/firmware-<profile>/plc_firmware`
- AVR profiles also generate: `build/firmware-<profile>/plc_firmware.hex`
- STM32 profiles also generate: `build/firmware-<profile>/plc_firmware.bin`

## Host/RPi Modbus runtime

`main_host.c` now supports real Modbus slave runtime in firmware loop:

- Modbus TCP (`PLC_MODBUS_MODE=tcp`, endpoint `host:port`)
- Modbus RTU (`PLC_MODBUS_MODE=rtu`, endpoint `/dev/ttyUSB0:115200`)
- Function codes: `1/2/3/4/5/6/15/16`

Environment flags:

- `PLC_MODBUS_ENABLE=1` enables runtime server
- `PLC_MODBUS_MODE=tcp|rtu`
- `PLC_MODBUS_ENDPOINT=<endpoint>`
- `PLC_MODBUS_UNIT_ID=<1..247>` (default `1`)
- `PLC_MODBUS_MAP_PATH=<path to runtime_modbus_map.json>`
- `PLC_SCAN_COUNT=0` for continuous scan loop

## AVR flashing (Uno/Nano/Leonardo/Mega)

Use the one-step build + flash script:

```bash
./scripts/flash_firmware_avr.sh --board uno --port /dev/cu.usbmodem1101
./scripts/flash_firmware_avr.sh --board nano --port /dev/cu.usbmodem1101
./scripts/flash_firmware_avr.sh --board leonardo --port /dev/cu.usbmodem1101
./scripts/flash_firmware_avr.sh --board mega2560 --port /dev/cu.usbmodem1101
```

Useful options:

- `--port auto` auto-selects first detected serial port.
- `--no-build` flashes existing `.hex` without rebuilding.
- `--programmer <id>` selects non-default `avrdude` programmer.
- `--baud <rate>` overrides default upload baudrate.

## STM32 flashing (F103/F411/H743)

Use the one-step build + flash script:

```bash
./scripts/flash_firmware_stm32.sh --board f103
./scripts/flash_firmware_stm32.sh --board f411
./scripts/flash_firmware_stm32.sh --board h743
```

Useful options:

- `--tool auto|st-flash|openocd` selects flash backend.
- `--flash-address <addr>` overrides flash base address.
- `--no-build` flashes existing `.bin` without rebuilding.

## Current limitations

- AVR flashing currently targets bootloader-based upload flow (Uno/Nano/Leonardo/Mega).
- STM32 flashing supports ST-LINK/OpenOCD transport, while board IO/HAL is still scaffold-level.
- Raspberry Pi flow currently builds portable artifacts (`plc_firmware`) without remote flash/deploy transport.
- IO layers for AVR/STM32 remain placeholders (`plc_io_embedded_stub.c`).
- This stage focuses on portable runtime build scaffolding per target family.
