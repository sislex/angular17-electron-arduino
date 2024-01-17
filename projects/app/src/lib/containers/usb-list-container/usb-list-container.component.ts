import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {sendMessage} from '../../+state/messages/messages.actions';
import {AsyncPipe} from '@angular/common';
import {UsbListComponent} from '../../../../../ui/src/lib/components/usb-list/usb-list.component';
import {Router} from '@angular/router';
import {setSelectedUsb} from '../../+state/usb/usb.actions';

@Component({
  selector: 'usb-list-container',
  standalone: true,
  templateUrl: './usb-list-container.component.html',
  styleUrls: ['./usb-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    UsbListComponent
  ]
})
export class UsbListContainerComponent {
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
    private router: Router,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'GET_USB_DEVICES') {
      this.store.dispatch(sendMessage({message: {event: 'GET_USB_DEVICES'}}));
    } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'CONNECT_USB_DEVICE') {
      const now = new Date();
      const timestamp = now.getTime();
      const name =  $event.data.note.item.name;
      this.store.dispatch(sendMessage({message: {event: 'CONNECT_USB_DEVICE', data: {name, timestamp}}}));
    } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'DISCONNECT_USB_DEVICE') {
      const now = new Date();
      const timestamp = now.getTime();
      const name =  $event.data.note.item.name;
      this.store.dispatch(sendMessage({message: {event: 'DISCONNECT_USB_DEVICE', data: {name, timestamp}}}));
    } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'CONTROL') {
      this.router.navigate(['control', 'blink', $event.data.note.item.name]);
      setTimeout(() => { // lazy load
        this.store.dispatch(setSelectedUsb({selectedUsb: $event.data.note.item.name}));
      }, 100);
    }
  }
}
