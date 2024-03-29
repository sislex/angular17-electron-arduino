import { createReducer, on } from '@ngrx/store';

import * as UsbActions from './usb.actions';
import {setSelectedUsb} from './usb.actions';

export const USB_FEATURE_KEY = 'usb';

export interface IUsb {
  deviceName: string;
  type: string;
  isOpen?: boolean;
  infoFields?: any;
}

export interface UsbState {
  selectedUsb: string;
  usbList: IUsb[];
}

export interface UsbPartialState {
  readonly [USB_FEATURE_KEY]: UsbState;
}

export const initialState: UsbState = {
  selectedUsb: '',
  usbList: [],
};

export const usbReducer = createReducer(
  initialState,
  on(UsbActions.setUsbList, (state, {usbList}) => ({ ...state, usbList })),
  on(UsbActions.setSelectedUsb, (state, {selectedUsb}) => ({ ...state, selectedUsb })),
);

