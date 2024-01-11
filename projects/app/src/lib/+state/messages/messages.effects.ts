import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {IpcService} from '../../services/ipc.service';
import {Store} from '@ngrx/store';
import {setOpenPort, setUsbList} from '../usb/usb.actions';
import {
  sendMessage,
  setChannelName,
  setChannelNameAndSubscribe,
  setLog,
  usbDevicePortIsOpen,
  usbDevices
} from './messages.actions';
import {getChannelName} from './messages.selectors';
import {MessagesFromElectronService} from '../../services/messagesFromElectron.service';
import {getUsbList} from '../usb/usb.selectors';
import {IUsb} from '../usb/usb.reducer';

@Injectable()
export class MessagesEffects {

  setChannelNameAndSubscribe$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setChannelNameAndSubscribe),
        tap(({channelName}) => {
          this.store.dispatch(setChannelName({ channelName }));

          this.ipcService.on(channelName, (event, json) => {
            if (json) {
              const message = JSON.parse(json);
              this.store.dispatch(setLog({
                log: {
                  timestamp: new Date().toISOString(),
                  direction: 'from',
                  message,
                }
              }));
              console.log(message);
              this.messagesFromElectronService.events(message);
            }
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  sendMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMessage),
        concatLatestFrom(() => this.store.select(getChannelName)),
        tap(([{message}, channelName]) => {
          if (this.ipcService.isElectron()) {
            const messageJson = JSON.stringify(message);
            this.ipcService.send(channelName, messageJson);
            this.store.dispatch(setLog({
              log: {
                timestamp: new Date().toISOString(),
                direction: 'to',
                message,
              }
            }));
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  usbDevices$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usbDevices),
        concatLatestFrom(() => this.store.select(getUsbList)),
        tap(([{data}, usbList]) => {
          let usbListNew: IUsb[] = data.map((usb: any) => ({name: usb.path, type: ''}));
          if (usbList.length > 0) {
            usbListNew = data.map((usb: any) => {
              let newUsb = {name: usb.path, type: ''};
              const foundUsb = usbList.find(item => item.name === newUsb.name);
              if (foundUsb) {
                newUsb = foundUsb;
              }

              return newUsb;
            });
          }

          this.store.dispatch(setUsbList({ usbList: usbListNew }));
        })
      ),
    {
      dispatch: false,
    }
  );

  usbDevicePortIsOpen$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usbDevicePortIsOpen),
        tap(({data}) => {
          this.store.dispatch(setOpenPort({ name: data.name }));

          const now = new Date();
          const timestamp = now.getTime();
          this.store.dispatch(sendMessage({
            message: {
              event: 'SEND_MESSAGE_TO_USB_DEVICE',
              data:
                {
                  timestamp,
                  name: data.name,
                  message: {
                    event: 'GET_DEVICE_INFO',
                    data: {
                      timestamp,
                      fields: [],
                    }
                  }
                }
            }
          }));
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private ipcService: IpcService,
    private messagesFromElectronService: MessagesFromElectronService,
  ) {}
}
