import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'account-menu',
  standalone: true,
  imports: [MatMenuModule, UserListComponent, MatIconModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountMenuComponent {
  @Output() emitter = new EventEmitter();

  buttonClicked(note: string) {
    this.emitter.emit({
      event: 'NavPanelComponent:BUTTON_CLICKED',
      data: note,
    });
  }
}
