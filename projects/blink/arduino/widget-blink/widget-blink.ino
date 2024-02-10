#include <ArduinoJson.h>

class Info {
  private:
    const String type;
  public:
    String mode;
    String led;

    Info(const String& t = "blink", const String& m = "off", const String& l = "off") : type(t), mode(m), led(l) {}

    String getType() const {
        return type;
    }

    String getJSON() const {
        StaticJsonDocument<512> doc;
        doc["type"] = type;
        doc["mode"] = mode;
        doc["led"] = led;

        String output;
        serializeJson(doc, output);
        return output;
    }

    String getJSONMessage(const String& event = "DEVICE_INFO", const String& timestamp = "") const {
        StaticJsonDocument<512> doc;
        String data = getJSON();

        doc["event"] = event;
        doc["responseFor"] = timestamp;
        doc["data"] = serialized(data); // Use serialized to avoid escaping the double quotes in the JSON string

        String output;
        serializeJson(doc, output);
        output += '\n';

        return output;
    }
};

Info info("blink", "OFF", "OFF");

const int ledPin = 13;
String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
unsigned long previousMillis = 0;
const long interval = 1000;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(200);      // резервируем место для входной строки

  const char* deviceIsReady = "{\"event\":\"DEVICE_IS_READY\"}\n";
  Serial.println(deviceIsReady);
}

void loop() {
  eventSerial();

  if (stringComplete) {
    events(inputString);
    inputString = "";
    stringComplete = false;
  }

  if (info.mode.equals("BLINK")) {
    toggleLED();
  }
}

void eventSerial() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      stringComplete = true;
    } else {
      inputString += inChar;
    }
  }
}

void events(const String message) {
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, message);

  if (!error) {
    const char* event = doc["event"];
    const char* timestamp = doc["data"]["timestamp"];
    const char* command = doc["data"]["command"];

    if (strcmp(event, "LED") == 0) {
      info.mode = command;
      if (info.mode.equals("ON")) {
        info.led = "ON";
        digitalWrite(ledPin, info.led.equals("ON") ? HIGH : LOW);
        sendDeviceInfo(timestamp);
      } else if (info.mode.equals("OFF")) {
        info.led = "OFF";
        digitalWrite(ledPin, info.led.equals("ON") ? HIGH : LOW);
        sendDeviceInfo(timestamp);
      }
    } else if (strcmp(event, "GET_INFO") == 0) {
      sendDeviceInfo(timestamp);
    }
  }
}


void sendDeviceInfo(const String& timestamp) {
  String json = info.getJSONMessage("DEVICE_INFO", timestamp);
  Serial.println(json);
}


void toggleLED() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    info.led = info.led.equals("ON") ? "OFF" : "ON";
    digitalWrite(ledPin, info.led.equals("ON") ? HIGH : LOW);
    sendDeviceInfo("0");
  }
}
