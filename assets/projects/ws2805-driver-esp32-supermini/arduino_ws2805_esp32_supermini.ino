#include <Arduino.h>

#if !defined(ARDUINO_ARCH_ESP32)
#error This sketch requires an ESP32 board package.
#endif

// Requires Arduino ESP32 core 3.x, which provides the pin-based RMT API.

namespace {

constexpr uint8_t WS2805_PIN = 4;
constexpr uint16_t PIXEL_COUNT = 10;
constexpr uint32_t SERIAL_BAUD = 115200;
constexpr uint32_t RMT_TICK_HZ = 20000000;  // 50 ns per tick.
constexpr uint16_t RESET_TIME_US = 300;

constexpr size_t CHANNELS_PER_PIXEL = 5;  // R, G, B, W1, W2
constexpr size_t BITS_PER_CHANNEL = 8;
constexpr size_t BITS_PER_PIXEL = CHANNELS_PER_PIXEL * BITS_PER_CHANNEL;
constexpr size_t TOTAL_SYMBOLS = PIXEL_COUNT * BITS_PER_PIXEL;

// WS2805 timing from the datasheet:
// T0H: 220-380 ns, T1H: 580 ns-1 us, T0L/T1L: 580 ns-1 us, reset > 280 us.
// Using a 20 MHz RMT clock lets us keep the full bit time at 1.25 us.
constexpr uint16_t BIT0_HIGH_TICKS = 6;   // 300 ns
constexpr uint16_t BIT0_LOW_TICKS = 19;   // 950 ns
constexpr uint16_t BIT1_HIGH_TICKS = 13;  // 650 ns
constexpr uint16_t BIT1_LOW_TICKS = 12;   // 600 ns

struct Ws2805Pixel {
  uint8_t red;
  uint8_t green;
  uint8_t blue;
  uint8_t whiteWarm;
  uint8_t whiteCold;
};

Ws2805Pixel pixels[PIXEL_COUNT];
rmt_data_t symbols[TOTAL_SYMBOLS];

void encodeByte(uint8_t value, size_t &symbolIndex) {
  for (int bit = 7; bit >= 0; --bit) {
    const bool isOne = (value & (1 << bit)) != 0;

    symbols[symbolIndex].level0 = 1;
    symbols[symbolIndex].duration0 = isOne ? BIT1_HIGH_TICKS : BIT0_HIGH_TICKS;
    symbols[symbolIndex].level1 = 0;
    symbols[symbolIndex].duration1 = isOne ? BIT1_LOW_TICKS : BIT0_LOW_TICKS;
    symbolIndex++;
  }
}

void encodeFrame() {
  size_t symbolIndex = 0;

  for (size_t i = 0; i < PIXEL_COUNT; ++i) {
    // WS2805 expects RGBW1W2, MSB first.
    encodeByte(pixels[i].red, symbolIndex);
    encodeByte(pixels[i].green, symbolIndex);
    encodeByte(pixels[i].blue, symbolIndex);
    encodeByte(pixels[i].whiteWarm, symbolIndex);
    encodeByte(pixels[i].whiteCold, symbolIndex);
  }
}

bool showPixels() {
  encodeFrame();

  const bool ok = rmtWrite(WS2805_PIN, symbols, TOTAL_SYMBOLS, RMT_WAIT_FOR_EVER);
  delayMicroseconds(RESET_TIME_US);
  return ok;
}

void setPixel(size_t index, uint8_t red, uint8_t green, uint8_t blue, uint8_t whiteWarm, uint8_t whiteCold) {
  if (index >= PIXEL_COUNT) {
    return;
  }

  pixels[index].red = red;
  pixels[index].green = green;
  pixels[index].blue = blue;
  pixels[index].whiteWarm = whiteWarm;
  pixels[index].whiteCold = whiteCold;
}

void fillPixels(uint8_t red, uint8_t green, uint8_t blue, uint8_t whiteWarm, uint8_t whiteCold) {
  for (size_t i = 0; i < PIXEL_COUNT; ++i) {
    setPixel(i, red, green, blue, whiteWarm, whiteCold);
  }
}

void clearPixels() {
  fillPixels(0, 0, 0, 0, 0);
}

void printSetupHints() {
  Serial.println();
  Serial.println(F("WS2805 driver for ESP32 Super Mini"));
  Serial.print(F("DATA pin: GPIO"));
  Serial.println(WS2805_PIN);
  Serial.print(F("Pixels: "));
  Serial.println(PIXEL_COUNT);
  Serial.println(F("Color order sent: R,G,B,W1,W2"));
  Serial.println(F("Use a 74AHCT125 / 74HCT14 level shifter if the strip expects 5V logic."));
  Serial.println();
}

void showStep(uint8_t red, uint8_t green, uint8_t blue, uint8_t whiteWarm, uint8_t whiteCold, const __FlashStringHelper *label) {
  fillPixels(red, green, blue, whiteWarm, whiteCold);
  if (!showPixels()) {
    Serial.println(F("RMT write failed"));
    return;
  }

  Serial.print(F("Now showing: "));
  Serial.println(label);
}

}  // namespace

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(250);

  pinMode(WS2805_PIN, OUTPUT);
  digitalWrite(WS2805_PIN, LOW);

  if (!rmtInit(WS2805_PIN, RMT_TX_MODE, RMT_MEM_NUM_BLOCKS_1, RMT_TICK_HZ)) {
    Serial.println(F("RMT init failed"));
    while (true) {
      delay(1000);
    }
  }

  rmtSetEOT(WS2805_PIN, LOW);

  printSetupHints();
  clearPixels();
  showPixels();
}

void loop() {
  showStep(255, 0, 0, 0, 0, F("red"));
  delay(1200);

  showStep(0, 255, 0, 0, 0, F("green"));
  delay(1200);

  showStep(0, 0, 255, 0, 0, F("blue"));
  delay(1200);

  showStep(0, 0, 0, 255, 0, F("warm white (W1)"));
  delay(1200);

  showStep(0, 0, 0, 0, 255, F("cold white (W2)"));
  delay(1200);

  showStep(255, 80, 0, 90, 30, F("mixed warm"));
  delay(1200);

  showStep(20, 80, 255, 10, 150, F("mixed cold"));
  delay(1200);

  clearPixels();
  showPixels();
  delay(800);
}
