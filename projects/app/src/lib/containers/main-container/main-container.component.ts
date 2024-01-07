import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PageLayoutComponent} from '../../../../../ui/src/lib/layouts/page-layout/page-layout.component';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {NavPanelContainerComponent} from '../nav-panel-container/nav-panel-container.component';
import {UsbListContainerComponent} from '../usb-list-container/usb-list-container.component';

@Component({
  imports: [PageLayoutComponent, NavPanelContainerComponent, UsbListContainerComponent],
  selector: 'main-container',
  standalone: true,
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  getUsbList$ = this.store.pipe(select(getUsbList));

  constructor(
    private readonly store: Store,
  ) {
  }
}
