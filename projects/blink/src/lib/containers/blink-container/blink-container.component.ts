import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PageLayoutComponent} from '../../../../../ui/src/public-api';
import {Store} from '@ngrx/store';
import {RouterOutlet} from '@angular/router';
import { getSkin } from '../../+state/blink-skin/blink-skin.selectors';
import { AsyncPipe } from '@angular/common';
import { BlinkTwoContainerComponent } from '../blink-two-container/blink-two-container.component';
import { BlinkThreeContainerComponent } from '../blink-three-container/blink-three-container.component';
import {init} from '../../+state/blink-config/blink-config.actions';

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

  skin$ = this.store.select(getSkin);

  constructor(private readonly store: Store){}

  ngOnInit() {
    this.store.dispatch(init());
  }
}
