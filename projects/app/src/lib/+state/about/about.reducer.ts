import { createReducer, on } from '@ngrx/store';

// import * as UsbActions from './usb.actions';
// import {setSelectedUsb} from './usb.actions';

export const ABOUT_FEATURE_KEY = 'about';

export interface IAbout {
    name: string;
    description: string;
}

export interface AboutState {
    titleAbout: string;
    aboutList: IAbout[];
}

export interface AboutPartialState {
    readonly [ABOUT_FEATURE_KEY]: AboutState;
}

export const initialState: AboutState = {
    titleAbout: '',
    aboutList: [],
};

export const aboutReducer = createReducer(
    initialState,
//   on(UsbActions.setUsbList, (state, {usbList}) => ({ ...state, usbList })),
//   on(UsbActions.setSelectedUsb, (state, {selectedUsb}) => ({ ...state, selectedUsb })),
);

