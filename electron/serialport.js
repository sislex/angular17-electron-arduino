const pkg = require('serialport');
const { SerialPort } = pkg;

async function getSerialPortList () {
  // list the serial ports
  return await SerialPort.list();
}

// function setupSerialPort (portName, baudRate = 9600) {
// // console command for list of ports: 'ls /dev | grep usbserial'
//   console.log(3);
//   console.log('/dev/cu.usbserial-1110', baudRate);
//   const port = new SerialPort({
//     path: portName,
//     baudRate: baudRate,
//   });
//
//   port.on('data', function (data) {
//     console.log('11111111111Data:', data.toString());
//   });
//
//   return port;
// }

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
