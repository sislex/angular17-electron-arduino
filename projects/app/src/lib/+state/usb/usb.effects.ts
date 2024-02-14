import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import { tap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  setClosePort,
  setOpenPort,
  setUsbList,
  usbDeviceGetInfo,
  usbDevicePortIsOpen, usbDevices
} from './usb.actions';
import {getUsbList} from './usb.selectors';
import {messageFromDevice, sendMessage} from '../messages/messages.actions';
import {IUsb} from './usb.reducer';

@Injectable()
export class UsbEffects {

  setOpenPort$ = createEffect(() => this.actions$.pipe(
    ofType(setOpenPort),
    withLatestFrom(
      this.store.select(getUsbList),
    ),
    tap(([{deviceName}, usbList]) => {
      const newUsbList = usbList.map((usb) => {
        if (usb.deviceName === deviceName) {
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
    tap(([{deviceName}, usbList]) => {
      const newUsbList = usbList.map((usb) => {
        if (usb.deviceName === deviceName) {
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
    ofType(messageFromDevice),
    withLatestFrom(
      this.store.select(getUsbList),
    ),
    tap(([{message}, usbList]) => {
      const deviceName = message.data.deviceName;
      const deviceMessage = JSON.parse(message.data.message);

      if (deviceMessage.event === 'DEVICE_IS_READY') {
        this.store.dispatch(usbDeviceGetInfo({ deviceName }));
      } else  if (deviceMessage.event === 'DEVICE_INFO') {
        const device = usbList.find((usb) => usb.deviceName === deviceName);
        if (
          device &&
          device.deviceName === deviceName &&
          (
            !device.isOpen ||
            (device.isOpen && deviceMessage.data.type !== device.type)
          )
        ) {
          const newUsbList = usbList.map((usb) => {
            if (usb.deviceName === deviceName) {
              usb = {
                ...usb,
                type: deviceMessage.data.type,
                infoFields: [],
              };
            }
            return usb;
          });
          this.store.dispatch(setUsbList({ usbList: newUsbList }));
        }
      }
    })
  ), {dispatch: false});

  usbDevices$ = createEffect(() =>
      this.actions$.pipe(
        ofType(usbDevices),
        concatLatestFrom(() => this.store.select(getUsbList)),
        tap(([{data}, usbList]) => {
          let usbListNew: IUsb[] = data.map((usb: any) => ({deviceName: usb.path, type: ''}));
          if (usbList.length > 0) {
            usbListNew = data.map((usb: any) => {
              let newUsb = {deviceName: usb.path, type: ''};
              const foundUsb = usbList.find(item => item.deviceName === newUsb.deviceName);
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
          this.store.dispatch(setOpenPort({ deviceName: data.deviceName }));
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
          const timestamp = now.getTime().toString();
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
