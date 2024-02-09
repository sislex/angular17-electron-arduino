import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BLINK_MESSAGES_FEATURE_KEY, IBlinkMessagesState} from './blink-messages.reducer';

export const selectFeature = createFeatureSelector<IBlinkMessagesState>(BLINK_MESSAGES_FEATURE_KEY);

export const getDeviceName = createSelector(
    selectFeature,
    (state: IBlinkMessagesState) => state.deviceName
);

