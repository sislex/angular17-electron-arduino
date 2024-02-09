import { createReducer, on } from '@ngrx/store';

export const BLINK_CONFIG_FEATURE_KEY = 'blink/config';

export interface BlinkConfigState {
  deviceName: string;
  about: string;
}

export interface BlinkConfigPartialState {
  readonly [BLINK_CONFIG_FEATURE_KEY]: BlinkConfigState;
}

export const initialState: BlinkConfigState = {
  deviceName: '',
  about: '',
};

export const blinkConfigReducer = createReducer(
  initialState,
);

