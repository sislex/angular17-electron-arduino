import { createAction, props } from '@ngrx/store';
import { IMoveSkin } from './move-view-skin.reducer';

export const initSkin = createAction('[MoveViewSkin] initSkin');

export const setSteps = createAction(
  '[MoveViewSkin] setSteps',
  props<{ stepsList: IMoveSkin[] }>()
);

export const setActiveStep = createAction(
  '[MoveViewSkin] setActiveStep',
  props<{ steps: IMoveSkin }>()
);

export const setDelay1 = createAction(
  '[MoveViewSkin] setDelay1',
  props<{ delayList1: IMoveSkin[] }>()
);

export const setDelay2 = createAction(
  '[MoveViewSkin] setDelay2',
  props<{ delayList2: IMoveSkin[] }>()
);

export const setQuality = createAction(
  '[MoveViewSkin] setQuality',
  props<{ qualityList: IMoveSkin[] }>()
);

export const setResolution = createAction(
  '[MoveViewSkin] setResolution',
  props<{ resolutionList: IMoveSkin[] }>()
);

export const setZoom = createAction(
  '[MoveViewSkin] setZoom',
  props<{ zoomList: IMoveSkin[] }>()
);

export const setOrientation = createAction(
  '[MoveViewSkin] setOrientation',
  props<{ orientationList: IMoveSkin[] }>()
);

export const setActiveDelay1 = createAction(
  '[MoveViewSkin] setActiveDelay1',
  props<{ delay1: IMoveSkin }>()
);

export const setActiveDelay2 = createAction(
  '[MoveViewSkin] setActiveDelay2',
  props<{ delay2: IMoveSkin }>()
);

export const setActiveQuality = createAction(
  '[MoveViewSkin] setActiveQuality',
  props<{ quality: IMoveSkin }>()
);

export const setActiveResolution = createAction(
  '[MoveViewSkin] setActiveResolution',
  props<{ resolution: IMoveSkin }>()
);

export const setActiveZoom = createAction(
  '[MoveViewSkin] setActiveZoom',
  props<{ zoom: IMoveSkin }>()
);

export const setActiveOrientation = createAction(
  '[MoveViewSkin] setActiveOrientation',
  props<{ orientation: IMoveSkin }>()
);

export const sendDirection = createAction(
  '[MoveViewSkin] sendDirection',
  props<{ direction: string, m: number }>()
);  

export const setDirection = createAction(
  '[Move View Skin] setDirection',
  props<{ direction: {s1: number, s2: number, d1: number, d2: number} }>()
);

export const setShift = createAction(
  '[MoveViewSkin] setShift',
  props<{ isShift: boolean}>()
);

export const setCtrl = createAction(
  '[MoveViewSkin] setCtrl',
  props<{ isCtrl: boolean}>()
);

export const setTargets = createAction(
  '[MoveViewSkin] setTargets',
  props<{ targetsList: IMoveSkin[] }>()
);

export const setActiveTargets = createAction(
  '[MoveViewSkin] setActiveTargets',
  props<{ targets: IMoveSkin }>()
);

export const offDisplayTargets = createAction(
  '[MoveViewSkin] offDisplayTargets',
  props<{ displayTargets: IMoveSkin[] }>()
);

export const onDisplayTargets = createAction(
  '[MoveViewSkin] onDisplayTargets',
  props<{ displayTargets: IMoveSkin }>()
);

export const setDisplayTargets = createAction(
  '[MoveViewSkin] setDisplayTargets',
  props<{ displayTargetsList: IMoveSkin[] }>()
);

export const setActiveDisplayTargets = createAction(
  '[MoveViewSkin] setActiveDisplayTargets',
  props<{ displayTargets: IMoveSkin }>()
);

