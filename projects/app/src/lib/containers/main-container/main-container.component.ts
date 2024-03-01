import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {PageLayoutComponent} from '../../../../../ui/src/lib/layouts/page-layout/page-layout.component';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {NavPanelContainerComponent} from '../nav-panel-container/nav-panel-container.component';
import {RouterOutlet} from '@angular/router';
import { BlinkSkinState } from '../../../../../blink/src/lib/+state/blink-skin/blink-skin.reducer';
import { AsyncPipe } from '@angular/common';
import { getSkin } from '../../../../../blink/src/lib/+state/blink-skin/blink-skin.selectors';
import {H100LayoutComponent} from '../../../../../ui/src/lib/layouts/h100-layout/h100-layout.component';

@Component({
  imports: [PageLayoutComponent, NavPanelContainerComponent, RouterOutlet, AsyncPipe, H100LayoutComponent],
  selector: 'main-container',
  standalone: true,
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  getUsbList$ = this.store.pipe(select(getUsbList));

  skin$ = this.store$.select(getSkin);

  constructor(
    private readonly store: Store,
    private store$: Store<BlinkSkinState>,
  ) {}
}
