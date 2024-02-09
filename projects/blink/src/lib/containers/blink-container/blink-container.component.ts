import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {RouterOutlet} from '@angular/router';
import { getMode } from '../../+state/blink-mode/blink-mode.selectors';
import { BlinkModeState } from '../../+state/blink-mode/blink-mode.reducer';
import { AsyncPipe } from '@angular/common';
import { BlinkTwoContainerComponent } from '../blink-two-container/blink-two-container.component';
import { BlinkThreeContainerComponent } from '../blink-three-container/blink-three-container.component';
import {setDeviceName} from '../../+state/blink-messages/blink-messages.actions';

@Component({
  selector: 'lib-blink-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    RouterOutlet,
    AsyncPipe,
    BlinkTwoContainerComponent,
    BlinkThreeContainerComponent,
  ],
  templateUrl: './blink-container.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlinkContainerComponent implements OnInit {

  mode$ = this.store$.select(getMode);

  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
    private store$: Store<BlinkModeState>,
    ){}

  ngOnInit() {
    const deviceName: string = this.route.snapshot.paramMap.get('deviceName') ?? 'emptyDeviceName';
    this.store.dispatch(setDeviceName({deviceName}));
  }
}
