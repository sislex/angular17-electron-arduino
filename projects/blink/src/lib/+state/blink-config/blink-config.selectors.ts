import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BLINK_CONFIG_FEATURE_KEY, BlinkConfigState} from './blink-config.reducer';

export const selectFeature = createFeatureSelector<BlinkConfigState>(BLINK_CONFIG_FEATURE_KEY);

export const getMode = createSelector(
  selectFeature,
  (state: BlinkConfigState) => state.mode
);

export const getLed = createSelector(
  selectFeature,
  (state: BlinkConfigState) => state.led
);
