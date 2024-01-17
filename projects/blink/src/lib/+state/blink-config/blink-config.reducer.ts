import { createReducer, on } from '@ngrx/store';

import * as BlinkConfigActions from './blink-config.actions';

export const BLINK_CONFIG_FEATURE_KEY = 'blink/config';

export interface BlinkConfigState {
  deviceName: string;
}

export interface BlinkConfigPartialState {
  readonly [BLINK_CONFIG_FEATURE_KEY]: BlinkConfigState;
}

export const initialState: BlinkConfigState = {
  deviceName: '',
};

export const blinkConfigReducer = createReducer(
  initialState,
  on(BlinkConfigActions.setDeviceName, (state, {deviceName}) => ({ ...state, deviceName })),
);

