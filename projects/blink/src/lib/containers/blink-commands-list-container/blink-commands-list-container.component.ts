import { Component } from '@angular/core';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { getBlinkCommandsList } from '../../+state/blink-commands-list/blink-commands-list.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {sendMessageToDevice} from '../../+state/blink-messages/blink-messages.actions';


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
    private readonly store: Store,
    ) {}

    events($event: any) {
      console.log($event);
      if ($event.event === 'CommandsListComponent:buttonClick') {
      this.store.dispatch(sendMessageToDevice({ message: $event.data }));
      }
  }
}
