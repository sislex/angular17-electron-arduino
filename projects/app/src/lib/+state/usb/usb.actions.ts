import { createAction, props } from '@ngrx/store';
import {IUsb} from './usb.reducer';

export const setUsbList = createAction(
  '[Usb] setUsbList',
  props<{ usbList: IUsb[] }>()
);

export const setOpenPort = createAction(
  '[Usb] setOpenPort',
  props<{ name: string }>()
);

export const setClosePort = createAction(
  '[Usb] setClosePort',
  props<{ name: string }>()
);

export const messageFromUSBDevice = createAction(
  '[Usb] messageFromUSBDevice',
  props<{ data: any }>()
);
