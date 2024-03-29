import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import {addLogListForTable} from '../../../../../app/src/lib/+state/messages/messages.selectors';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { MessagesState } from '../../../../../app/src/lib/+state/messages/messages.reducer';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';


@Component({
  selector: 'messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, DevicePageLayoutComponent],
  templateUrl: './messages-container.component.html',
  styleUrl: './messages-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesContainerComponent {
  logList$ = this.store$.select(addLogListForTable);

  constructor(private store$: Store<MessagesState>) {
  }
}
