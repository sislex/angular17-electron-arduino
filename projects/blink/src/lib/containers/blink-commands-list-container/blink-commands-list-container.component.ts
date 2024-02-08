import { Component } from '@angular/core';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { getBlinkCommandsList } from '../../+state/blink-commands-list/blink-commands-list.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { blinkSendMessage } from '../../+state/blink-config/blink-config.actions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'blink-commands-list-container',
  standalone: true,
  imports: [CommandsListComponent, DevicePageLayoutComponent, BlinkNavPanelContainerComponent, AsyncPipe],
  templateUrl: './blink-commands-list-container.component.html',
  styleUrl: './blink-commands-list-container.component.scss'
})
export class BlinkCommandsListContainer {

  commands$ = this.store$.select(getBlinkCommandsList);

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private readonly store: Store,
    ) {}

  buttonClick($event: any) {
    // console.log($event);
    this.store.dispatch(blinkSendMessage({message: {
      event: 'TO_DEVICE',
      data: {
        message: $event
      },
    }}));
  }
}
