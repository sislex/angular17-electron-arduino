import {ChangeDetectionStrategy, Component} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';


@Component({
  selector: 'commands-list-container',
  standalone: true,
  imports: [AsyncPipe, CommandsListComponent],
  templateUrl: './commands-list-container.component.html',
  styleUrl: './commands-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CommandsListContainerComponent {
}