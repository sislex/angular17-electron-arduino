import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import {addLogFilterList, addLogList} from '../../../../../app/src/lib/+state/messages/messages.selectors';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { ILog, MessagesState } from '../../../../../app/src/lib/+state/messages/messages.reducer';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import {getDeviceName} from '../../+state/blink-config/blink-config.selectors';


@Component({
  selector: 'blink-messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, BlinkNavPanelContainerComponent, PageLayoutComponent],
  templateUrl: './blink-message-container.component.html',
  styleUrl: './blink-message-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkMessagesContainerComponent {
  logList$ = this.store$.select(addLogFilterList);
  getDeviceName$ = this.store$.select(getDeviceName);
  logListAll$ = this.store$.select(addLogList);
  logListBlink: any[] = [];

  constructor(private store$: Store<MessagesState>) {

    this.logListAll$.subscribe((logList) => {
      let deviceName = '';
      this.getDeviceName$.subscribe((item) => {
        deviceName = item;
      });
      this.logListBlink = logList.filter((item) => {
        return item.message?.data?.deviceName === deviceName;
      });
      console.log('logListBlink', this.logListBlink);
    });

  }
}
