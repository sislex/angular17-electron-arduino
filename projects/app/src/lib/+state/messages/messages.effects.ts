import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, take, tap} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
// import {eventSendGetUsbDevices} from './messages.actions';
import {IpcService} from '../../services/ipc.service';
import {Store} from '@ngrx/store';
import {setUsbList} from '../usb/usb.actions';
import {sendMessage, setChannelName, setChannelNameAndSubscribe, setLog} from './messages.actions';
import {getChannelName} from './messages.selectors';
import {MessagesFromElectronService} from '../../services/messagesFromElectron.service';

@Injectable()
export class MessagesEffects {

  setChannelNameAndSubscribe$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setChannelNameAndSubscribe),
        tap(({channelName}) => {
          this.store.dispatch(setChannelName({ channelName }));

          this.ipcService.on(channelName, (event, json) => {
            if (json) {
              const message = JSON.parse(json);
              this.store.dispatch(setLog({
                log: {
                  timestamp: new Date().toISOString(),
                  direction: 'from',
                  message,
                }
              }));
              this.messagesFromElectronService.events(message);
            }
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  sendMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMessage),
        concatLatestFrom(() => this.store.select(getChannelName)),
        tap(([{message}, channelName]) => {
          if (this.ipcService.isElectron()) {
            const messageJson = JSON.stringify(message);
            this.ipcService.send(channelName, messageJson);
            this.store.dispatch(setLog({
              log: {
                timestamp: new Date().toISOString(),
                direction: 'to',
                message,
              }
            }));
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private ipcService: IpcService,
    private messagesFromElectronService: MessagesFromElectronService,
  ) {}
}
