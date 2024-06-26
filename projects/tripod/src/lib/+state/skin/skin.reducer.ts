import { createReducer, on } from '@ngrx/store';
import * as BlinkSkinActions from './skin.actions';

export const TRIPOD_SKIN_FEATURE_KEY = 'tripod/skin';

export interface SkinState {
    skin: string;
    skinsList: string[];
}

export interface AboutPartialState {
    readonly [TRIPOD_SKIN_FEATURE_KEY]: SkinState;
}

export const initialState: SkinState = {
    skin: 'buttons',
    skinsList: ['buttons', 'buttonsVideo', 'videoTest'],
};

export const SkinReducer = createReducer(
    initialState,
    on(BlinkSkinActions.setSkin, (state, {skin}) => ({ ...state, skin })),
    on(BlinkSkinActions.resetSkin, (state) => ({ ...initialState })),
);

