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
  props<{ direction: string }>()
);