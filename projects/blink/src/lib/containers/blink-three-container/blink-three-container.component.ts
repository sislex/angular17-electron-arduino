import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {BlinkNavPanelContainerComponent} from '../blink-nav-panel-container/blink-nav-panel-container.component';
import {Store} from '@ngrx/store';
import {RouterOutlet} from '@angular/router';
import { BlinkAboutContainerComponent } from '../blink-about-container/blink-about-container.component';
import { LightThreeComponent } from '../../../../../ui/src/lib/components/light-three-button/light-three-button.component';
import { AsyncPipe } from '@angular/common';
import {sendMessageToDevice} from '../../+state/blink-messages/blink-messages.actions';
import { BlinkConfigPartialState } from '../../+state/blink-config/blink-config.reducer';
import { Observable } from 'rxjs';
import {getLed, getMode} from '../../+state/blink-config/blink-config.selectors';


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
  getMode$: Observable<string | null> = this.store.select(getMode);
  getLed$: Observable<string | null> = this.store.select(getLed);

  constructor(private readonly store: Store<BlinkConfigPartialState>) {}


  events($event: any) {
    // console.log($event);
    if ($event.event === 'LightThreeComponent:BUTTON_CLICKED') {
      this.store.dispatch(sendMessageToDevice({
        message: {
          event: 'LED',
          data: {
            command: $event.data,
          },
        },
      }));
    }
  }
}
