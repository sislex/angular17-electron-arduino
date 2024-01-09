const { getSerialPortList, setupSerialPort} = require('./serialport');
const {sendMessage} = require('./messagesWeb');

let ledStatus = '2';
let port;

function messagesHandlerFromWeb(json, note) {
  // console.log(json);
  const messageObj = JSON.parse(json);
  const event = messageObj.event;
  const data = messageObj.data;
  if (event === 'GET_USB_DEVICES') {
    getSerialPortList().then((ports) => {
      sendMessage(note.win, note.channelName, JSON.stringify({ event: 'USB_DEVICES', data: ports }));
    });
  } else if (event === 'CONNECT_USB_DEVICE') {
    // Нужно добавить проверку на то, что порт уже открыт тк это занимает больше 1 секунды


    if (!port) {
      port = setupSerialPort(data.item.name);
    }
    setTimeout(() => {
      ledStatus = ledStatus === '1' ? '2' : '1';
     console.log(ledStatus);
      port.write(ledStatus);
      // port.close(function(err) {
      //   if (err) {
      //     console.log('Ошибка при закрытии порта: ', err.message);
      //   } else {
      //     console.log('Порт закрыт');
      //   }
      // });
    }, 1000);
  }
}

module.exports = { messagesHandlerFromWeb };
