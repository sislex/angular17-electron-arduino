import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { addLogListForTable} from '../../+state/blink-messages/blink-messages.selectors';
import { IBlinkMessagesState } from '../../+state/blink-messages/blink-messages.reducer';


@Component({
  selector: 'blink-messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, BlinkNavPanelContainerComponent, DevicePageLayoutComponent],
  templateUrl: './blink-message-container.component.html',
  styleUrl: './blink-message-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkMessagesContainerComponent {
  logListBlink$ = this.store$.select(addLogListForTable);

  constructor(private store$: Store<IBlinkMessagesState>) {
  }
}


