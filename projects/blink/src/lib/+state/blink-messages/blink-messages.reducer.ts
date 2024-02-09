import { createReducer, on } from '@ngrx/store';
import {ILog} from '../../../../../app/src/lib/+state/messages/messages.reducer';
import * as BlinkMessagesActions from './blink-messages.actions';

export const BLINK_MESSAGES_FEATURE_KEY = 'blink/messages';

export interface IBlinkMessagesState {
    deviceName: string;
    logList: ILog[];
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
);
