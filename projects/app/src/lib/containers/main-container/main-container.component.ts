import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PageLayoutComponent} from '../../../../../ui/src/lib/layouts/page-layout/page-layout.component';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {NavPanelContainerComponent} from '../nav-panel-container/nav-panel-container.component';
import {RouterOutlet} from '@angular/router';

@Component({
  imports: [PageLayoutComponent, NavPanelContainerComponent, RouterOutlet],
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
