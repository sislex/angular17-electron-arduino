import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getUsbList} from '../../+state/usb/usb.selectors';
import {resetUserFromLocalStorageAndState} from '../../+state/account/account.actions';
import {NavPanelComponent} from '../../../../../ui/src/lib/components/nav-panel/nav-panel.component';

@Component({
  selector: 'nav-panel-container',
  imports: [NavPanelComponent, ],
  standalone: true,
  templateUrl: './nav-panel-container.component.html',
  styleUrls: ['./nav-panel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavPanelContainerComponent {
  constructor(
    private readonly store: Store,
  ) {
  }

  events($event: any) {
    // console.log($event);
    if ($event.event === 'NavPanelComponent:BUTTON_CLICKED' && $event.data === 'Sign out') {
      this.store.dispatch(resetUserFromLocalStorageAndState());
    }
  }
}
