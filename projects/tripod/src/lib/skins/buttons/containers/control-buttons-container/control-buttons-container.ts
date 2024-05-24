import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {H100LayoutComponent, PageLayoutComponent} from '../../../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ControlButtonsComponent } from '../../../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';
import { StepsButtonComponent } from '../../../../../../../ui/src/lib/components/steps-button/steps-button.component';
import { MoveViewSkinState } from '../../../../+state/skins/move-skin/view/move-view-skin.reducer';
import { getDelayModify1, getDelayModify2, getSteps } from '../../../../+state/skins/move-skin/view/move-view-skin.selectors';
import {
  initSkin,
  sendDirection,
  setActiveDelay1,
  setActiveDelay2,
  setActiveStep
} from '../../../../+state/skins/move-skin/view/move-view-skin.actions';
import {SkinMoveKeyboardEventsService} from '../../services/keyboardEvents.service';

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
    H100LayoutComponent,
  ],
  templateUrl: './control-buttons-container.html',
  styleUrl: './control-buttons-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkinMoveKeyboardEventsService],
})
export class ControlButtonsContainer implements OnInit, AfterViewInit {
  steps$ = this.store.select(getSteps);
  delayModify1$ = this.store.select(getDelayModify1);
  delayModify2$ = this.store.select(getDelayModify2);

  @ViewChild('keyboardEventsArea') keyboardEventsArea!: ElementRef;

  constructor(
    private readonly store: Store<MoveViewSkinState>,
    private skinMoveKeyboardEventsService: SkinMoveKeyboardEventsService,
  ) {}

  ngOnInit() {
    this.store.dispatch(initSkin());
  }

  ngAfterViewInit(): void {
    this.keyboardEventsArea.nativeElement.focus();
  }

  handleKeyboardEvent(event: KeyboardEvent, note: string) {
    this.skinMoveKeyboardEventsService.events(event, note);
  }

  events($event: any, note: string = '') {
    if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'steps') {
      this.keyboardEventsArea.nativeElement.focus();
      this.store.dispatch(setActiveStep({
        steps: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'delay1') {
      this.keyboardEventsArea.nativeElement.focus();
      this.store.dispatch(setActiveDelay1({
        delay1: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'delay2') {
      this.keyboardEventsArea.nativeElement.focus();
      this.store.dispatch(setActiveDelay2({
        delay2: $event.data
      }));
    }

    let isArrowLeftDown = false;
    let isArrowRightDown = false;
    let isArrowUpDown = false;
    let isArrowDownDown = false;

    if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown' && $event.data === 'LEFT') {
      isArrowLeftDown = true;
      this.store.dispatch(sendDirection({
        direction: 'LEFT',
        m: 2
      }));
    } else if (($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup' && $event.data === 'LEFT')) {
      isArrowLeftDown = false;
      this.store.dispatch(sendDirection({
        direction: 'HORIZONTALSTOP',
        m: 2
      }));
    }

    else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown' && $event.data === 'RIGHT') {
      isArrowRightDown = true;
      this.store.dispatch(sendDirection({
        direction: 'RIGHT',
        m: 2
      }));
    } else if (($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup' && $event.data === 'RIGHT')) {
      isArrowRightDown = false;
      this.store.dispatch(sendDirection({
        direction: 'HORIZONTALSTOP',
        m: 2
      }));
    }

    else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown' && $event.data === 'UP') {
      isArrowUpDown = true;
      this.store.dispatch(sendDirection({
        direction: 'UP',
        m: 2
      }));

    } else if (($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup' && $event.data === 'UP')) {
      isArrowUpDown = false;
      this.store.dispatch(sendDirection({
        direction: 'VERTICALSTOP',
        m: 2
      }));
    }

    else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown' && $event.data === 'DOWN') {
      isArrowDownDown = true;
      this.store.dispatch(sendDirection({
        direction: 'DOWN',
        m: 2
      }));
    } else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup' && $event.data === 'DOWN') {
      isArrowDownDown = false;
      this.store.dispatch(sendDirection({
        direction: 'VERTICALSTOP',
        m: 2
      }));
    }
  }
}
