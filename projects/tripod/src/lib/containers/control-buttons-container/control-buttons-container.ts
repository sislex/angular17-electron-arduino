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
  private isShiftDown = false;
  private isSpaceDown = false;

  steps$ = this.store.select(getSteps);
  delay$ = this.store.select(getDelay);

  constructor(
    private readonly store: Store<MoveViewSkinState>,
    private skinMoveKeyboardEventsService: SkinMoveKeyboardEventsService,
    ) {}

  handleKeyboardEvent(event: KeyboardEvent) {
    this.skinMoveKeyboardEventsService.events(event);
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
    } else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED') {
      this.store.dispatch(sendDirection({
      direction: $event.data
      }));
    }
  }

  // @HostListener('window:keydown', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Shift' && !this.isShiftDown) {
  //     this.isShiftDown = true;
  //     this.events({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 1 } }, 'delay');
  //   } else if (event.key === ' ' && !this.isSpaceDown) {
  //     this.isSpaceDown = true;
  //     this.events({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 100 } }, 'delay');
  //   }
  // }
  //
  // @HostListener('window:keyup', ['$event'])
  // handleKeyUp(event: KeyboardEvent) {
  //   if (event.key === 'Shift') {
  //     this.isShiftDown = false;
  //     this.events({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 50 } }, 'delay');
  //   } else if (event.key === ' ') {
  //     this.isSpaceDown = false;
  //     this.events({ event: 'SetButtonsComponent:BUTTON_CLICKED', data: { data: 50 } }, 'delay');
  //   }
  // }

  // @HostListener('window:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'ArrowUp':
  //       this.buttonClick('UP');
  //       break;
  //     case 'ArrowDown':
  //       this.buttonClick('DOWN');
  //       break;
  //     case 'ArrowLeft':
  //       this.buttonClick('LEFT');
  //       break;
  //     case 'ArrowRight':
  //       this.buttonClick('RIGHT');
  //       break;
  //   }
  // }
}
