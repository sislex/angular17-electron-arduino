import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MESSAGES_FEATURE_KEY, MessagesState} from './messages.reducer';

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
  (state: MessagesState) => state.logList.filter(item => item.message.event === 'your_event_name').map(item => {
    return {...item, message: JSON.stringify(item.message)};
  }),
);



// export const selectFilteredDataByName = createSelector(
//   selectFeature,
//   (filteredData, name) => filteredData.filter(item => item.name === name)
// );