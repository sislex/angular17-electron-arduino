import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IUser } from '../../../../../app/src/lib/+state/config/config.reducer';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: IUser[] | null = [];
  @Output() emitter = new EventEmitter();

  buttonClicked(user: IUser) {
    this.emitter.emit({
      event: 'UsbListContainerComponent:BUTTON_CLICKED',
      data: {user},
    });
  }
}
