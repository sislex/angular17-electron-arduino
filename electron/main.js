const { app, BrowserWindow} = require('electron');
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const path = require('path');

const { getMessages, sendMessage} = require('./messagesWeb');
const { messagesHandlerFromWeb} = require("./messagesHandlerFromWeb");

const launchMode = app.commandLine.getSwitchValue('mode');
const channelName = 'electron-angular';
let win;

function createWindow(launchMode) {
  console.log('createWindow');
  win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (launchMode === 'dev') {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadFile('../dist/angular17-electron-arduino/browser/index.html');
  }

  win.webContents.openDevTools();

  getMessages(channelName, (event, message) => {
    messagesHandlerFromWeb(message, { win, channelName });
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  console.log('whenReady');
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

app.on('ready', function ()  {
  createWindow(launchMode);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow(launchMode);
  }
});

