import {ChangeDetectionStrategy, Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { addLogList } from '../../../../../app/src/lib/+state/messages/messages.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MessagesComponent } from '../../../../../ui/src/lib/components/messages/messages.component';
import { ILog, MessagesState } from '../../../../../app/src/lib/+state/messages/messages.reducer';


@Component({
  selector: 'messages-container',
  standalone: true,
  imports: [AsyncPipe, MessagesComponent],
  templateUrl: './messages-container.component.html',
  styleUrl: './messages-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MessagesContainerComponent {

  // logList$: Observable<ILog[]>;

  // constructor(private store$: Store<MessagesState>) {
  //     this.logList$ = this.store$.select(addLogList);
  //   }
  logList$ = this.store$.select(addLogList);

  constructor(private store$: Store<MessagesState>) {
  }
}