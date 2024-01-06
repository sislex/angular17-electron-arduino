import { createAction, props } from '@ngrx/store';
import {IUsb} from './usb.reducer';

export const setUsbList = createAction(
  '[Usb] setUsbList',
  props<{ usbList: IUsb[] }>()
);
