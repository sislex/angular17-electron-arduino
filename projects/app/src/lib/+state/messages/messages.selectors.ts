import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MESSAGES_FEATURE_KEY, MessagesState} from './messages.reducer';

export const selectFeature = createFeatureSelector<MessagesState>(MESSAGES_FEATURE_KEY);

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