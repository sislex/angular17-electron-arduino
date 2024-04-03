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

export const setDelay1 = createAction(
  '[Skin] setDelay1',
  props<{ delayList1: IMoveSkin[] }>()
);

export const setDelay2 = createAction(
  '[Skin] setDelay2',
  props<{ delayList2: IMoveSkin[] }>()
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

export const setActiveDelay1 = createAction(
  '[Skin] setActiveDelay1',
  props<{ delay1: IMoveSkin }>()
);

export const setActiveDelay2 = createAction(
  '[Skin] setActiveDelay2',
  props<{ delay2: IMoveSkin }>()
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

export const setTargets = createAction(
  '[Skin] setTargets',
  props<{ targetsList: IMoveSkin[] }>()
);

export const setActiveTargets = createAction(
  '[Skin] setActiveTargets',
  props<{ targets: IMoveSkin }>()
);

export const offDisplayTargets = createAction(
  '[Skin] offDisplayTargets',
  props<{ displayTargets: IMoveSkin[] }>()
);

export const onDisplayTargets = createAction(
  '[Skin] onDisplayTargets',
  props<{ displayTargets: IMoveSkin }>()
);

export const setDisplayTargets = createAction(
  '[Skin] setDisplayTargets',
  props<{ displayTargetsList: IMoveSkin[] }>()
);

export const setActiveDisplayTargets = createAction(
  '[Skin] setActiveDisplayTargets',
  props<{ displayTargets: IMoveSkin }>()
);

