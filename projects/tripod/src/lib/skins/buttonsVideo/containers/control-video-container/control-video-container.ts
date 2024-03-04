import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { sendMessageToDevice } from '../../../../+state/messages/messages.actions';
import { ConfigPartialState } from '../../../../+state/config/config.reducer';
import { ControlButtonsComponent } from '../../../../../../../ui/src/lib/components/control-buttons/control-buttons.component';
import { NavPanelContainer } from '../../../../containers/nav-panel-container/nav-panel-container';

@Component({
  selector: 'control-video-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ControlButtonsComponent,
    NavPanelContainer,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './control-video-container.html',
  styleUrl: './control-video-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlVideoContainer {

  constructor(private readonly store: Store<ConfigPartialState>) {}

  events($event: any) {
    // console.log($event);
    if ($event.event === 'ControlButtonsComponent:BUTTON_CLICKED') {
      this.store.dispatch(sendMessageToDevice({
        message: {
          event: 'MOVE',
          data: {
            command: $event.data,
          },
        },
      }));
    }
  }
}


