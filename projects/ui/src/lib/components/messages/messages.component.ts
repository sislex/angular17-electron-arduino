import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ILog } from '../../../../../app/src/lib/+state/messages/messages.reducer';
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
