import { createReducer, on } from '@ngrx/store';
import * as MessagesActions from './messages.actions';

export const MESSAGES_FEATURE_KEY = 'messages';

export interface IMessage {
  event: string;
  data?: any;
}

export interface ILog {
  timestamp: string;
  direction: 'from' | 'to';
  message: IMessage;
}

export interface MessagesState {
  channelName: string;
  logList: ILog[];
}

export interface MessagesPartialState {
  readonly [MESSAGES_FEATURE_KEY]: MessagesState;
}

export const initialState: MessagesState = {
  channelName: '',
  logList: [],
};

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.setChannelName, (state, {channelName}) => ({ ...state, channelName })),
  on(MessagesActions.setLog, (state, {log}) => ({ ...state, logList: [log, ...state.logList] })),
);

