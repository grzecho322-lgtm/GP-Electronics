#include <ctype.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const uint8_t RED_PIN = 9;
const uint8_t GREEN_PIN = 10;
const uint8_t BLUE_PIN = 11;

const bool COMMON_ANODE = false;

const unsigned long SERIAL_BAUD = 115200;
const unsigned long FADE_INTERVAL_MS = 15;
const unsigned long DEMO_INTERVAL_MS = 2500;
const uint8_t FADE_STEP = 4;

const size_t COMMAND_BUFFER_SIZE = 40;

struct RgbColor {
  uint8_t red;
  uint8_t green;
  uint8_t blue;
};

RgbColor currentColor = {0, 0, 0};
RgbColor targetColor = {255, 0, 0};
RgbColor savedColor = {255, 0, 0};

bool demoMode = true;

char commandBuffer[COMMAND_BUFFER_SIZE];
size_t commandLength = 0;

unsigned long lastFadeUpdateMs = 0;
unsigned long lastDemoUpdateMs = 0;
uint8_t demoIndex = 0;

const RgbColor DEMO_COLORS[] = {
  {255, 0, 0},
  {0, 255, 0},
  {0, 0, 255},
  {255, 255, 0},
  {0, 255, 255},
  {255, 0, 255},
  {255, 255, 255}
};

const size_t DEMO_COLOR_COUNT = sizeof(DEMO_COLORS) / sizeof(DEMO_COLORS[0]);

uint8_t applyCommonMode(uint8_t value) {
  return COMMON_ANODE ? static_cast<uint8_t>(255 - value) : value;
}

void writeLed(const RgbColor &color) {
  analogWrite(RED_PIN, applyCommonMode(color.red));
  analogWrite(GREEN_PIN, applyCommonMode(color.green));
  analogWrite(BLUE_PIN, applyCommonMode(color.blue));
}

bool isZeroColor(const RgbColor &color) {
  return color.red == 0 && color.green == 0 && color.blue == 0;
}

void rememberColor(const RgbColor &color) {
  if (!isZeroColor(color)) {
    savedColor = color;
  }
}

void setTargetColor(const RgbColor &color, bool storeColor) {
  targetColor = color;
  if (storeColor) {
    rememberColor(color);
  }
}

uint8_t stepChannel(uint8_t currentValue, uint8_t targetValue) {
  if (currentValue == targetValue) {
    return currentValue;
  }

  if (currentValue < targetValue) {
    uint16_t nextValue = currentValue + FADE_STEP;
    return nextValue > targetValue ? targetValue : static_cast<uint8_t>(nextValue);
  }

  int16_t nextValue = currentValue - FADE_STEP;
  return nextValue < targetValue ? targetValue : static_cast<uint8_t>(nextValue);
}

void updateFade() {
  unsigned long now = millis();
  if (now - lastFadeUpdateMs < FADE_INTERVAL_MS) {
    return;
  }

  lastFadeUpdateMs = now;
  currentColor.red = stepChannel(currentColor.red, targetColor.red);
  currentColor.green = stepChannel(currentColor.green, targetColor.green);
  currentColor.blue = stepChannel(currentColor.blue, targetColor.blue);
  writeLed(currentColor);
}

void printColor(const RgbColor &color) {
  Serial.print(F("RGB "));
  Serial.print(color.red);
  Serial.print(F(" "));
  Serial.print(color.green);
  Serial.print(F(" "));
  Serial.println(color.blue);
}

void printHelp() {
  Serial.println(F("Arduino RGB LED controller"));
  Serial.println(F("Commands:"));
  Serial.println(F("  SET R G B     -> example: SET 255 120 0"));
  Serial.println(F("  R,G,B         -> example: 0,64,255"));
  Serial.println(F("  HEX RRGGBB    -> example: HEX FF00AA"));
  Serial.println(F("  #RRGGBB       -> example: #00FF44"));
  Serial.println(F("  ON            -> restore last saved color"));
  Serial.println(F("  OFF           -> turn LED off"));
  Serial.println(F("  DEMO          -> start color cycle"));
  Serial.println(F("  STOP          -> stop demo and keep current target"));
  Serial.println(F("  HELP          -> print this help"));
  Serial.println();
}

void trimInPlace(char *text) {
  size_t start = 0;
  size_t end = strlen(text);

  while (text[start] != '\0' && isspace(static_cast<unsigned char>(text[start]))) {
    start++;
  }

  while (end > start && isspace(static_cast<unsigned char>(text[end - 1]))) {
    end--;
  }

  if (start > 0) {
    memmove(text, text + start, end - start);
  }

  text[end - start] = '\0';
}

