import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable()
export class SkinMoveKeyboardEventsService {

  constructor(
    private readonly store: Store,
  ) {
  }

  events(message: any) {
    console.log('message', message);
    if (message.event === 'USB_DEVICES') {
      // this.store.dispatch(usbDevices({data: message.data}));
    } else if (message.event === 'USB_DEVICES_PORT_IS_OPEN') {
      // this.store.dispatch(usbDevicePortIsOpen({data: message.data}));
    }
  }
}
