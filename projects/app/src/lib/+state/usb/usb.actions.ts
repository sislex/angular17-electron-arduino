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

export const setSelectedUsb = createAction(
  '[Usb] setSelectedUsb',
  props<{ selectedUsb: string }>()
);

export const usbDevicePortIsOpen = createAction(
  '[Usb] usbDevicePortIsOpen',
  props<{ data: {name: string, responseFor: number} }>()
);

export const usbDeviceGetInfo = createAction(
  '[Usb] usbDeviceGetInfo',
  props<{ deviceName: string }>()
);

export const usbDevices = createAction(
  '[Messages] usbDevices',
  props<{ data: {name: string}[] }>()
);

export const setDeviceType = createAction(
  '[Usb] setDeviceType',
  props<{ deviceName: string }>()
);
