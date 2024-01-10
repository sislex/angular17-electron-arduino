import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface ILog {
  num: number;
  direction: string;
  log: string;
  date: string;
}

@Component({
  selector: 'logs',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})

export class LogsComponent {
  @Input() stateLog: ILog[]=[];

  displayedColumns: string[] = ['number', 'direction', 'event', 'date'];
}
