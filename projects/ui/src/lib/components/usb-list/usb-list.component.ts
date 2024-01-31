import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IUsb} from '../../../../../app/src/lib/+state/usb/usb.reducer';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { DevicePageLayoutComponent } from '../../layouts/device-page-layout/device-page-layout.component';

@Component({
  selector: 'usb-list',
  standalone: true,
  templateUrl: './usb-list.component.html',
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    DevicePageLayoutComponent
  ],
  styleUrls: ['./usb-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsbListComponent {
  @Input() usbList: IUsb[] | null = [];
  @Output() emitter = new EventEmitter();

  displayedColumns: string[] = ['name', 'type', 'actions',];

  buttonClick(message: string, note: any = {}) {
    this.emitter.emit({
      event: 'UsbListContainerComponent:BUTTON_CLICKED',
      data: {message, note},
      
    });
  }

  // buttonClicked(user: IUser) {
  //   this.emitter.emit({
  //     event: 'UsbListContainerComponent:BUTTON_CLICKED',
  //     data: {user},
  //   });
  // }
}
