import { Component } from '@angular/core';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { getCommandsList } from '../../+state/commands-list/commands-list.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {sendMessageToDevice} from '../../+state/messages/messages.actions';
import { NavPanelContainer } from '../nav-panel-container/nav-panel-container';


@Component({
  selector: 'commands-list-container',
  standalone: true,
  imports: [CommandsListComponent, DevicePageLayoutComponent, NavPanelContainer, AsyncPipe],
  templateUrl: './commands-list-container.html',
  styleUrl: './commands-list-container.scss'
})
export class CommandsListContainer {

  commands$ = this.store$.select(getCommandsList);

  constructor(
    private store$: Store,
    private readonly store: Store,
    ) {}

    events($event: any) {
      // console.log($event);
      if ($event.event === 'CommandsListComponent:buttonClick') {
        this.store.dispatch(sendMessageToDevice({ message: $event.data }));
      }
  }
}
