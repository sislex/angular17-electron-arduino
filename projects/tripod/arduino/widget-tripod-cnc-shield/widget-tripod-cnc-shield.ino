#include <AccelStepper.h>
#include <MultiStepper.h>

// Определите номера шага и направления для двух моторов
#define motor1Step 2
#define motor1Dir 5
#define motor2Step 3
#define motor2Dir 6

// Инициализируйте объекты AccelStepper
AccelStepper stepper1(AccelStepper::DRIVER, motor1Step, motor1Dir);
AccelStepper stepper2(AccelStepper::DRIVER, motor2Step, motor2Dir);

void setup() {
  // Установите максимальную скорость и ускорение
  stepper1.setMaxSpeed(1000);
  stepper1.setAcceleration(500);
  stepper2.setMaxSpeed(1000);
  stepper2.setAcceleration(500);
}

void loop() {
  // Заставляет мотор 1 вращаться в одну сторону
  stepper1.moveTo(2000);
  stepper1.runToPosition();
  delay(500); // небольшая пауза перед сменой направления

  // Заставляет мотор 2 вращаться в другую сторону
  stepper2.moveTo(-2000);
  stepper2.runToPosition();
  delay(500); // ожидание 4000 мс перед следующим циклом

  // Переключение направления для следующего цикла
  stepper1.moveTo(-2000);
  stepper1.runToPosition();
  delay(500); // небольшая пауза перед сменой направления

  stepper2.moveTo(2000);
  stepper2.runToPosition();
  delay(500); // ожидание 4000 мс перед следующим циклом
}
