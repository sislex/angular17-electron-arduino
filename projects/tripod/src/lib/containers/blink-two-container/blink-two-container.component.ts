import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {BlinkNavPanelContainerComponent} from '../blink-nav-panel-container/blink-nav-panel-container.component';
import {Store} from '@ngrx/store';
import {RouterOutlet} from '@angular/router';
import { BlinkAboutContainerComponent } from '../tripod-about-container/tripod-about-container.component';
import { LightTwoComponent } from '../../../../../ui/src/lib/components/light-two-button/light-two-button.component';
import { AsyncPipe } from '@angular/common';
import {sendMessageToDevice} from '../../+state/blink-messages/blink-messages.actions';
import {getLed, getMode} from '../../+state/blink-config/blink-config.selectors';
import {BlinkConfigPartialState} from '../../+state/blink-config/blink-config.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'blink-two-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    BlinkNavPanelContainerComponent,
    LightTwoComponent,
    RouterOutlet,
    AsyncPipe,
    BlinkAboutContainerComponent
  ],
  templateUrl: './blink-two-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlinkTwoContainerComponent {
  getMode$: Observable<string | null> = this.store.select(getMode);
  getLed$: Observable<string | null> = this.store.select(getLed);

  constructor(private readonly store: Store<BlinkConfigPartialState>) {}

  events($event: any) {
    // console.log($event);
    if ($event.event === 'LightTwoComponent:BUTTON_CLICKED') {
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


