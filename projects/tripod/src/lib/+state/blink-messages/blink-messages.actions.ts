import { createAction, props } from '@ngrx/store';
import { IBlinkLog, IBlinkMessage } from './blink-messages.reducer';

export const setDeviceName = createAction(
  `[blinkMessages] setDeviceName`,
  props<{ deviceName: string }>()
);

export const sendMessageToDevice = createAction(
  `[blinkMessages] sendMessageToDevice`,
  props<{ message: IBlinkMessage }>()
);

export const setBlinkLog = createAction(
  '[blinkMessages] setLog',
  props<{ log: IBlinkLog }>()
);

export const messageForWidget = createAction(
  `[blinkMessages] messageForWidget`,
  props<{ message: IBlinkMessage }>()
);


