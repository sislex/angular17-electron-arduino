import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {sendMessage} from '../../+state/messages/messages.actions';
import {AsyncPipe} from '@angular/common';
import {UsbListComponent} from '../../../../../ui/src/lib/components/usb-list/usb-list.component';
import {IUsb} from '../../+state/usb/usb.reducer';

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
    private cdr: ChangeDetectorRef,
  ) {
    this.getUsbList$.subscribe((usbList: IUsb[]) => {
      // Когда шлю данные в usbList, то они не отображаются в шаблоне, пока не вызову detectChanges()
      setTimeout(() => {this.cdr.detectChanges();}, 0);
    });
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'GET_USB_DEVICES') {
      this.store.dispatch(sendMessage({message: {event: 'GET_USB_DEVICES'}}));
    } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'CONNECT_USB_DEVICE') {
      console.log($event.data.note);
      this.store.dispatch(sendMessage({message: {event: 'CONNECT_USB_DEVICE', data: $event.data.note}}));
    }
  }
}
