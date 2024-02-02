import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BLINK_MODE_FEATURE_KEY, BlinkModeState } from './blink-mode.reducer';

export const selectFeature = createFeatureSelector<BlinkModeState>(BLINK_MODE_FEATURE_KEY);

export const getMode = createSelector(
    selectFeature,
    (state: BlinkModeState) => state.mode
);