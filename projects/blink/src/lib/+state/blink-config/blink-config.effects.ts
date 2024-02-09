import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { BlinkConfigPartialState } from './blink-config.reducer';
import {sendMessage, setLog} from '../../../../../app/src/lib/+state/messages/messages.actions';
import {tap} from 'rxjs';
// import {getDeviceName} from './blink-config.selectors';

@Injectable()
export class BlinkConfigEffects {

  // blinkSendMessage$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(blinkSendMessage),
  //       concatLatestFrom(() => this.store.select(getDeviceName)),
  //       tap(([{message}, deviceName]) => {
  //         this.store.dispatch(sendMessage({
  //           message : {
  //             event: message.event,
  //             data: {
  //               ...message.data,
  //               deviceName,
  //             },
  //           }
  //         }));
  //       })
  //     ),
  //   {
  //     dispatch: false,
  //   }
  // );

  constructor(
    private store: Store<BlinkConfigPartialState>,
    private actions$: Actions,
  ) {}

}