void toUpperInPlace(char *text) {
  for (size_t i = 0; text[i] != '\0'; i++) {
    text[i] = static_cast<char>(toupper(static_cast<unsigned char>(text[i])));
  }
}

bool isByteValue(int value) {
  return value >= 0 && value <= 255;
}

bool parseRgbTriplet(const char *text, RgbColor &color) {
  int red = -1;
  int green = -1;
  int blue = -1;

  if (sscanf(text, "%d,%d,%d", &red, &green, &blue) == 3 ||
      sscanf(text, "%d %d %d", &red, &green, &blue) == 3) {
    if (isByteValue(red) && isByteValue(green) && isByteValue(blue)) {
      color.red = static_cast<uint8_t>(red);
      color.green = static_cast<uint8_t>(green);
      color.blue = static_cast<uint8_t>(blue);
      return true;
    }
  }

  return false;
}

bool parseHexColor(const char *text, RgbColor &color) {
  if (strlen(text) != 6) {
    return false;
  }

  char *end = nullptr;
  long value = strtol(text, &end, 16);
  if (end == nullptr || *end != '\0' || value < 0 || value > 0xFFFFFF) {
    return false;
  }

  color.red = static_cast<uint8_t>((value >> 16) & 0xFF);
  color.green = static_cast<uint8_t>((value >> 8) & 0xFF);
  color.blue = static_cast<uint8_t>(value & 0xFF);
  return true;
}

void handleCommand(char *command) {
  trimInPlace(command);
  if (command[0] == '\0') {
    return;
  }

  toUpperInPlace(command);

  if (strcmp(command, "HELP") == 0) {
    printHelp();
    return;
  }

  if (strcmp(command, "DEMO") == 0) {
    demoMode = true;
    setTargetColor(DEMO_COLORS[demoIndex], true);
    Serial.println(F("Demo mode: ON"));
    return;
  }

  if (strcmp(command, "STOP") == 0) {
    demoMode = false;
    Serial.println(F("Demo mode: OFF"));
    return;
  }

  if (strcmp(command, "OFF") == 0) {
    demoMode = false;
    const RgbColor offColor = {0, 0, 0};
    setTargetColor(offColor, false);
    Serial.println(F("LED: OFF"));
    return;
  }

  if (strcmp(command, "ON") == 0) {
    demoMode = false;
    setTargetColor(savedColor, false);
    Serial.print(F("LED: ON -> "));
    printColor(savedColor);
    return;
  }

  RgbColor parsedColor = {0, 0, 0};

  if (strncmp(command, "SET ", 4) == 0 && parseRgbTriplet(command + 4, parsedColor)) {
    demoMode = false;
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (command[0] == '#' && parseHexColor(command + 1, parsedColor)) {
    demoMode = false;
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (strncmp(command, "HEX ", 4) == 0 && parseHexColor(command + 4, parsedColor)) {
    demoMode = false;
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (parseRgbTriplet(command, parsedColor)) {
    demoMode = false;
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  Serial.print(F("Unknown command: "));
  Serial.println(command);
  printHelp();
}

void readSerialCommands() {
  while (Serial.available() > 0) {
    char received = static_cast<char>(Serial.read());

    if (received == '\r') {
      continue;
    }

    if (received == '\n') {
      commandBuffer[commandLength] = '\0';
      handleCommand(commandBuffer);
      commandLength = 0;
      continue;
    }

    if (commandLength < COMMAND_BUFFER_SIZE - 1) {
      commandBuffer[commandLength++] = received;
    }
  }
}

void updateDemo() {
  if (!demoMode) {
    return;
  }

  unsigned long now = millis();
  if (now - lastDemoUpdateMs < DEMO_INTERVAL_MS) {
    return;
  }

  lastDemoUpdateMs = now;
  demoIndex = static_cast<uint8_t>((demoIndex + 1) % DEMO_COLOR_COUNT);
  setTargetColor(DEMO_COLORS[demoIndex], true);
}

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

  writeLed(currentColor);

  Serial.begin(SERIAL_BAUD);
  while (!Serial && millis() < 2000) {
    delay(10);
  }

  printHelp();
  setTargetColor(DEMO_COLORS[demoIndex], true);
}

void loop() {
  readSerialCommands();
  updateDemo();
  updateFade();
}
