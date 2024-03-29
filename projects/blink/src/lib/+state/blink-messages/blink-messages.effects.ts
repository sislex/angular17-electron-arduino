import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {messageFromDevice, sendMessage} from '../../../../../app/src/lib/+state/messages/messages.actions';
import {tap} from 'rxjs';
import {messageForWidget, sendMessageToDevice, setBlinkLog} from './blink-messages.actions';
import {getDeviceName} from './blink-messages.selectors';
import {BlinkMessagesPartialState} from './blink-messages.reducer';
import {MessagesPartialState} from '../../../../../app/src/lib/+state/messages/messages.reducer';

@Injectable()
export class BlinkMessagesEffects {

  messageFromDevice$ = createEffect(() =>
      this.actions$.pipe(
        ofType(messageFromDevice),
        concatLatestFrom(() => this.store.select(getDeviceName)),
        tap(([{message}, deviceName]) => {
          if (deviceName === message.data.deviceName) {
            const messageObj = JSON.parse(message.data.message);
            this.store.dispatch(messageForWidget({
              message: messageObj,
            }));
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  sendMessageFromDevice$ = createEffect(() =>
      this.actions$.pipe(
        ofType(messageForWidget),
        tap(({message}) => {
          if (message.event === 'INFO') {
            this.store.dispatch(setBlinkLog({
              log: {
                timestamp: new Date().toISOString(),
                direction: 'from',
                message
              }
            }));
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  sendMessageToDevice$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMessageToDevice),
        concatLatestFrom(() => this.store.select(getDeviceName)),
        tap(([{message}, deviceName]) => {
          const now = new Date();
          const timestamp = now.getTime().toString();

          const messageWithTimestamp = {
            ...message,
            data: message.data ? {
              ...message.data,
              timestamp,
            } : {
              timestamp,
            },
          };

          this.store.dispatch(sendMessage({
            message : {
              event: 'TO_DEVICE',
              data: {
                deviceName,
                message: messageWithTimestamp,
              },
            }
          }));
          
          this.store.dispatch(setBlinkLog({
            log: {
              timestamp: new Date().toISOString(),
              direction: 'to',
              message: messageWithTimestamp,
            }
          }));
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private store: Store<BlinkMessagesPartialState | MessagesPartialState>,
    private actions$: Actions,
  ) {}

}
