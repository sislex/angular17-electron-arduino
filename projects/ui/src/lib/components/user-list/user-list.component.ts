import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IUser } from 'projects/web/src/lib/state/config/config.reducer';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: IUser[] | null = [];
  @Output() emitter = new EventEmitter();

  buttonClicked(user: IUser) {
    this.emitter.emit({
      event: 'UsbListComponent:BUTTON_CLICKED',
      data: {user},
    });
  }
}
