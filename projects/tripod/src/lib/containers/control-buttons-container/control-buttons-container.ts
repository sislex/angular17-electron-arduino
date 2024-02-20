import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { sendMessageToDevice } from '../../+state/messages/messages.actions';
import { ConfigPartialState } from '../../+state/config/config.reducer';
import { ControlButtonsComponent } from '../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';

@Component({
  selector: 'control-buttons-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ControlButtonsComponent,
    NavPanelContainer,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './control-buttons-container.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlButtonsContainer {
  // getMode$: Observable<string | null> = this.store.select(getMode);
  // getLed$: Observable<string | null> = this.store.select(getLed);

  constructor(private readonly store: Store<ConfigPartialState>) {}

  events($event: any) {
    let data;
    if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED') {
      if ($event.data === 'RIGHT') {
        data = {
          steps1: 100,
        };
      } else if ($event.data === 'LEFT') {
        data = {
          steps1: -100,
        };
      } else if ($event.data === 'UP') {
        data = {
          steps2: 100,
        };
      } else if ($event.data === 'DOWN') {
        data = {
          steps2: -100,
        };
      }
      this.store.dispatch(sendMessageToDevice({
        message: {
          event: 'MOVE',
          data,
        },
      }));
    }
  }
}



