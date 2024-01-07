import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IUsb } from 'projects/web/src/lib/state/usb/usb.reducer';

@Component({
  selector: 'usb-list',
  templateUrl: './usb-list.component.html',
  styleUrls: ['./usb-list.component.scss']
})
export class UsbListComponent {
  @Input() usbList: IUsb[] | null = [];
  @Output() emitter = new EventEmitter();

  displayedColumns: string[] = ['name', 'actions', 'status'];

  buttonClick(message: string, note: any = {}) {
    this.emitter.emit({
      event: 'UsbListComponent:BUTTON_CLICKED',
      data: {message, note},
    });
  }

  // buttonClicked(user: IUser) {
  //   this.emitter.emit({
  //     event: 'UsbListComponent:BUTTON_CLICKED',
  //     data: {user},
  //   });
  // }
}
