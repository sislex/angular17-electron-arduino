import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {resetUserFromLocalStorageAndState} from '../../+state/account/account.actions';
import {NavComponent} from '../../../../../ui/src/lib/components/nav/nav.component';
import {Router} from '@angular/router';

@Component({
  selector: 'nav-panel-container',
  imports: [NavComponent],
  standalone: true,
  templateUrl: './nav-panel-container.component.html',
  styleUrls: ['./nav-panel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavPanelContainerComponent {
  constructor(
    private readonly store: Store,
    private router: Router,
  ) {
  }

  events($event: any) {
    console.log($event);
    if ($event.event === 'NavPanelComponent:BUTTON_CLICKED' && $event.data === 'Sign out') {
      this.store.dispatch(resetUserFromLocalStorageAndState());
    } else  if ($event.event === 'NavComponent:BUTTON_CLICKED' && $event.data === 'cable') {
      this.router.navigate(['/usb-list']);
    } else  if ($event.event === 'NavComponent:BUTTON_CLICKED' && $event.data === 'logs') {
      this.router.navigate(['/logs']);
    }
  }
}
