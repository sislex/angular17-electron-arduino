import {ChangeDetectionStrategy, Component, Output, EventEmitter} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {resetUserFromLocalStorageAndState} from '../../+state/account/account.actions';
import {NavComponent} from '../../../../../ui/src/lib/components/nav/nav.component';
import {Router} from '@angular/router';
// import { setData } from '../../+state/about/about.actions';

@Component({
  selector: 'nav-panel-container',
  imports: [NavComponent],
  standalone: true,
  templateUrl: './nav-panel-container.component.html',
  styleUrls: ['./nav-panel-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavPanelContainerComponent {
  @Output() emitter = new EventEmitter();

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
    } else  if ($event.event === 'NavComponent:BUTTON_CLICKED' && $event.data === 'commands-list') {
      this.router.navigate(['/commands-list']);
    } else  if ($event.event === 'NavComponent:BUTTON_CLICKED' && $event.data === 'aboutWidget') {
      this.router.navigate(['/about']);
      // this.store.dispatch(setData({ 
      //   titleAbout: 'widget', 
      //   aboutList: [
      //     {name: 'Name', description: 'Main page'},
      //     {name: 'Description', description: 'Contains the main application control panels'},
      //     {name: 'Date of create', description: '23.01.2024'},
      //     {name: 'Version', description: '1.0.0'}
      //   ]
      // }));
    }
  }
}
