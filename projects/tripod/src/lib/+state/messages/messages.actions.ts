import { createAction, props } from '@ngrx/store';
import { ILog, IMessage } from './messages.reducer';

export const setDeviceName = createAction(
  `[deviceMessages] setDeviceName`,
  props<{ deviceName: string }>()
);

export const sendMessageToDevice = createAction(
  `[deviceMessages] sendMessageToDevice`,
  props<{ message: IMessage }>(),
);

export const setLog = createAction(
  '[deviceMessages] setLog',
  props<{ log: ILog }>()
);

export const messageForWidget = createAction(
  `[deviceMessages] messageForWidget`,
  props<{ message: IMessage }>()
);


