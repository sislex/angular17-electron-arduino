import { createReducer, on } from '@ngrx/store';
import {setConfig} from './blink-config.actions';

export const BLINK_CONFIG_FEATURE_KEY = 'blink/config';

export interface BlinkConfigState {
  mode: string;
  led: string;
}

export interface BlinkConfigPartialState {
  readonly [BLINK_CONFIG_FEATURE_KEY]: BlinkConfigState;
}

export const initialState: BlinkConfigState = {
  mode: '',
  led: '',
};

export const blinkConfigReducer = createReducer(
  initialState,
  on(setConfig, (state, {mode, led}) => ({ ...state, mode, led })),
);

