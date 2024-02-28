import { createAction, props } from '@ngrx/store';
import { IMoveSkin } from './move-view-skin.reducer';

export const setSteps = createAction(
  '[Skin] setSteps',
  props<{ stepsList: IMoveSkin[] }>()
);

export const setActiveStep = createAction(
  '[Skin] setActiveStep',
  props<{ steps: IMoveSkin }>()
);

export const setDelay = createAction(
  '[Skin] setDelay',
  props<{ delayList: IMoveSkin[] }>()
);

export const setActiveDelay = createAction(
  '[Skin] setActiveDelay',
  props<{ delay: IMoveSkin }>()
);

export const sendDirection = createAction(
  '[Skin] sendDirection',
  props<{ direction: string, m: number }>()
);

export const setShift = createAction(
  '[Skin] setShift',
  props<{ isShift: boolean}>()
);

export const setCtrl = createAction(
  '[Skin] setCtrl',
  props<{ isCtrl: boolean}>()
);

