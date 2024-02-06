import { createAction, props } from '@ngrx/store';

export const getModeFromLocalStorage = createAction('[Mode] getModeFromLocalStorage');
export const resetModeFromLocalStorageAndState = createAction('[Mode] resetModeFromLocalStorageAndState');
export const resetMode = createAction('[Mode] resetMode');

export const setAndSaveMode = createAction(
  '[Mode] setAndSaveMode',
  props<{ mode: string }>()
);

export const setMode = createAction(
  '[Mode] setMode',
  props<{ mode: string }>()
);
