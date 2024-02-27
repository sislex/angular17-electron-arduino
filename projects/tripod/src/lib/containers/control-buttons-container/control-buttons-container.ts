import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { sendMessageToDevice } from '../../+state/messages/messages.actions';
import { ControlButtonsComponent } from '../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';
import { StepsButtonComponent } from '../../../../../ui/src/lib/components/steps-button/steps-button.component';
import { MoveViewSkinState } from '../../+state/skins/move-skin/view/move-view-skin.reducer';
import { getDelay, getSteps } from '../../+state/skins/move-skin/view/move-view-skin.selectors';
import { sendDirection, setActiveDelay, setActiveStep } from '../../+state/skins/move-skin/view/move-view-skin.actions';
import {SkinMoveKeyboardEventsService} from '../../services/moveSkin/keyboardEvents.service';

@Component({
  selector: 'control-buttons-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ControlButtonsComponent,
    NavPanelContainer,
    RouterOutlet,
    AsyncPipe,
    StepsButtonComponent,
  ],
  templateUrl: './control-buttons-container.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkinMoveKeyboardEventsService],
})
export class ControlButtonsContainer {

  steps$ = this.store.select(getSteps);
  delay$ = this.store.select(getDelay);

  private timerId: any;
  private isLongPress: boolean = false;

  constructor(
    private readonly store: Store<MoveViewSkinState>,
    private skinMoveKeyboardEventsService: SkinMoveKeyboardEventsService,
    ) {}

  handleKeyboardEvent(event: KeyboardEvent, note: any) {
    this.skinMoveKeyboardEventsService.events(event, note);
  }
  


  events($event: any, note: string = '') {
    if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'steps') {
      this.store.dispatch(setActiveStep({
        steps: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'delay') {
      this.store.dispatch(sendMessageToDevice({
        message: {
          event: 'SET',
          data: {d: $event.data.data}
        },
      }));
      this.store.dispatch(setActiveDelay({
        delay: $event.data
      }));
    } 
    
    else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown') {
      this.timerId = setTimeout(() => {
        this.isLongPress = true;
        this.store.dispatch(sendDirection({
          direction: $event.data,
          m: 2
        }));
        console.log('Зажал', $event)
      }, 170);
    }

    else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup') {
      clearTimeout(this.timerId); // Скидываем таймер
      if (!this.isLongPress) {
        this.store.dispatch(sendDirection({
          direction: $event.data,
          m: 1
        }));
        console.log('Кликнул', $event)
      } else {      
        this.store.dispatch(sendDirection({
        direction: $event.data,
        m: 2
        }));
        console.log('Отпустил', $event)
      }
      this.isLongPress = false;
    }
  }
}