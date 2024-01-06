// ipc.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  ipcRenderer: typeof import('electron').ipcRenderer | undefined;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  send(channel: string, ...args: any[]) {
    this.ipcRenderer?.send(channel, ...args);
  }

  // Добавление метода для прослушивания канала
  on(channel: string, listener: (...args: any[]) => void): void {
    if (!this.ipcRenderer) {
      console.warn('Attempt to listen to IPC channel without ipcRenderer available');
      return;
    }

    // Устанавливаем слушатель событий для канала
    this.ipcRenderer.on(channel, listener);
  }

  // Добавление метода для прослушивания канала однократно
  once(channel: string, listener: (...args: any[]) => void): void {
    if (!this.ipcRenderer) {
      console.warn('Attempt to listen to IPC channel without ipcRenderer available');
      return;
    }

    // Устанавливаем слушатель событий для канала однократно
    this.ipcRenderer.once(channel, listener);
  }

  // Отписка от канала
  removeListener(channel: string, listener: (...args: any[]) => void): void {
    this.ipcRenderer?.removeListener(channel, listener);
  }
}
