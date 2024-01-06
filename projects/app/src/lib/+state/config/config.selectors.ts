import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CONFIG_FEATURE_KEY, ConfigState} from './config.reducer';

export const selectFeature = createFeatureSelector<ConfigState>(CONFIG_FEATURE_KEY);

export const getUserList = createSelector(
  selectFeature,
  (state: ConfigState) => state.userList
);
