import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {BlinkNavPanelContainerComponent} from '../blink-nav-panel-container/blink-nav-panel-container.component';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {blinkSendMessage, setDeviceName} from '../../+state/blink-config/blink-config.actions';
import {RouterOutlet} from '@angular/router';
import { BlinkAboutContainerComponent } from '../blink-about-container/blink-about-container.component';
import { LightThreeComponent } from '../../../../../ui/src/lib/components/light-three-button/light.component';
import { LightTwoComponent } from '../../../../../ui/src/lib/components/light-two-button/light.component';
import { getMode } from '../../+state/blink-mode/blink-mode.selectors';
import { BlinkModeState } from '../../+state/blink-mode/blink-mode.reducer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-blink-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    BlinkNavPanelContainerComponent,
    LightThreeComponent,
    LightTwoComponent,
    RouterOutlet,
    AsyncPipe,
    BlinkAboutContainerComponent
  ],
  templateUrl: './blink-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlinkContainerComponent implements OnInit {

  mode$ = this.store$.select(getMode);

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
    private store$: Store<BlinkModeState>){
  }

  ngOnInit() {
    const deviceName: string = this.route.snapshot.paramMap.get('deviceName') ?? 'emptyDeviceName';
    this.store.dispatch(setDeviceName({deviceName}));
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'LightComponent:BUTTON_CLICKED') {
      this.store.dispatch(blinkSendMessage({message: {
        event: 'TO_DEVICE',
        data: {
          message: {
            event: 'LED',
            data: {
              command: $event.data,
            },
          },
        },
      }}));
    } 
  }
}


