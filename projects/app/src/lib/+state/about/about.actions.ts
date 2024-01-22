import { createAction, props } from '@ngrx/store';
import {IAbout} from './about.reducer';

export const createAboutList = createAction(
    '[About] createAboutList',
    props<{ titles: 'titlesaaaaa', abouts:[{name: 'NAMA', description: 'DESCR'}] }>()
  );

// export const setUsbList = createAction(
//   '[Usb] setUsbList',
//   props<{ usbList: IUsb[] }>()
// );

// export const setOpenPort = createAction(
//   '[Usb] setOpenPort',
//   props<{ name: string }>()
// );

// export const setClosePort = createAction(
//   '[Usb] setClosePort',
//   props<{ name: string }>()
// );

// export const messageFromUSBDevice = createAction(
//   '[Usb] messageFromUSBDevice',
//   props<{ data: any }>()
// );

// export const setSelectedUsb = createAction(
//   '[Usb] setSelectedUsb',
//   props<{ selectedUsb: string }>()
// );

// =======================================================================================================================

// import { createAction, props } from '@ngrx/store';
// import {IUser} from '../config/config.reducer';

// export const getUserFromLocalStorage = createAction('[Account] getUserFromLocalStorage');
// export const resetUserFromLocalStorageAndState = createAction('[Account] resetUserFromLocalStorageAndState');
// export const resetUser = createAction('[Account] resetUser');

// export const setAndSaveUser = createAction(
//   '[Account] setAndSaveUser',
//   props<{ user: IUser }>()
// );

// export const setUser = createAction(
//   '[Account] setUser',
//   props<{ user: IUser }>()
// );
