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
}

export interface AboutPartialState {
    readonly [TRIPOD_VIEW_SKIN_FEATURE_KEY]: MoveViewSkinState;
}

export const initialState: MoveViewSkinState = {
    delay: [
        {text: '1', data:  1, selected: false},
        {text: '10', data:  10, selected: false},
        {text: '50', data:  50, selected: false},
        {text: '100', data:  100, selected: true},
        {text: '200', data:  200, selected: false}
    ],
    steps: [
        {text: '1', data:  1, selected: false},
        {text: '10', data:  10, selected: false},
        {text: '50', data:  50, selected: false},
        {text: '100', data:  100, selected: true},
        {text: '200', data:  200, selected: false}
    ]
};

export const MoveViewSkinReducer = createReducer(
    initialState,
    on(ViewSkinActions.setSteps, (state, {stepsList}) => ({ ...state, steps: stepsList })),
    on(ViewSkinActions.setDelay, (state, {delayList}) => ({ ...state, delay: delayList }))
);

