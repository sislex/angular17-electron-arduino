import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TRIPOD_MESSAGES_FEATURE_KEY, IMessagesState} from './messages.reducer';

export const selectFeature = createFeatureSelector<IMessagesState>(TRIPOD_MESSAGES_FEATURE_KEY);

export const getDeviceName = createSelector(
    selectFeature,
    (state: IMessagesState) => state.deviceName
);

export const addLogList = createSelector(
    selectFeature, (state: IMessagesState) => state.logList
  );

export const addLogListForTable = createSelector(
  addLogList,
  (logList) => logList.map(item => {
    return {...item, message: JSON.stringify(item.message)};
  }),
);