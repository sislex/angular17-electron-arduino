import { Component } from '@angular/core';
import { NavDeviceComponent } from '../../../../../../../ui/src/lib/components/nav-device/nav-device.component';
import { resetUserFromLocalStorageAndState } from '../../../../../../../app/src/lib/+state/account/account.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setSkin } from '../../../../+state/skin/skin.actions';
import {getSkinsList} from '../../../../+state/skin/skin.selectors';
import {AsyncPipe} from '@angular/common';
@Component({
  selector: 'nav-panel-container',
  standalone: true,
  imports: [NavDeviceComponent, AsyncPipe],
  templateUrl: './nav-panel-container.html',
  styleUrl: './nav-panel-container.scss'
})
export class NavPanelContainer {
  getSkinsList$ = this.store.select(getSkinsList);

  constructor(
    private readonly store: Store,
    private router: Router,
  ) {}

  events($event: any) {
    // console.log($event);
    if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'control') {
      this.store.dispatch(resetUserFromLocalStorageAndState()); // DELETE?
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'cable') {
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'aboutDWidget') {
      this.router.navigate(['widget/tripod/aboutDevWidget']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'controlDevice') {
      this.router.navigate(['widget/tripod/']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'logDevice') {
      this.router.navigate(['widget/tripod/logDevice']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.item === 'commandsList') {
      this.router.navigate(['widget/tripod/commandsList']);
    } else  if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.note === 'skinsList') {
      this.store.dispatch(setSkin({skin: $event.data.item}));
    }
  }

  protected readonly getSkinsList = getSkinsList;
}
