import { Component } from '@angular/core';
import {NavDeviceComponent} from '../../../../../ui/src/lib/components/nav-device/nav-device.component';
import {resetUserFromLocalStorageAndState} from '../../../../../app/src/lib/+state/account/account.actions';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import { setMode } from '../../+state/blink-mode/blink-mode.actions';
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
  ) {}

  events($event: any) {
    console.log($event);
    if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'control') {
      this.store.dispatch(resetUserFromLocalStorageAndState()); // DELETE?
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'cable') {
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'aboutDWidget') {
      this.router.navigate(['widget/blink/aboutDevWidget']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'controlDevice') {
      this.router.navigate(['widget/blink/']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'logDevice') {
      this.router.navigate(['widget/blink/logDevice']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'commandsList') {
      this.router.navigate(['widget/blink/commandsList']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'two') {
      this.store.dispatch(setMode({mode: 'two'}));
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data === 'three') {
      this.store.dispatch(setMode({mode: 'three'}));
    } 
  } 
}
