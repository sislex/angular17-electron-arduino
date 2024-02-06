import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, DatePipe, MatCardModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesComponent {
  @Input() stateLog: any[] | null = [] ;

  displayedColumns: string[] = ['direction', 'event', 'date'];
}
