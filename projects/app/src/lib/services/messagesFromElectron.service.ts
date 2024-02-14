import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IMessage} from '../+state/messages/messages.reducer';
import {setClosePort, usbDevicePortIsOpen, usbDevices} from '../+state/usb/usb.actions';
import {messageFromDevice} from '../+state/messages/messages.actions';

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
      this.store.dispatch(usbDevices({data: message.data}));
    } else if (message.event === 'USB_DEVICES_PORT_IS_OPEN') {
      this.store.dispatch(usbDevicePortIsOpen({data: message.data}));
    } else if (message.event === 'USB_DEVICES_PORT_IS_CLOSED') {
      this.store.dispatch(setClosePort({ deviceName: message.data.deviceName }));
    } else if (message.event === 'FROM_USB_DEVICE') {
      this.store.dispatch(messageFromDevice({ message }));
    }
  }
}
