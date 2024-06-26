import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { getDeviceName } from './messages.selectors';
import { TripodMessagesPartialState } from './messages.reducer';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { messageForWidget, sendMessageToDevice, setLog } from './messages.actions';
import { MessagesPartialState } from '../../../../../app/src/lib/+state/messages/messages.reducer';
import { messageFromDevice, sendMessage } from '../../../../../app/src/lib/+state/messages/messages.actions';

@Injectable()
export class MessagesEffects {

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
            this.store.dispatch(setLog({
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

          this.store.dispatch(setLog({
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
    private store: Store<TripodMessagesPartialState | MessagesPartialState>,
    private actions$: Actions,
  ) {}
}
