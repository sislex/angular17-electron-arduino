import { createReducer, on } from '@ngrx/store';
import * as BlinkMessagesActions from './messages.actions';

export const TRIPOD_MESSAGES_FEATURE_KEY = 'tripod/messages';

export interface IMessagesState {
    deviceName: string;
    logList: ILog[];
}

export interface ILog {
  timestamp: string;
  direction: 'from' | 'to';
  message: IMessage;
}

export interface IMessage {
  event: string;
  data?: any;
}

export interface TripodMessagesPartialState {
    readonly [TRIPOD_MESSAGES_FEATURE_KEY]: IMessagesState;
}

export const initialState: IMessagesState = {
  deviceName: '',
  logList: [],
};

export const MessagesReducer = createReducer(
    initialState,
  on(BlinkMessagesActions.setDeviceName, (state, {deviceName}) => ({ ...state, deviceName })),
  on(BlinkMessagesActions.setLog, (state, {log}) => ({ ...state, logList: [log, ...state.logList] })),
);


