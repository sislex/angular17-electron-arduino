import { createReducer, on } from '@ngrx/store';

import * as AccountActions from './account.actions';
import {resetUser} from './account.actions';

export const ACCOUNT_FEATURE_KEY = 'account';

export interface AccountState {
  id: number;
  name: string;
  role: string;
}

export interface AccountPartialState {
  readonly [ACCOUNT_FEATURE_KEY]: AccountState;
}

export const initialState: AccountState = {
  id: 0,
  name: '',
  role: '',
};

export const accountReducer = createReducer(
  initialState,
  on(AccountActions.setUser, (state, {user}) => ({ ...state, ...user })),
  on(AccountActions.resetUser, (state) => ({ ...initialState })),
);

