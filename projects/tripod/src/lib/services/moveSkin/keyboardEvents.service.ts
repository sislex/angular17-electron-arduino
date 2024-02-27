import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { sendMessageToDevice } from '../../+state/messages/messages.actions';
import { sendDirection } from '../../+state/skins/move-skin/view/move-view-skin.actions';

@Injectable()
export class SkinMoveKeyboardEventsService {

  private isAltDown = false;
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
    if (message.key === 'Alt' && note === 'down' && !this.isAltDown) {
      this.isAltDown = true;
      this.event ({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 100 } });
    } else if (message.key === 'Alt' && note === 'up') {
      this.isAltDown = false;
      this.event ({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 50 } });
    }

    else if (message.key === 'Shift' && note === 'down' && !this.isShiftDown) {
      this.isShiftDown = true;
      this.event ({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 1 } });
    } else if (message.key === 'Shift' && note === 'up') {
      this.isShiftDown = false;
      this.event ({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 50 } });
    }

    else if (message.key === 'ArrowLeft' && note === 'down' && !this.isArrowLeftDown) {
      this.isArrowLeftDown = true;
      this.store.dispatch(sendDirection({
        direction: 'LEFT',
        m: 2
      }));
      console.log('НАЖАЛИ l')
    } else if (message.key === 'ArrowLeft' && note === 'up') {
      this.isArrowLeftDown = false;
      this.store.dispatch(sendDirection({
        direction: 'LEFT',
        m: 2
      }));
      console.log('ОТПУСТИЛИ l')
    }
    
    else if (message.key === 'ArrowRight' && note === 'down' && !this.isArrowRightDown) {
      this.isArrowRightDown = true;
      this.store.dispatch(sendDirection({
        direction: 'RIGHT',
        m: 2
      }));
      console.log('НАЖАЛИ r')
    } else if (message.key === 'ArrowRight' && note === 'up') {
      this.isArrowRightDown = false;
      this.store.dispatch(sendDirection({
        direction: 'RIGHT',
        m: 2
      }));
      console.log('ОТПУСТИЛИ r')
    }

    else if (message.key === 'ArrowUp' && note === 'down' && !this.isArrowUpDown) {
      this.isArrowUpDown = true;
      this.store.dispatch(sendDirection({
        direction: 'UP',
        m: 2
      }));
      console.log('НАЖАЛИ u')
    } else if (message.key === 'ArrowUp' && note === 'up') {
      this.isArrowUpDown = false;
      this.store.dispatch(sendDirection({
        direction: 'UP',
        m: 2
      }));
      console.log('ОТПУСТИЛИ u')
    }

    else if (message.key === 'ArrowDown' && note === 'down' && !this.isArrowDownDown) {
      this.isArrowDownDown = true;
      this.store.dispatch(sendDirection({
        direction: 'DOWN',
        m: 2
      }));
      console.log('НАЖАЛИ d')
    } else if (message.key === 'ArrowDown' && note === 'up') {
      this.isArrowDownDown = false;
      this.store.dispatch(sendDirection({
        direction: 'DOWN',
        m: 2
      }));
      console.log('ОТПУСТИЛИ d')
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
