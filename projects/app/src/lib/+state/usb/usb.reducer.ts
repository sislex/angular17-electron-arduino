import { createReducer, on } from '@ngrx/store';

import * as UsbActions from './usb.actions';
import {setUsbList} from './usb.actions';

export const USB_FEATURE_KEY = 'usb';

export interface IUsb {
  name: string;
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
);

