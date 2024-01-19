#include <ArduinoJson.h>

const int ledPin = 13;
String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
const char* info = "{\"type\":\"blink\",\"description\":\"Arduino UNO\"}";

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(200);      // резервируем место для входной строки
}

void loop() {
  if (stringComplete) {
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, inputString);

    if (!error) {
      const char* event = doc["event"];
      const char* command = doc["data"]["command"];

      if (strcmp(event, "LED") == 0) {
        if (strcmp(command, "ON") == 0) {
          digitalWrite(ledPin, HIGH);
        } else if (strcmp(command, "OFF") == 0) {
          digitalWrite(ledPin, LOW);
        }
      } else if (strcmp(event, "GET_INFO") == 0) {
        digitalWrite(ledPin, HIGH);
        Serial.println(info);
      }
    }

    inputString = "";
    stringComplete = false;
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    inputString += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}