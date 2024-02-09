import { createReducer, on } from '@ngrx/store';
import * as BlinkModeActions from './blink-mode.actions';

export const BLINK_MODE_FEATURE_KEY = 'blink/mode';

export interface BlinkModeState {
    mode: string;
}

export interface AboutPartialState {
    readonly [BLINK_MODE_FEATURE_KEY]: BlinkModeState;
}

export const initialState: BlinkModeState = {
    mode: 'three'
};

export const blinkModeReducer = createReducer(
    initialState,
    on(BlinkModeActions.setMode, (state, {mode}) => ({ ...state, mode })),
    on(BlinkModeActions.resetMode, (state) => ({ ...initialState })),
);

