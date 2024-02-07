import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommandsListComponent } from '../../../../../ui/src/lib/components/commands-list/commands-list.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';
import { getCommandsList } from '../../+state/commands-list/commands-list.selectors';
import { Store } from '@ngrx/store';
import { CommandsListState } from '../../+state/commands-list/commands-list.reducer';
import { ActivatedRoute } from '@angular/router';
import { sendMessage } from '../../+state/messages/messages.actions';


@Component({
  selector: 'commands-list-container',
  standalone: true,
  imports: [AsyncPipe, CommandsListComponent, DevicePageLayoutComponent],
  templateUrl: './commands-list-container.component.html',
  styleUrl: './commands-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CommandsListContainerComponent {
  commands$ = this.store$.select(getCommandsList);
  
  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private readonly store: Store,
    ) {}


  // events($event: any) {
  //   // console.log($event);
  //   if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'CONNECT_USB_DEVICE') {
  //     const now = new Date();
  //     const timestamp = now.getTime();
  //     const name =  $event.data.note.item.name;
  //     this.store.dispatch(sendMessage({message: {event: 'CONNECT_USB_DEVICE', data: {name, timestamp}}}));
  //   } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'DISCONNECT_USB_DEVICE') {
  //     const now = new Date();
  //     const timestamp = now.getTime();
  //     const name =  $event.data.note.item.name;
  //     this.store.dispatch(sendMessage({message: {event: 'DISCONNECT_USB_DEVICE', data: {name, timestamp}}}));
  //   } else if ($event.event === 'UsbListContainerComponent:BUTTON_CLICKED' && $event.data.message === 'CONTROL') {
  //     this.router.navigate(['control', 'blink', $event.data.note.item.name]);
  //     setTimeout(() => { // lazy load
  //       this.store.dispatch(setSelectedUsb({selectedUsb: $event.data.note.item.name}));
  //     }, 100);
  //   }


  
  buttonClick($event: any) {
    // console.log($event);
    this.store.dispatch(sendMessage({
      message: $event
    }));
  }
}
