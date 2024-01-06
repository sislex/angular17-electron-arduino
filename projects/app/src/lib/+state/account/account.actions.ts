import { createAction, props } from '@ngrx/store';
import {IUser} from '../config/config.reducer';

export const getUserFromLocalStorage = createAction('[Account] getUserFromLocalStorage');
export const resetUserFromLocalStorageAndState = createAction('[Account] resetUserFromLocalStorageAndState');
export const resetUser = createAction('[Account] resetUser');

export const setAndSaveUser = createAction(
  '[Account] setAndSaveUser',
  props<{ user: IUser }>()
);

export const setUser = createAction(
  '[Account] setUser',
  props<{ user: IUser }>()
);
