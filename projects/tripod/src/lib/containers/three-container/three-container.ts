import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { LightThreeComponent } from '../../../../../ui/src/lib/components/light-three-button/light-three-button.component';
import { AsyncPipe } from '@angular/common';
import { sendMessageToDevice } from '../../+state/messages/messages.actions';
import { ConfigPartialState } from '../../+state/config/config.reducer';
import { Observable } from 'rxjs';
import { getLed, getMode } from '../../+state/config/config.selectors';


@Component({
  selector: 'three-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    NavPanelContainer,
    LightThreeComponent,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './three-container.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ThreeContainer {
  getMode$: Observable<string | null> = this.store.select(getMode);
  getLed$: Observable<string | null> = this.store.select(getLed);

  constructor(private readonly store: Store<ConfigPartialState>) {}


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
