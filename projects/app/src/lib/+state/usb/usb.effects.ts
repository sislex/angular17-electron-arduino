import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, take, tap} from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {IpcService} from '../../services/ipc.service';
import {Store} from '@ngrx/store';
import {getChannelName} from '../messages/messages.selectors';
import {sendMessage} from '../messages/messages.actions';

@Injectable()
export class UsbEffects {

  // eventGetUsbDevices$ = createEffect(() => this.actions$.pipe(
  //     ofType(eventSendGetUsbDevices),
  //     tap(() => {
  //       console.log('eventGetUsbDevices');
  //
  //       // if (this.ipcService.isElectron()) {
  //       //   if (command === 'GET_USB_DEVICES') {
  //       //     this.getChannelName$.pipe(take(1)).subscribe((channelName: string) => {
  //       //       const event = 'GET_USB_DEVICES';
  //       //       const message = JSON.stringify({event});
  //       //       this.ipcService.send(channelName, message);
  //       //     });
  //       //   }
  //       // }
  //     })
  // ));

  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private ipcService: IpcService,
  ) {}
}
