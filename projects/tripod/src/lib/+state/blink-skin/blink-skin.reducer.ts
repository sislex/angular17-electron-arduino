import { createReducer, on } from '@ngrx/store';
import * as BlinkSkinActions from './blink-skin.actions';

export const BLINK_SKIN_FEATURE_KEY = 'blink/skin';

export interface BlinkSkinState {
    skin: string;
}

export interface AboutPartialState {
    readonly [BLINK_SKIN_FEATURE_KEY]: BlinkSkinState;
}

export const initialState: BlinkSkinState = {
    skin: 'two'
};

export const blinkSkinReducer = createReducer(
    initialState,
    on(BlinkSkinActions.setSkin, (state, {skin}) => ({ ...state, skin })),
    on(BlinkSkinActions.resetSkin, (state) => ({ ...initialState })),
);

