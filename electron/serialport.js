const pkg = require('serialport');
const { SerialPort } = pkg;

async function getSerialPortList () {
  return await SerialPort.list();
}

function setupSerialPort(portName, baudRate = 9600) {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({
      path: portName,
      baudRate: baudRate,
    }, err => {
      if (err) {
        reject('Error port opening: ' + err.message);
      }
    });

    // Событие 'open' срабатывает, когда соединение установлено
    port.on('open', () => {
      console.log('Порт открыт');
      resolve(port);
    });

    // Обработка ошибок открытия порта
    port.on('error', (err) => {
      reject('Error port opening: ' + err.message);
    });
  });
}

module.exports = { getSerialPortList, setupSerialPort };
