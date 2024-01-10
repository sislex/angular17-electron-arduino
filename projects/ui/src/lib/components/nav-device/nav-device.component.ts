import {Component, Output, Input, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'nav-device',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    UserListComponent],
  templateUrl: './nav-device.component.html',
  styleUrl: './nav-device.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavDeviceComponent {
  @Input() message: string = '';

  @Output() emitter = new EventEmitter();

  buttonClick (data: string) {
    this.emitter.emit({
      event: 'NavPanelComponent:BUTTON_CLICKED',
      data,
    });
  }

}
