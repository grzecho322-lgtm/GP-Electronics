#include <BLE2902.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *DEVICE_NAME = "ESP32-C3 RGB";
const char *SERVICE_UUID = "7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0001";
const char *CHARACTERISTIC_UUID = "7bb6db74-6c47-4c6d-8c5d-1f0f7a6e0002";

const uint8_t RED_PIN = 3;
const uint8_t GREEN_PIN = 4;
const uint8_t BLUE_PIN = 5;

const bool COMMON_ANODE = false;

const unsigned long SERIAL_BAUD = 115200;
const unsigned long FADE_INTERVAL_MS = 12;
const uint8_t FADE_STEP = 5;

const size_t COMMAND_BUFFER_SIZE = 48;

struct RgbColor {
  uint8_t red;
  uint8_t green;
  uint8_t blue;
};

BLEServer *bleServer = nullptr;
BLECharacteristic *rgbCharacteristic = nullptr;

RgbColor currentColor = {0, 0, 0};
RgbColor targetColor = {255, 120, 48};
RgbColor lastNonZeroColor = {255, 120, 48};

char commandBuffer[COMMAND_BUFFER_SIZE];
size_t commandLength = 0;

bool bleClientConnected = false;
bool bleClientWasConnected = false;
unsigned long lastFadeUpdateMs = 0;

uint8_t applyCommonMode(uint8_t value) {
  return COMMON_ANODE ? static_cast<uint8_t>(255 - value) : value;
}

bool isZeroColor(const RgbColor &color) {
  return color.red == 0 && color.green == 0 && color.blue == 0;
}

void writeLed(const RgbColor &color) {
  ledcWrite(RED_PIN, applyCommonMode(color.red));
  ledcWrite(GREEN_PIN, applyCommonMode(color.green));
  ledcWrite(BLUE_PIN, applyCommonMode(color.blue));
}

void rememberColor(const RgbColor &color) {
  if (!isZeroColor(color)) {
    lastNonZeroColor = color;
  }
}

void updateCharacteristicValue(const RgbColor &color) {
  if (rgbCharacteristic == nullptr) {
    return;
  }

  uint8_t payload[3] = {color.red, color.green, color.blue};
  rgbCharacteristic->setValue(payload, sizeof(payload));

  if (bleClientConnected) {
    rgbCharacteristic->notify();
  }
}

void setTargetColor(const RgbColor &color, bool storeColor) {
  targetColor = color;
  if (storeColor) {
    rememberColor(color);
  }
  updateCharacteristicValue(color);
}

