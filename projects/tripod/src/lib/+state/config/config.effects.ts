import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConfigPartialState } from './config.reducer';
import { tap } from 'rxjs';
import { getInfo, init, setConfig } from './config.actions';
import { getSelectedUsb } from '../../../../../app/src/lib/+state/usb/usb.selectors';
import { messageForWidget, sendMessageToDevice, setDeviceName } from '../messages/messages.actions';

@Injectable()
export class ConfigEffects {

  init$ = createEffect(() =>
      this.actions$.pipe(
        ofType(init),
        concatLatestFrom(() => this.store.select(getSelectedUsb)),
        tap(([, deviceName]) => {
          this.store.dispatch(setDeviceName({deviceName}));
          this.store.dispatch(getInfo());
        })
      ),
    {
      dispatch: false,
    }
  );

  usbDeviceGetInfo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getInfo),
        tap(() => {
          this.store.dispatch(sendMessageToDevice({
            message: {
              event: 'GET_INFO',
            },
          }));
        })
      ),
    {
      dispatch: false,
    }
  );

  check$ = createEffect(() =>
      this.actions$.pipe(
        ofType(messageForWidget),
        tap(({message}) => {
          if (message.event === 'DEVICE_INFO') {
            this.store.dispatch(setConfig({
              mode: message.data.mode,
              led: message.data.led,
            }));
          }

        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private store: Store<ConfigPartialState>,
    private actions$: Actions,
  ) {}

}
