import { createReducer, on } from '@ngrx/store';
import * as BlinkMessagesActions from './blink-messages.actions';

export const BLINK_MESSAGES_FEATURE_KEY = 'blink/messages';

export interface IBlinkMessagesState {
    deviceName: string;
    logList: IBlinkLog[];
}

export interface IBlinkLog {
  timestamp: string;
  direction: 'from' | 'to';
  message: IBlinkMessage;
}

export interface IBlinkMessage {
  event: string;
  data?: any;
}

export interface BlinkMessagesPartialState {
    readonly [BLINK_MESSAGES_FEATURE_KEY]: IBlinkMessagesState;
}

export const initialState: IBlinkMessagesState = {
  deviceName: '',
  logList: [],
};

export const blinkMessagesReducer = createReducer(
    initialState,
  on(BlinkMessagesActions.setDeviceName, (state, {deviceName}) => ({ ...state, deviceName })),
  on(BlinkMessagesActions.setBlinkLog, (state, {log}) => ({ ...state, logList: [log, ...state.logList] })),
);


