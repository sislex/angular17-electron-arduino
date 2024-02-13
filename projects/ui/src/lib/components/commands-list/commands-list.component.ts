import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ICommands } from '../../../../../app/src/lib/+state/commands-list/commands-list.reducer';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'commands-list',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './commands-list.component.html',
  styleUrl: './commands-list.component.scss'
})
export class CommandsListComponent {
  @Input() commandsList: ICommands[]| null = [];
  @Output() emitter = new EventEmitter() 

  displayedColumns: string[] = ['number', 'name', 'event', 'button'];

  buttonClick(data: any) {
    const message = {
      event: 'CommandsListComponent:buttonClick',
      data,
    };
    this.emitter.emit(message);
  }
}