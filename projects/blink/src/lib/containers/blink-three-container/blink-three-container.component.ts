import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {BlinkNavPanelContainerComponent} from '../blink-nav-panel-container/blink-nav-panel-container.component';
import {Store} from '@ngrx/store';
import {blinkSendMessage} from '../../+state/blink-config/blink-config.actions';
import {RouterOutlet} from '@angular/router';
import { BlinkAboutContainerComponent } from '../blink-about-container/blink-about-container.component';
import { LightThreeComponent } from '../../../../../ui/src/lib/components/light-three-button/light-three-button.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'blink-three-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    BlinkNavPanelContainerComponent,
    LightThreeComponent,
    RouterOutlet,
    AsyncPipe,
    BlinkAboutContainerComponent,
  ],
  templateUrl: './blink-three-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkThreeContainerComponent {

  constructor(private readonly store: Store) {}

  events($event: any) {
    // console.log($event);
    if ($event.event === 'LightThreeComponent:BUTTON_CLICKED') {
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
