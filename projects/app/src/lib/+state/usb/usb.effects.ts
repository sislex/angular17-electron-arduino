import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import { tap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  messageFromUSBDevice,
  setClosePort,
  setOpenPort,
  setUsbList,
  usbDeviceGetInfo,
  usbDevicePortIsOpen, usbDevices
} from './usb.actions';
import {getUsbList} from './usb.selectors';
import {sendMessage} from '../messages/messages.actions';
import {IUsb} from './usb.reducer';

@Injectable()
export class UsbEffects {

  setOpenPort$ = createEffect(() => this.actions$.pipe(
    ofType(setOpenPort),
    withLatestFrom(
      this.store.select(getUsbList),
    ),
    tap(([{name}, usbList]) => {
      const newUsbList = usbList.map((usb) => {
        if (usb.name === name) {
          usb = {
            ...usb,
            isOpen: true,
          };
        }
        return usb;
      });
      this.store.dispatch(setUsbList({ usbList: newUsbList }));
    })
  ), {dispatch: false});

  setClosePort$ = createEffect(() => this.actions$.pipe(
    ofType(setClosePort),
    withLatestFrom(
      this.store.select(getUsbList),
    ),
    tap(([{name}, usbList]) => {
      const newUsbList = usbList.map((usb) => {
        if (usb.name === name) {
          usb = {
            ...usb,
            isOpen: false,
            type: '',
          };
        }
        return usb;
      });

      this.store.dispatch(setUsbList({ usbList: newUsbList }));
    })
  ), {dispatch: false});

  messageFromUSBDevice$ = createEffect(() => this.actions$.pipe(
    ofType(messageFromUSBDevice),
    withLatestFrom(
      this.store.select(getUsbList),
    ),
    tap(([{data}, usbList]) => {
      const deviceName = data.deviceName;
      const message = JSON.parse(data.message);
      console.log(message);

      if (message.event === 'DEVICE_IS_READY') {
        this.store.dispatch(usbDeviceGetInfo({ deviceName }));
      } else if (message.type) {
        const newUsbList = usbList.map((usb) => {
          if (usb.name === deviceName) {
            usb = {
              ...usb,
              type: message.type,
              infoFields: [],
            };
          }
          return usb;
        });

        this.store.dispatch(setUsbList({ usbList: newUsbList }));
      }


    })
  ), {dispatch: false});

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
          // setTimeout(() => {
          //   this.store.dispatch(usbDeviceGetInfo({ deviceName: data.name }));
          // }, 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  usbDeviceGetInfo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usbDeviceGetInfo),
        tap(({deviceName}) => {
          const now = new Date();
          const timestamp = now.getTime();
          this.store.dispatch(sendMessage({
            message: {
              event: 'TO_DEVICE',
              data:
                {
                  timestamp,
                  deviceName,
                  message: {
                    event: 'GET_INFO',
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
  ) {}
}
