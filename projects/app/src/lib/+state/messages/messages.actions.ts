import { createAction, props } from '@ngrx/store';
import {ILog, IMessage} from './messages.reducer';

export const setChannelNameAndSubscribe = createAction(
  '[Messages] setChannelNameAndSubscribe',
  props<{ channelName: string }>()
);

export const setChannelName = createAction(
  '[Messages] setChannelName',
  props<{ channelName: string }>()
);

export const setLog = createAction(
  '[Messages] setLog',
  props<{ log: ILog }>()
);

export const sendMessage = createAction(
  '[Messages] sendMessage',
  props<{ message: IMessage }>()
);

