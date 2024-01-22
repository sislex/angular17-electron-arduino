import { Component } from '@angular/core';
import {NavDeviceComponent} from '../../../../../ui/src/lib/components/nav-device/nav-device.component';
import {resetUserFromLocalStorageAndState} from '../../../../../app/src/lib/+state/account/account.actions';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'blink-nav-panel-container',
  standalone: true,
  imports: [NavDeviceComponent],
  templateUrl: './blink-nav-panel-container.component.html',
  styleUrl: './blink-nav-panel-container.component.scss'
})
export class BlinkNavPanelContainerComponent {

  constructor(
    private readonly store: Store,
    private router: Router,
  ) {
  }

  events($event: any) {
    console.log($event);
    if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'control') {
      this.store.dispatch(resetUserFromLocalStorageAndState());
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'cable') {

    }
  }
}