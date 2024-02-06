import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ACCOUNT_FEATURE_KEY, AccountState} from './account.reducer';

export const selectFeature = createFeatureSelector<AccountState>(ACCOUNT_FEATURE_KEY);

export const isUserLogin = createSelector(
  selectFeature,
  (state: AccountState) => !!state.id,
);

export const nameUserLogin = createSelector(
  selectFeature,
  (state: AccountState) => state.name,
);
