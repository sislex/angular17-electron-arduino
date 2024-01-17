import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USB_FEATURE_KEY, UsbState} from './usb.reducer';

export const selectFeature = createFeatureSelector<UsbState>(USB_FEATURE_KEY);

export const getUsbList = createSelector(
  selectFeature,
  (state: UsbState) => state.usbList
);

export const getSelectedUsb = createSelector(
  selectFeature,
  (state: UsbState) => state.selectedUsb
);