uint8_t stepChannel(uint8_t currentValue, uint8_t nextValue) {
  if (currentValue == nextValue) {
    return currentValue;
  }

  if (currentValue < nextValue) {
    uint16_t stepped = currentValue + FADE_STEP;
    return stepped > nextValue ? nextValue : static_cast<uint8_t>(stepped);
  }

  int16_t stepped = currentValue - FADE_STEP;
  return stepped < nextValue ? nextValue : static_cast<uint8_t>(stepped);
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
  Serial.println(F("ESP32-C3 RGB BLE controller"));
  Serial.println(F("Serial commands:"));
  Serial.println(F("  SET R G B"));
  Serial.println(F("  R,G,B"));
  Serial.println(F("  HEX RRGGBB"));
  Serial.println(F("  #RRGGBB"));
  Serial.println(F("  ON"));
  Serial.println(F("  OFF"));
  Serial.println(F("  HELP"));
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

bool parseBlePayload(BLECharacteristic *characteristic, RgbColor &color) {
  size_t payloadLength = characteristic->getLength();
  uint8_t *payload = characteristic->getData();

  if (payloadLength == 3 && payload != nullptr) {
    color.red = payload[0];
    color.green = payload[1];
    color.blue = payload[2];
    return true;
  }

  if (payloadLength == 0 || payload == nullptr) {
    return false;
  }

  char textBuffer[COMMAND_BUFFER_SIZE];
  size_t safeLength = payloadLength < COMMAND_BUFFER_SIZE - 1 ? payloadLength : COMMAND_BUFFER_SIZE - 1;
  memcpy(textBuffer, payload, safeLength);
  textBuffer[safeLength] = '\0';
  trimInPlace(textBuffer);
  toUpperInPlace(textBuffer);

  if (strncmp(textBuffer, "SET ", 4) == 0) {
    return parseRgbTriplet(textBuffer + 4, color);
  }

  if (strncmp(textBuffer, "HEX ", 4) == 0) {
    return parseHexColor(textBuffer + 4, color);
  }

  if (textBuffer[0] == '#') {
    return parseHexColor(textBuffer + 1, color);
  }

  return parseRgbTriplet(textBuffer, color);
}

void handleTextCommand(char *command) {
  trimInPlace(command);
  if (command[0] == '\0') {
    return;
  }

  toUpperInPlace(command);

  if (strcmp(command, "HELP") == 0) {
    printHelp();
    return;
  }

  if (strcmp(command, "OFF") == 0) {
    const RgbColor offColor = {0, 0, 0};
    setTargetColor(offColor, false);
    Serial.println(F("LED: OFF"));
    return;
  }

  if (strcmp(command, "ON") == 0) {
    setTargetColor(lastNonZeroColor, false);
    Serial.print(F("LED: ON -> "));
    printColor(lastNonZeroColor);
    return;
  }

  RgbColor parsedColor = {0, 0, 0};

  if (strncmp(command, "SET ", 4) == 0 && parseRgbTriplet(command + 4, parsedColor)) {
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (strncmp(command, "HEX ", 4) == 0 && parseHexColor(command + 4, parsedColor)) {
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (command[0] == '#' && parseHexColor(command + 1, parsedColor)) {
    setTargetColor(parsedColor, true);
    printColor(parsedColor);
    return;
  }

  if (parseRgbTriplet(command, parsedColor)) {
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
      handleTextCommand(commandBuffer);
      commandLength = 0;
      continue;
    }

    if (commandLength < COMMAND_BUFFER_SIZE - 1) {
      commandBuffer[commandLength++] = received;
    }
  }
}

class ServerCallbacks : public BLEServerCallbacks {
  void onConnect(BLEServer *server) override {
    bleClientConnected = true;
    bleClientWasConnected = true;
    updateCharacteristicValue(targetColor);
    Serial.println(F("BLE client connected"));
  }

  void onDisconnect(BLEServer *server) override {
    bleClientConnected = false;
    Serial.println(F("BLE client disconnected"));
  }
};

class RgbCharacteristicCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *characteristic) override {
    RgbColor parsedColor = {0, 0, 0};
    if (parseBlePayload(characteristic, parsedColor)) {
      setTargetColor(parsedColor, true);
      Serial.print(F("BLE -> "));
      printColor(parsedColor);
    } else {
      Serial.println(F("BLE payload ignored"));
    }
  }
};

void setupBle() {
  BLEDevice::init(DEVICE_NAME);

  bleServer = BLEDevice::createServer();
  bleServer->setCallbacks(new ServerCallbacks());

  BLEService *service = bleServer->createService(SERVICE_UUID);
  rgbCharacteristic = service->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_READ |
      BLECharacteristic::PROPERTY_WRITE |
      BLECharacteristic::PROPERTY_WRITE_NR |
      BLECharacteristic::PROPERTY_NOTIFY
  );

  rgbCharacteristic->addDescriptor(new BLE2902());
  rgbCharacteristic->setCallbacks(new RgbCharacteristicCallbacks());
  updateCharacteristicValue(targetColor);

  service->start();

  BLEAdvertising *advertising = BLEDevice::getAdvertising();
  advertising->addServiceUUID(SERVICE_UUID);
  advertising->setScanResponse(true);
  advertising->setMinPreferred(0x00);
  BLEDevice::startAdvertising();
}

void setup() {
  ledcAttach(RED_PIN, 12000, 8);
  ledcAttach(GREEN_PIN, 12000, 8);
  ledcAttach(BLUE_PIN, 12000, 8);
  writeLed(currentColor);

  Serial.begin(SERIAL_BAUD);
  while (!Serial && millis() < 2000) {
    delay(10);
  }

  printHelp();
  setupBle();
  setTargetColor(targetColor, true);
}

void loop() {
  readSerialCommands();
  updateFade();

  if (!bleClientConnected && bleClientWasConnected) {
    delay(150);
    bleServer->startAdvertising();
    bleClientWasConnected = false;
  }

  if (bleClientConnected && !bleClientWasConnected) {
    bleClientWasConnected = true;
  }
}
