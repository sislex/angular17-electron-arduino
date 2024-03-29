import { createReducer, on } from '@ngrx/store';
import * as ViewSkinActions from './move-view-skin.actions';

export const TRIPOD_VIEW_SKIN_FEATURE_KEY = 'tripod/skins/move-skin/view';

export interface IMoveSkin {
    text: string;
    data: any;
    selected: boolean;
}

export interface MoveViewSkinState {
  delay: IMoveSkin[];
  steps: IMoveSkin[];
  videoUrlHost: string;
  quality: IMoveSkin[];
  resolution: IMoveSkin[];
  zoom: IMoveSkin[];
  orientation: IMoveSkin[];
  isShift: boolean;
  isCtrl: boolean;
}

export interface AboutPartialState {
    readonly [TRIPOD_VIEW_SKIN_FEATURE_KEY]: MoveViewSkinState;
}

export const initialState: MoveViewSkinState = {
  delay: [
    {text: '1', data:  1, selected: false},
    {text: '3', data:  3, selected: false},
    {text: '5', data:  5, selected: true},
    {text: '10', data:  10, selected: false},
    {text: '20', data:  20, selected: false},
  ],
  steps: [
    {text: '1', data:  1, selected: false},
    {text: '10', data:  10, selected: false},
    {text: '50', data:  50, selected: false},
    {text: '100', data:  100, selected: true},
    {text: '200', data:  200, selected: false},
  ],
  videoUrlHost: 'http://192.168.0.208:8080',
  quality: [
    {text: '10', data:  10, selected: false},
    {text: '20', data:  20, selected: false},
    {text: '30', data:  30, selected: true},
    {text: '40', data:  40, selected: false},
    {text: '50', data:  50, selected: false},
  ],
  resolution: [
    {text: '320x240', data:  '320x240', selected: false},
    {text: '640x480', data:  '640x480', selected: false},
    {text: '960x720', data:  '960x720', selected: false},
    {text: '1280x720', data:  '1280x720', selected: true},
  ],
  zoom: [
    {text: '0', data:  0, selected: true},
    {text: '10', data:  10, selected: false},
    {text: '20', data:  20, selected: false},
    {text: '30', data:  30, selected: false},
    {text: '40', data:  40, selected: false},
    {text: '50', data:  50, selected: false},
    {text: '100', data:  100, selected: false},
  ],
  orientation: [
    {text: '0', data:  'landscape', selected: true},
    {text: '90', data:  'portrait', selected: false},
    {text: '180', data:  'upsidedown', selected: false},
    {text: '270', data:  'upsidedown_portrait', selected: false},
  ],
  isShift: false,
  isCtrl: false,
};

export const MoveViewSkinReducer = createReducer(
    initialState,
    on(ViewSkinActions.setSteps, (state, {stepsList}) => ({ ...state, steps: stepsList })),
    on(ViewSkinActions.setDelay, (state, {delayList}) => ({ ...state, delay: delayList })),
    on(ViewSkinActions.setQuality, (state, {qualityList}) => ({ ...state, quality: qualityList })),
    on(ViewSkinActions.setResolution, (state, {resolutionList}) => ({ ...state, resolution: resolutionList })),
    on(ViewSkinActions.setOrientation, (state, {orientationList}) => ({ ...state, orientation: orientationList })),
    on(ViewSkinActions.setZoom, (state, {zoomList}) => ({ ...state, zoom: zoomList })),
    on(ViewSkinActions.setShift, (state, {isShift}) => ({ ...state, isShift })),
    on(ViewSkinActions.setCtrl, (state, {isCtrl}) => ({ ...state, isCtrl })),
);

