import { createAction, props } from '@ngrx/store';

export const getSkinFromLocalStorage = createAction('[Skin] getSkinFromLocalStorage');
export const resetSkinFromLocalStorageAndState = createAction('[Skin] resetSkinFromLocalStorageAndState');
export const resetSkin = createAction('[Skin] resetSkin');

export const setAndSaveSkin = createAction(
  '[Skin] setAndSaveSkin',
  props<{ skin: string }>()
);

export const setSkin = createAction(
  '[Skin] setSkin',
  props<{ skin: string }>()
);
