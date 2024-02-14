import { createReducer, on } from '@ngrx/store';
import {setConfig} from './config.actions';

export const TRIPOD_CONFIG_FEATURE_KEY = 'tripod/config';

export interface ConfigState {
  mode: string;
  led: string;
}

export interface ConfigPartialState {
  readonly [TRIPOD_CONFIG_FEATURE_KEY]: ConfigState;
}

export const initialState: ConfigState = {
  mode: '',
  led: '',
};

export const ConfigReducer = createReducer(
  initialState,
  on(setConfig, (state, {mode, led}) => ({ ...state, mode, led })),
);

