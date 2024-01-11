import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { tap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {messageFromUSBDevice, setClosePort, setOpenPort, setUsbList} from './usb.actions';
import {getUsbList} from './usb.selectors';

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
      const newUsbList = usbList.map((usb) => {
        if (usb.name === data.name) {
          usb = {
            ...usb,
            type: data.infoFields.type,
            infoFields: data.infoFields
          };
        }
        return usb;
      });

      this.store.dispatch(setUsbList({ usbList: newUsbList }));
    })
  ), {dispatch: false});

  constructor(
    private readonly store: Store,
    private actions$: Actions,
  ) {}
}
