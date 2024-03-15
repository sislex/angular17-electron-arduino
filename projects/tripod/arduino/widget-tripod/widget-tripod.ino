#include <ArduinoJson.h>
#include <AccelStepper.h>
#include <MultiStepper.h>

// Определите номера шага и направления для двух моторов
#define motor1Step 2
#define motor1Dir 5
#define motor2Step 3
#define motor2Dir 6

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
//         doc["s2"] = s2;
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

AccelStepper stepper1(AccelStepper::DRIVER, motor1Step, motor1Dir);
AccelStepper stepper2(AccelStepper::DRIVER, motor2Step, motor2Dir);

String inputString = "";         // строка для хранения входящих данных
bool stringComplete = false;     // флаг, указывающий, что строка полностью прочитана
unsigned long previousMillis = 0;

void setup() {


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

int getSteps(const int currentSteps, const int newSteps, const int mode) {
  int steps = currentSteps;
  if (newSteps != 0) {
    if (mode == 1) {
      steps += newSteps;
    } else {
     if (mode == 2) {
       if (currentSteps == newSteps) { // stop engine
        steps = 0;
       } else {
        steps = newSteps;
       }
     }
    }
  }

  return steps;
}

void sendDeviceInfo(const String& timestamp) {
  String json = info.getJSONMessage("INFO", timestamp);
  Serial.println(json);
}

int getStepsAndMoveEngine(const int currentSteps, const int mode, const AccelStepper stepper) {
  int steps = currentSteps;
  if (currentSteps != 0) {
   int dir = 1;
    if (currentSteps > 0) {
       if (mode == 1) {
         steps--;
       }
     } else if (currentSteps < 0)  {
       dir = -1;
       if (mode == 1) {
         steps++;
       }
     }

     stepper.moveTo(dir);
     stepper.runToPosition();
  }

  return steps;
}

void move() {
  const bool isMoveNeeded = info.s1 != 0 || info.s2 != 0;
  if (isMoveNeeded) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= info.d) {
      previousMillis = currentMillis;

      info.s1 = getStepsAndMoveEngine(info.s1, info.m, stepper1);
      info.s2 = getStepsAndMoveEngine(info.s2, info.m, stepper2);
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
      const int m = doc["data"]["m"];

      if (m != 0) {
        info.m = m;
      }

       if (d != 0) {
        info.d = d;
      }

      info.s1 = getSteps(info.s1, s1, info.m);
      info.s2 = getSteps(info.s2, s2, info.m);

    } else if (strcmp(event, "GET_INFO") == 0) {
      sendDeviceInfo(timestamp);
    }
  }
}
