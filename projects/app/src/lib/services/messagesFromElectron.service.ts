import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IpcService} from './ipc.service';
import {IMessage} from '../+state/messages/messages.reducer';
import {setUsbList} from '../+state/usb/usb.actions';

@Injectable({
  providedIn: 'root'
})
export class MessagesFromElectronService {
  ipcRenderer: typeof import('electron').ipcRenderer | undefined;

  constructor(
    private readonly store: Store,
  ) {
  }

  events(message: IMessage) {
    if (message.event === 'USB_DEVICES') {
      const usbList = message.data.map((usb: any) => ({name: usb.path}));
      this.store.dispatch(setUsbList({ usbList }));
    }
  }
}
