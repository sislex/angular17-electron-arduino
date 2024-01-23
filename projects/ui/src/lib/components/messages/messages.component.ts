import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, DatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesComponent {
  @Input() stateLog: any[] | null = [] ;

  displayedColumns: string[] = ['direction', 'event', 'date'];
}
