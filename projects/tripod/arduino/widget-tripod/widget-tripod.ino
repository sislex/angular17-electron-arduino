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
    int s1; // steps for engine 1
    int s2; // steps for engine 2
    int d; // delay
    int m; // mode (mode = 1 - by 1 steps, mode = 2 by specified quantity)

    Info(
      const String& t = "tripod",
      int s1 = 0,
      int s2 = 0,
      int d = 1,
      int m = 2
      ) : type(t), s1(s1), s2(s2), d(d), m(m) {}

    String getType() const {
        return type;
    }

    String getJSON() const {
        StaticJsonDocument<1024> doc;
        doc["type"] = type;
        doc["s1"] = s1;
        doc["s2"] = s2;
        doc["d"] = d;

        String output;
        serializeJson(doc, output);
        return output;
    }

    String getJSONMessage(const String& event = "INFO", const String& timestamp = "") const {
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
      const int s1 = doc["data"]["s1"];
      const int s2 = doc["data"]["s2"];
      const int d = doc["data"]["d"];
      info.m = doc["data"]["m"];

    // if (info.s1 == s1 && info.m == 2) {
    //     info.s1 = 0;
    //     sendDeviceInfo(timestamp);
    //     return;
    //   }
    
    // if (info.s2 == s2 && info.m == 2) {
    //     info.s2 = 0;
    //     sendDeviceInfo(timestamp);
    //     return;
    //   }

      if (info.m == 1) { //mode 1
        if (s1 != 0) {
          info.s1 += s1;
          sendDeviceInfo(timestamp);
        }
        if (s2 != 0) {
          info.s2 += s2;
          sendDeviceInfo(timestamp);
        }
      }

      if (info.m == 2) { //mode 2
        if (s1 != 0 && info.s1 == s1) {
          info.s1 = 0;
          sendDeviceInfo(timestamp);
          return;
        }
        if (s2 != 0 && info.s2 == s2) {
          info.s2 = 0;
          sendDeviceInfo(timestamp);
          return;
        }
        if (s1 != 0) {
          info.s1 = s1;
          sendDeviceInfo(timestamp);
        }
        if (s2 != 0) {
          info.s2 = s2;
          sendDeviceInfo(timestamp);
        }
      }

      if (d != 0) {
      info.d = doc["data"]["d"];
      sendDeviceInfo(timestamp);
      }
    } else if (strcmp(event, "GET_INFO") == 0) {
      sendDeviceInfo(timestamp);
    }
  }
}

void sendDeviceInfo(const String& timestamp) {
  String json = info.getJSONMessage("INFO", timestamp);
  Serial.println(json);
}

void move() {

  unsigned long currentMillis = millis();
  if (info.m == 1) {
    if (currentMillis - previousMillis >= info.d) {
      previousMillis = currentMillis;
      if (info.s1 != 0) {
        int dir = HIGH;
        if (info.s1 > 0) {
          info.s1--;
        } else {
          dir = LOW;
          info.s1++;
        }

        moveEngineToOneStep(M1_STEP_PIN, M1_DIR_PIN, dir);
      }

      if (info.s2 != 0) {
        int dir = HIGH;
        if (info.s2 > 0) {
          info.s2--;
        } else {
          dir = LOW;
          info.s2++;
        }

        moveEngineToOneStep(M2_STEP_PIN, M2_DIR_PIN, dir);
      }
    }
  } else if (info.m == 2) {
    if (currentMillis - previousMillis >= info.d) {
      previousMillis = currentMillis;
      if (info.s1 != 0) {
        int dir = HIGH;
        if (info.s1 < 0) {
          dir = LOW;       
        }

        moveEngineToOneStep(M1_STEP_PIN, M1_DIR_PIN, dir);
      }  

      if (info.s2 != 0) {
        int dir = HIGH;
        if (info.s2 < 0) {
          dir = LOW;       
        }

        moveEngineToOneStep(M2_STEP_PIN, M2_DIR_PIN, dir);
      }
    }
  }
}

void moveEngineToOneStep(int stepPin, int dirPin, int dir) {
  digitalWrite(dirPin, dir);
  digitalWrite(stepPin, HIGH);
  digitalWrite(stepPin, LOW);
}
