#include <ArduinoJson.h>

class Info {
  private:
    const String type;
  public:
    String mode;

    Info(const String& t = "blink", const String& m = "off") : type(t), mode(m) {}

    String getType() const {
        return type;
    }

    String getJSON() const {
        StaticJsonDocument<512> doc;
        doc["type"] = type;
        doc["mode"] = mode;

        String output;
        serializeJson(doc, output);
        return output;
    }

    // New method to return the desired JSON message
    String getJSONMessage(const String& event = "DEVICE_INFO", const String& timestamp = "") const {
        StaticJsonDocument<512> doc;
        String data = getJSON(); // Use the existing getJSON method to create the data part

        doc["event"] = event;
        doc["responseFor"] = timestamp;
        doc["data"] = serialized(data); // Use serialized to avoid escaping the double quotes in the JSON string

        String output;
        serializeJson(doc, output);
        output += '\n';

        return output;
    }
};

Info info("blink", "on");

const int ledPin = 13;
String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
const char* deviceIsReady = "{\"event\":\"DEVICE_IS_READY\"}\n";

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(200);      // резервируем место для входной строки
  Serial.println(deviceIsReady);
}

void loop() {
  if (stringComplete) {
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, inputString);

    if (!error) {
      const char* event = doc["event"];
      const char* timestamp = doc["data"]["timestamp"];
      const char* command = doc["data"]["command"];

      if (strcmp(event, "LED") == 0) {
        if (strcmp(command, "ON") == 0) {
          digitalWrite(ledPin, HIGH);
        } else if (strcmp(command, "OFF") == 0) {
          digitalWrite(ledPin, LOW);
        }
      } else if (strcmp(event, "GET_INFO") == 0) {
        String json = info.getJSONMessage("DEVICE_INFO", timestamp);
        Serial.println(json);
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
