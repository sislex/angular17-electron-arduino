import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface ICommand {
  num: number;
  name: string;
  event: string;
  prop: string;
}

@Component({
  selector: 'app-commands-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './commands-list.component.html',
  styleUrl: './commands-list.component.scss'
})
export class CommandsListComponent {
  @Input() commandsList: ICommand[]=[];

  @Output() emitter = new EventEmitter()

  ButtonClick(data: string) {
    const message = {
      event: 'ControlButtonsComponent:buttonClick', 
      data,
    };
    this.emitter.emit(message);
  }

  displayedColumns: string[] = ['num', 'name', 'event', 'prop', 'but'];
}
