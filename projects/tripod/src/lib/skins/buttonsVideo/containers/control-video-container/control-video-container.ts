import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PageLayoutComponent } from '../../../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { sendMessageToDevice } from '../../../../+state/messages/messages.actions';
import { ControlButtonsComponent } from '../../../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import {
  getDelayModify, getOrientation,
  getQuality,
  getResolution,
  getSteps, getVideoUrl, getZoom
} from '../../../../+state/skins/move-skin/view/move-view-skin.selectors';
import {MoveViewSkinState} from '../../../../+state/skins/move-skin/view/move-view-skin.reducer';
import {SkinMoveKeyboardEventsService} from '../../../buttons/services/keyboardEvents.service';
import {
  initSkin,
  sendDirection,
  setActiveDelay, setActiveOrientation, setActiveQuality, setActiveResolution,
  setActiveStep, setActiveZoom
} from '../../../../+state/skins/move-skin/view/move-view-skin.actions';
import {StepsButtonComponent} from '../../../../../../../ui/src/lib/components/steps-button/steps-button.component';
import {NavPanelContainer} from '../nav-panel-container/nav-panel-container';
import {RequestsService} from '../../services/requests.service';
import {VideoContainerComponent} from '../video-conteiner/video-container.component';

@Component({
  selector: 'control-video-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ControlButtonsComponent,
    NavPanelContainer,
    RouterOutlet,
    AsyncPipe,
    StepsButtonComponent,
    VideoContainerComponent,
  ],
  templateUrl: './control-video-container.html',
  styleUrl: './control-video-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkinMoveKeyboardEventsService, RequestsService],
})
export class ControlVideoContainer implements OnInit, AfterViewInit  {
  steps$ = this.store.select(getSteps);
  delayModify$ = this.store.select(getDelayModify);
  getQuality$ = this.store.select(getQuality);
  getResolution$ = this.store.select(getResolution);
  getZoom$ = this.store.select(getZoom);
  getOrientation$ = this.store.select(getOrientation);

  @ViewChild('keyboardEventsArea') keyboardEventsArea!: ElementRef;

  private timerId: any;
  private isLongPress: boolean = false;

  constructor(
    private readonly store: Store<MoveViewSkinState>,
    private skinMoveKeyboardEventsService: SkinMoveKeyboardEventsService,
    private requestsService: RequestsService,
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
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'delay') {
      this.keyboardEventsArea.nativeElement.focus();
      this.store.dispatch(sendMessageToDevice({
        message: {
          event: 'SET',
          data: {d: $event.data.data}
        },
      }));
      this.store.dispatch(setActiveDelay({
        delay: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'quality') {
      this.keyboardEventsArea.nativeElement.focus();
      this.requestsService.setQuality($event.data.data);
      this.store.dispatch(setActiveQuality({
        quality: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'resolution') {
      this.keyboardEventsArea.nativeElement.focus();
      this.requestsService.setResolution($event.data.data);
      this.store.dispatch(setActiveResolution({
        resolution: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'zoom') {
      this.keyboardEventsArea.nativeElement.focus();
      this.requestsService.setZoom($event.data.data);
      this.store.dispatch(setActiveZoom({
        zoom: $event.data
      }));
    } else if ($event.event === 'SetButtonsComponent:BUTTON_CLICKED' && note === 'orientation') {
      this.keyboardEventsArea.nativeElement.focus();
      this.requestsService.setOrientation($event.data.data);
      this.store.dispatch(setActiveOrientation({
        orientation: $event.data
      }));
    } else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mousedown') {
      this.timerId = setTimeout(() => {
        this.isLongPress = true;
        this.store.dispatch(sendDirection({
          direction: $event.data,
          m: 2
        }));
      }, 170);
    } else if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED' && $event.note === 'mouseup') {
      clearTimeout(this.timerId);
      if (!this.isLongPress) {
        this.store.dispatch(sendDirection({
          direction: $event.data,
          m: 1
        }));
      } else {
        this.store.dispatch(sendDirection({
          direction: $event.data,
          m: 2
        }));
      }
      this.isLongPress = false;
    }
  }
}


