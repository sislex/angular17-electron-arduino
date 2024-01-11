const { getSerialPortList, setupSerialPort} = require('./serialport');
const {sendMessage} = require('./messagesWeb');

let ledStatus = '2';
const port = {};

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
    if (port[data.name]) {
      port[data.name].close();
      delete port[data.name];
    }

    try {
      port[data.name] = await setupSerialPort(data.name);
      sendMessage(note.win, note.channelName, JSON.stringify({
        event: 'USB_DEVICES_PORT_IS_OPEN',
        data: {
          name: data.name,
          // port: JSON.stringify(port[data.name]), // too long string
          responseFor: data.timestamp,
        }
      }));
    } catch (error) {
      console.error(error);
      sendMessage(note.win, note.channelName, JSON.stringify({
        event: 'CONNECT_USB_DEVICE_ERROR',
        data: {
          name: data.name,
          error,
          responseFor: data.timestamp,
        }
      }));
    }



    // if (port[data.name]) {
    //   ledStatus = ledStatus === '1' ? '2' : '1';
    //   port[data.name].write(ledStatus);
    // }
  } else if (event === 'DISCONNECT_USB_DEVICE') {
    if (port[data.name]) {
      try {
        port[data.name].close();
        delete port[data.name];
        sendMessage(note.win, note.channelName, JSON.stringify({
          event: 'USB_DEVICES_PORT_IS_CLOSED',
          data: {
            name: data.name,
            responseFor: data.timestamp,
          }
        }));
      } catch (error) {
        console.error(error);
        sendMessage(note.win, note.channelName, JSON.stringify({
          event: 'DISCONNECT_USB_DEVICE_ERROR',
          data: {
            name: data.name,
            error,
            responseFor: data.timestamp,
          }
        }));
      }
    }
    // if (port[data.name]) {
    //   ledStatus = ledStatus === '1' ? '2' : '1';
    //   port[data.name].write(ledStatus);
    // }
  } else if (event === 'SEND_MESSAGE_TO_USB_DEVICE') {
    sendMessage(note.win, note.channelName, JSON.stringify({
      event: 'MESSAGE_FROM_USB_DEVICE',
      data: {
        name: data.name,
        responseFor: data.timestamp,
        infoFields: {
          type: 'blink',
          description: 'Arduino uno, blink',
          electronicDevices: ['Arduino uno'],
          commandsList: [
            {command: '1', description: 'LED ON'},
            {command: '2', description: 'LED OFF'},
            {command: '3', description: 'LED BLINK'},
          ]
        }
      }
    }));
  }
}

module.exports = { messagesHandlerFromWeb };
