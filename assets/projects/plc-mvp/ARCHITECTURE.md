# Architecture (MVP)

## Runtime

- Single cyclic task with deterministic scan loop.
- Cycle stages:
  1. Input sampling into process image (`%IX`).
  2. Program execution over bytecode VM.
  3. Output commit from process image (`%QX`).
- Optional host communication runtime:
  - Modbus TCP slave (MBAP, FC `1/2/3/4/5/6/15/16`)
  - Modbus RTU slave (CRC16, FC `1/2/3/4/5/6/15/16`)
  - Runtime map loaded from `runtime_modbus_map.json` (or default fallback map).

## Memory model

- Inputs: read-only in scan (`IX` area)
- Outputs: write-only target area (`QX` area)
- Globals: persistent/retained variable table (`GV` area)
- Timers/counters: FB instance state (`FB` area)

## Toolchain

- `compiler/`: ST-lite source -> typed AST -> bytecode image
- `firmware/`: bytecode VM + IO abstraction + diagnostics
- `tests/`: parser/typecheck/bytecode tests and ST fixtures
