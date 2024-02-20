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
    int steps1;
    int steps2;

    Info(
      const String& t = "tripod",
      int s1 = 0,
      int s2 = 0
      ) : type(t), steps1(s1), steps2(s2) {}

    String getType() const {
        return type;
    }

    String getJSON() const {
        StaticJsonDocument<1024> doc;
        doc["type"] = type;
        doc["s1"] = steps1;
        doc["s2"] = steps2;

        String output;
        serializeJson(doc, output);
        return output;
    }

    String getJSONMessage(const String& event = "D_INFO", const String& timestamp = "") const {
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

Info info("tripod", 0, 0);

String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
unsigned long previousMillis = 0;
const long interval = 5;

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
  eventSerial();

  if (stringComplete) {
    events(inputString);
    inputString = "";
    stringComplete = false;
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    if (info.steps1 > 0) {
      digitalWrite(M1_DIR_PIN, HIGH);
      digitalWrite(M1_STEP_PIN, HIGH);
      digitalWrite(M1_STEP_PIN, LOW);
      digitalWrite(M1_DIR_PIN, LOW);
      info.steps1--;
    } else if (info.steps1 < 0) {
      digitalWrite(M1_DIR_PIN, LOW);
      digitalWrite(M1_STEP_PIN, LOW);
      digitalWrite(M1_STEP_PIN, HIGH);
      digitalWrite(M1_DIR_PIN, LOW);
      info.steps1++;
    }

    if (info.steps2 > 0) {
      digitalWrite(M2_DIR_PIN, HIGH);
      digitalWrite(M2_STEP_PIN, HIGH);
      digitalWrite(M2_STEP_PIN, LOW);
      info.steps2--;
    } else if (info.steps2 < 0) {
      digitalWrite(M2_DIR_PIN, LOW);
      digitalWrite(M2_STEP_PIN, LOW);
      digitalWrite(M2_STEP_PIN, HIGH);
      info.steps2++;
    }
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

    if (strcmp(event, "MOVE") == 0) {
      const int steps1 = doc["data"]["steps1"];
      const int s2 = doc["data"]["steps2"];
      if (steps1 != 0) {
        info.steps1 += steps1;
        sendDeviceInfo(timestamp);
      } 
      if (s2 != 0) {
        info.steps2 += s2;
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
