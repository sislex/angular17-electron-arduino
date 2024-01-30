import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MESSAGES_FEATURE_KEY, MessagesState} from './messages.reducer';
import * as UsbReducer from '../usb/usb.reducer';

export const selectFeature = createFeatureSelector<MessagesState>(MESSAGES_FEATURE_KEY);

// export const selectData = (state: State) => state.data;
// export const selectFilteredData = (state: State) => state.filteredData;

export const getChannelName = createSelector(
  selectFeature,
  (state: MessagesState) => state.channelName
);

export const addLogList = createSelector(
  selectFeature,
  (state: MessagesState) => state.logList.map(item => {
    return {...item, message: JSON.stringify(item.message)};
  }),
);

export const addLogFilterList = createSelector(
  selectFeature,
  (state: MessagesState) => {
    const deviceName = 'COM1';
    state.logList.filter(item => 
    item.message.data !== undefined && item.message.data.deviceName === 'deviceName'
  ).map(item => ({...item, message: JSON.stringify(item.message)}));
  },
);
