#include <ArduinoJson.h>

#define M1_ENABLE_PIN 2
#define M1_STEP_PIN 3
#define M1_DIR_PIN 4

#define M2_ENABLE_PIN 5
#define M2_STEP_PIN 6
#define M2_DIR_PIN 7

class Info {
  private:
    const String type;
  public:
    int steps1; // steps for engine 1
    int steps2; // steps for engine 2
    int del; // delay

    Info(
      const String& t = "tripod",
      int s1 = 0,
      int s2 = 0,
      int d = 1
      ) : type(t), steps1(s1), steps2(s2), del(d) {}

    String getType() const {
        return type;
    }

    String getJSON() const {
        StaticJsonDocument<1024> doc;
        doc["type"] = type;
        doc["s1"] = steps1;
        doc["s2"] = steps2;
        doc["d"] = del;

        String output;
        serializeJson(doc, output);
        return output;
    }

    String getJSONMessage(const String& event = "D_INFO", const String& timestamp = "") const { //DEVICE_INFO to INFO !!!
        StaticJsonDocument<1024> doc;
        String data = getJSON();

        doc["event"] = event;
        doc["for"] = timestamp;
        doc["data"] = serialized(data); // Use serialized to avoid escaping the double quotes in the JSON string

        String output;
        serializeJson(doc, output);

        return output;
    }
};

Info info("tripod", 0, 0, 1);

String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
unsigned long previousMillis = 0;

void setup() {
  pinMode(M1_STEP_PIN, OUTPUT);
  pinMode(M1_DIR_PIN, OUTPUT);
  pinMode(M1_ENABLE_PIN, OUTPUT);

  pinMode(M2_STEP_PIN, OUTPUT);
  pinMode(M2_DIR_PIN, OUTPUT);
  pinMode(M2_ENABLE_PIN, OUTPUT);

  Serial.begin(9600);
  inputString.reserve(200);      // резервируем место для входной строки

  const char* deviceIsReady = "{\"event\":\"DEVICE_IS_READY\"}";
  Serial.println(deviceIsReady);
}

void loop() {
  getMessagesFromSerial();
  move();
}

void getMessagesFromSerial() {
  eventSerial();

  if (stringComplete) {
    events(inputString);
    inputString = "";
    stringComplete = false;
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

    if (strcmp(event, "SET") == 0) {
      const int steps1 = doc["data"]["steps1"];
      const int steps2 = doc["data"]["steps2"];
      if (steps1 != 0) {
        info.steps1 += steps1;
        sendDeviceInfo(timestamp);
      }
      if (steps2 != 0) {
        info.steps2 += steps2;
        sendDeviceInfo(timestamp);
      }
    } else if (strcmp(event, "DELAY") == 0) {
      info.del = doc["data"]["del"];
      sendDeviceInfo(timestamp);
    } else if (strcmp(event, "GET_INFO") == 0) {
      sendDeviceInfo(timestamp);
    }
  }
}

void sendDeviceInfo(const String& timestamp) {
  String json = info.getJSONMessage("DEVICE_INFO", timestamp); // DEVICE_INFO to INFO !!!
  Serial.println(json);
}

void move() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= info.del) {
    previousMillis = currentMillis;
    if (info.steps1 != 0) {
      int dir = HIGH;
      if (info.steps1 > 0) {
        info.steps1--;
      } else {
        dir = LOW;
        info.steps1++;
      }

      moveEngineToOneStep(M1_STEP_PIN, M1_DIR_PIN, dir);
    }

    if (info.steps2 != 0) {
      int dir = HIGH;
      if (info.steps2 > 0) {
        info.steps2--;
      } else {
        dir = LOW;
        info.steps2++;
      }

      moveEngineToOneStep(M2_STEP_PIN, M2_DIR_PIN, dir);
    }
  }
}

void moveEngineToOneStep(int stepPin, int dirPin, int dir) {
  digitalWrite(dirPin, dir);
  digitalWrite(stepPin, HIGH);
  digitalWrite(stepPin, LOW);
}
