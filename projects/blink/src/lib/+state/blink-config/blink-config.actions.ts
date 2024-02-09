import { createAction, props } from '@ngrx/store';
import {IMessage} from '../../../../../app/src/lib/+state/messages/messages.reducer';

export const blinkSendMessage = createAction(
  '[BlinkConfig] blinkSendMessage',
  props<{ message: IMessage }>()
);
