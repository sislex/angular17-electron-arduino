import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUserList} from '../../+state/config/config.selectors';
import {setAndSaveUser} from '../../+state/account/account.actions';
import {AsyncPipe} from '@angular/common';
import {UserListComponent} from '../../../../../ui/src/lib/components/user-list/user-list.component';

@Component({
  selector: 'auth-container',
  standalone: true,
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    UserListComponent,
  ]
})
export class AuthContainerComponent {
  getUserList$ = this.store.pipe(select(getUserList));

  constructor(
    private readonly store: Store,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'UsbListComponent:BUTTON_CLICKED') {
      this.store.dispatch(setAndSaveUser({user: $event.data.user}));
    }
  }
}
