import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { addLogList} from '../../../../../app/src/lib/+state/messages/messages.selectors';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { MessagesState } from '../../../../../app/src/lib/+state/messages/messages.reducer';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import {getDeviceName} from '../../+state/blink-messages/blink-messages.selectors';


@Component({
  selector: 'blink-messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent, BlinkNavPanelContainerComponent, DevicePageLayoutComponent],
  templateUrl: './blink-message-container.component.html',
  styleUrl: './blink-message-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkMessagesContainerComponent {
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
        return item.message?.data?.deviceName === deviceName || item.message?.data?.name === deviceName;
      }).map(item => {
        return {...item, message: JSON.stringify(item.message)};
      });
      console.log('logListBlink', this.logListBlink);
    });
  }
}


