import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendMessageToDevice } from '../../../+state/messages/messages.actions';
import { sendDirection, setCtrl, setShift } from '../../../+state/skins/move-skin/view/move-view-skin.actions';

@Injectable()
export class SkinMoveKeyboardEventsService {

  private isCtrlDown = false;
  private isShiftDown = false;
  private isArrowLeftDown = false;
  private isArrowRightDown = false;
  private isArrowUpDown = false;
  private isArrowDownDown = false;

  constructor(
    private readonly store: Store,
  ) {
  }

  events(message: any, note: any) {
    // console.log('message', message);
    if (message.key === 'Control' && note === 'down' && !this.isCtrlDown) {
      this.isCtrlDown = true;
      this.store.dispatch(setCtrl({
        isCtrl: true
      }));
    } else if (message.key === 'Control' && note === 'up') {
      this.isCtrlDown = false;
      this.store.dispatch(setCtrl({
        isCtrl: false
      }));
    }

    else if (message.key === 'Shift' && note === 'down' && !this.isShiftDown) {
      this.isShiftDown = true;
      this.store.dispatch(setShift({
        isShift: true
      }));
    } else if (message.key === 'Shift' && note === 'up') {
      this.isShiftDown = false;
      this.store.dispatch(setShift({
        isShift: false
      }));
    }

    else if (message.key === 'ArrowLeft' && note === 'down' && !this.isArrowLeftDown) {
      this.isArrowLeftDown = true;
      this.store.dispatch(sendDirection({
        direction: 'LEFT',
        m: 2
      }));
    } else if (message.key === 'ArrowLeft' && note === 'up') {
      this.isArrowLeftDown = false;
      this.store.dispatch(sendDirection({
        direction: 'HORIZONTALSTOP',
        m: 2
      }));
    }

    else if (message.key === 'ArrowRight' && note === 'down' && !this.isArrowRightDown) {
      this.isArrowRightDown = true;
      this.store.dispatch(sendDirection({
        direction: 'RIGHT',
        m: 2
      }));
    } else if (message.key === 'ArrowRight' && note === 'up') {
      this.isArrowRightDown = false;
      this.store.dispatch(sendDirection({
        direction: 'HORIZONTALSTOP',
        m: 2
      }));
    }

    else if (message.key === 'ArrowUp' && note === 'down' && !this.isArrowUpDown) {
      this.isArrowUpDown = true;
      this.store.dispatch(sendDirection({
        direction: 'UP',
        m: 2
      }));
      
    } else if (message.key === 'ArrowUp' && note === 'up') {
      this.isArrowUpDown = false;
      this.store.dispatch(sendDirection({
        direction: 'VERTICALSTOP',
        m: 2
      }));
    }

    else if (message.key === 'ArrowDown' && note === 'down' && !this.isArrowDownDown) {
      this.isArrowDownDown = true;
      this.store.dispatch(sendDirection({
        direction: 'DOWN',
        m: 2
      }));
    } else if (message.key === 'ArrowDown' && note === 'up') {
      this.isArrowDownDown = false;
      this.store.dispatch(sendDirection({
        direction: 'VERTICALSTOP',
        m: 2
      }));
    }
  };

  

  event (data: any) {
    this.store.dispatch(sendMessageToDevice({
      message: {
        event: 'SET',
        data: data.data
      },
    }));
  }
}
