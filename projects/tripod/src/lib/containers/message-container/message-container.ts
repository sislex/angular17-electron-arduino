import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { addLogListForTable} from '../../+state/messages/messages.selectors';
import { IMessagesState } from '../../+state/messages/messages.reducer';


@Component({
  selector: 'messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, NavPanelContainer, DevicePageLayoutComponent],
  templateUrl: './message-container.html',
  styleUrl: './message-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesContainer {
  logListBlink$ = this.store$.select(addLogListForTable);

  constructor(private store$: Store<IMessagesState>) {
  }
}


