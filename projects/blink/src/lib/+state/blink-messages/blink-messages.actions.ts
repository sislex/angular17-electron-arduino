import { createAction, props } from '@ngrx/store';
import {IMessage} from '../../../../../app/src/lib/+state/messages/messages.reducer';

export const setDeviceName = createAction(
  `[blinkMessages] setDeviceName`,
  props<{ deviceName: string }>()
);

export const sendMessageToDevice = createAction(
  `[blinkMessages] sendMessageToDevice`,
  props<{ message: IMessage }>()
);


