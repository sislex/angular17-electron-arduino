#include <Servo.h> // подключаем библиотеку Servo

#define Servo_PWM 6 // определяем пин D6 для ШИМ-сигнала
Servo MG995_Servo;  // создаём экземпляр Servo с именем "MG995_Servo"

void setup() {
  Serial.begin(9600); // инициализируем UART со скоростью 9600 бод
    // подключаем пин D6 Arduino к пину ШИМ сервопривода
    // Serial.println("0"); // выводим в серийный порт значение сигнала
  
}

void loop() {
  MG995_Servo.attach(Servo_PWM);
  delay(25);
  MG995_Servo.detach(); 
  delay(25);
    MG995_Servo.attach(Servo_PWM);
  MG995_Servo.write(0);
    delay(25);
  MG995_Servo.detach(); 
  delay(25);
  // Serial.println("0"); // выводим в серийный порт значение сигнала
  // MG995_Servo.write(0); // вращаем сервопривод с максимальной скоростью в одну сторону
  // delay(3000);
  // MG995_Servo.detach(); // останавливаем сервопривод
  // delay(2000);
  // MG995_Servo.attach(Servo_PWM); // подключаем сервопривод снова
  // Serial.println("0"); // выводим в серийный порт значение сигнала
  // MG995_Servo.write(180); // вращаем сервопривод с максимальной скоростью в другую сторону
  // delay(3000);
  // MG995_Servo.detach(); // останавливаем сервопривод
  // delay(2000);
  // MG995_Servo.attach(Servo_PWM); // подключаем сервопривод снова
}
