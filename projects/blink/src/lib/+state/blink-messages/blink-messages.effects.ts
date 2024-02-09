import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';

import { Store } from '@ngrx/store';
import {sendMessage} from '../../../../../app/src/lib/+state/messages/messages.actions';
import {tap} from 'rxjs';
import {sendMessageToDevice} from './blink-messages.actions';
import {getDeviceName} from './blink-messages.selectors';
import {BlinkMessagesPartialState} from './blink-messages.reducer';

@Injectable()
export class BlinkMessagesEffects {

  sendMessageToDevice$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMessageToDevice),
        concatLatestFrom(() => this.store.select(getDeviceName)),
        tap(([{message}, deviceName]) => {
          this.store.dispatch(sendMessage({
            message : {
              event: 'TO_DEVICE',
              data: {
                deviceName,
                message,
              },
            }
          }));
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private store: Store<BlinkMessagesPartialState>,
    private actions$: Actions,
  ) {}

}
