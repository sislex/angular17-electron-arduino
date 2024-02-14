const { getSerialPortList, setupSerialPort} = require('./serialport');
const {sendMessage} = require('./messagesWeb');

const port = {};
const messageBuffers = {};

async  function messagesHandlerFromWeb(json, note) {
  // console.log(json);
  const messageObj = JSON.parse(json);
  const event = messageObj.event;
  const data = messageObj.data;
  if (event === 'GET_USB_DEVICES') {
    getSerialPortList().then((ports) => {
      sendMessage(note.win, note.channelName, JSON.stringify({ event: 'USB_DEVICES', data: ports }));
    });
  } else if (event === 'CONNECT_USB_DEVICE') {
    if (port[data.deviceName]) {
      port[data.deviceName].close();
      delete port[data.deviceName];
    }
    try {
      port[data.deviceName] = await setupSerialPort(data.deviceName);
      sendMessage(note.win, note.channelName, JSON.stringify({
        event: 'USB_DEVICES_PORT_IS_OPEN',
        data: {
          deviceName: data.deviceName,
          responseFor: data.timestamp,
        }
      }));

      port[data.deviceName].on('data', (message) => {
        if (!messageBuffers[data.deviceName]) {
          messageBuffers[data.deviceName] = '';
        }
        messageBuffers[data.deviceName] += message.toString();

        if (messageBuffers[data.deviceName].endsWith('\n')) {
          sendMessage(note.win, note.channelName, JSON.stringify({
            event: 'FROM_USB_DEVICE',
            data: {
              timestamp: (new Date()).getTime().toString(),
              deviceName: data.deviceName,
              message: messageBuffers[data.deviceName].trim() // Удаляем символ новой строки из сообщения
            },
          }));

          messageBuffers[data.deviceName] = ''; // Очищаем буфер для данного устройства
        }
      });
    } catch (error) {
      console.error(error);
      sendMessage(note.win, note.channelName, JSON.stringify({
        event: 'CONNECT_USB_DEVICE_ERROR',
        data: {
          deviceName: data.deviceName,
          error,
          responseFor: data.timestamp,
        }
      }));
    }
  } else if (event === 'DISCONNECT_USB_DEVICE') {
    if (port[data.deviceName]) {
      try {
        port[data.deviceName].close();
        delete port[data.deviceName];
        sendMessage(note.win, note.channelName, JSON.stringify({
          event: 'USB_DEVICES_PORT_IS_CLOSED',
          data: {
            deviceName: data.deviceName,
            responseFor: data.timestamp,
          }
        }));
      } catch (error) {
        console.error(error);
        sendMessage(note.win, note.channelName, JSON.stringify({
          event: 'DISCONNECT_USB_DEVICE_ERROR',
          data: {
            deviceName: data.deviceName,
            error,
            responseFor: data.timestamp,
          }
        }));
      }
    }
  } else if (event === 'SEND_MESSAGE_TO_USB_DEVICE') {
    // sendMessage(note.win, note.channelName, JSON.stringify({
    //   event: 'MESSAGE_FROM_USB_DEVICE',
    //   data: {
    //     name: data.name,
    //     responseFor: data.timestamp,
    //     infoFields: {
    //       type: 'blink',
    //       description: 'Arduino uno, blink-container',
    //       electronicDevices: ['Arduino uno'],
    //       commandsList: [
    //         {command: '1', description: 'LED ON'},
    //         {command: '2', description: 'LED OFF'},
    //         {command: '3', description: 'LED BLINK'},
    //       ]
    //     }
    //   }
    // }));
  } else if (event === 'TO_DEVICE') {
    if (port[data.deviceName]) {
      console.log(data.message);
      port[data.deviceName].write(JSON.stringify(data.message) + '\n');
    }

  }

}

module.exports = { messagesHandlerFromWeb };
