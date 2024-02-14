import { createAction, props } from '@ngrx/store';
import { ILog, IMessage } from './messages.reducer';

export const setDeviceName = createAction(
  `[blinkMessages] setDeviceName`,
  props<{ deviceName: string }>()
);

export const sendMessageToDevice = createAction(
  `[blinkMessages] sendMessageToDevice`,
  props<{ message: IMessage }>()
);

export const setLog = createAction(
  '[blinkMessages] setLog',
  props<{ log: ILog }>()
);

export const messageForWidget = createAction(
  `[blinkMessages] messageForWidget`,
  props<{ message: IMessage }>()
);


