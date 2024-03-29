import { createAction, props } from '@ngrx/store';
import { IMoveSkin } from './move-view-skin.reducer';

export const initSkin = createAction('[Skin] initSkin');

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

export const setQuality = createAction(
  '[Skin] setQuality',
  props<{ qualityList: IMoveSkin[] }>()
);

export const setResolution = createAction(
  '[Skin] setResolution',
  props<{ resolutionList: IMoveSkin[] }>()
);

export const setZoom = createAction(
  '[Skin] setZoom',
  props<{ zoomList: IMoveSkin[] }>()
);

export const setOrientation = createAction(
  '[Skin] setOrientation',
  props<{ orientationList: IMoveSkin[] }>()
);

export const setActiveDelay = createAction(
  '[Skin] setActiveDelay',
  props<{ delay: IMoveSkin }>()
);

export const setActiveQuality = createAction(
  '[Skin] setActiveQuality',
  props<{ quality: IMoveSkin }>()
);

export const setActiveResolution = createAction(
  '[Skin] setActiveResolution',
  props<{ resolution: IMoveSkin }>()
);

export const setActiveZoom = createAction(
  '[Skin] setActiveZoom',
  props<{ zoom: IMoveSkin }>()
);

export const setActiveOrientation = createAction(
  '[Skin] setActiveOrientation',
  props<{ orientation: IMoveSkin }>()
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

