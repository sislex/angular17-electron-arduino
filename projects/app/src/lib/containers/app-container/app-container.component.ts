import {ChangeDetectorRef, Component} from '@angular/core';
import { H100LayoutComponent } from '../../../../../ui/src/public-api';
import {select, Store} from '@ngrx/store';
import {IUsb} from '../../+state/usb/usb.reducer';
import {isUserLogin} from '../../+state/account/account.selectors';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {getUserFromLocalStorage} from '../../+state/account/account.actions';
import {sendMessage} from '../../+state/messages/messages.actions';
import {AsyncPipe} from '@angular/common';
import {AuthContainerComponent} from '../auth-container/auth-container.component';
import {MainContainerComponent} from '../main-container/main-container.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [H100LayoutComponent, AsyncPipe, AuthContainerComponent, MainContainerComponent],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {

  isUserLogin$ = this.store.pipe(select(isUserLogin));
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.getUsbList$.subscribe((usbList: IUsb[]) => {
      // Когда шлю данные в usbList, то они не отображаются в шаблоне, пока не вызову detectChanges()
      setTimeout(() => {this.cdr.detectChanges();}, 0);
    });


    setTimeout(() => {
      this.store.dispatch(getUserFromLocalStorage());
      this.store.dispatch(sendMessage({message: {event: 'GET_USB_DEVICES'}}));
    }, 0);

  }

}
