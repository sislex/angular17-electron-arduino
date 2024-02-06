import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { getCommandsList } from '../../+state/commands-list/commands-list.selectors';
import { Store } from '@ngrx/store';
import { CommandsListState } from '../../+state/commands-list/commands-list.reducer';


@Component({
  selector: 'commands-list-container',
  standalone: true,
  imports: [AsyncPipe, CommandsListComponent, DevicePageLayoutComponent],
  templateUrl: './commands-list-container.component.html',
  styleUrl: './commands-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CommandsListContainerComponent {
  commands$ = this.store$.select(getCommandsList);
  
  constructor(private store$: Store<CommandsListState>) {
  }
}
