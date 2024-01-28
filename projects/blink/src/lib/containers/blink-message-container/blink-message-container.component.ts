import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { addLogFilterList } from '../../../../../app/src/lib/+state/messages/messages.selectors';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { ILog, MessagesState } from '../../../../../app/src/lib/+state/messages/messages.reducer';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';


@Component({
  selector: 'blink-messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, BlinkNavPanelContainerComponent, PageLayoutComponent],
  templateUrl: './blink-message-container.component.html',
  styleUrl: './blink-message-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesContainerComponent {
  logList$ = this.store$.select(addLogFilterList);

  constructor(private store$: Store<MessagesState>) {
  }
}