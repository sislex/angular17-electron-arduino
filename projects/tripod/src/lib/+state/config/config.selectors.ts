import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TRIPOD_CONFIG_FEATURE_KEY, ConfigState} from './config.reducer';

export const selectFeature = createFeatureSelector<ConfigState>(TRIPOD_CONFIG_FEATURE_KEY);

export const getMode = createSelector(
  selectFeature,
  (state: ConfigState) => state.mode
);

export const getLed = createSelector(
  selectFeature,
  (state: ConfigState) => state.led
);
