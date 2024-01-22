import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface ICommand {
  num: number;
  name: string;
  event: string;
  prop: string;
}

@Component({
  selector: 'commands-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './commands-list.component.html',
  styleUrl: './commands-list.component.scss'
})
export class CommandsListComponent {
  @Input() commandsList: ICommand[]=[];
  prop: string = '';

  @Output() emitter = new EventEmitter() 

  displayedColumns: string[] = ['num', 'name', 'event', 'prop', 'but'];

  openDialog(data: string) {
    const message = {
      event: 'CommandListComponent:UseCommand', 
      data
    };
    this.emitter.emit(message);
  }
}
