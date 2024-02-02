import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ICommands } from '../../../../../app/src/lib/+state/commands-list/commands-list.reducer';

@Component({
  selector: 'commands-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './commands-list.component.html',
  styleUrl: './commands-list.component.scss'
})
export class CommandsListComponent {
  @Input() commandsList: ICommands[]| null = [];
  @Output() emitter = new EventEmitter() 

  displayedColumns: string[] = ['number', 'name', 'event', 'button'];

  openDialog(data: string) {
    const message = {
      event: 'CommandListComponent:UseCommand', 
      data
    };
    this.emitter.emit(message);
  }
}
