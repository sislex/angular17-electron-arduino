const { ipcMain } = require('electron');

function getMessages(channelName, callback) {
  ipcMain.on(channelName, callback);
}

function sendMessage(win, channelName, message) {
  win.webContents.send(channelName, message);
}

module.exports = { getMessages, sendMessage };
