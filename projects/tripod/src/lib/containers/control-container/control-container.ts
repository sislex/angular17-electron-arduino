import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../../../../ui/src/public-api';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { getSkin } from '../../+state/skin/skin.selectors';
import { AsyncPipe } from '@angular/common';
import { init } from '../../+state/config/config.actions';
import { ControlButtonsContainer } from '../control-buttons-container/control-buttons-container';
import { ControlVideoContainer } from '../control-video-container/control-video-container';

@Component({
  selector: 'control-container',
  standalone: true,
  imports: [
    PageLayoutComponent,
    RouterOutlet,
    AsyncPipe,
    ControlButtonsContainer,
    ControlVideoContainer,
  ],
  templateUrl: './control-container.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlContainer implements OnInit {

  skin$ = this.store.select(getSkin);

  constructor(private readonly store: Store){}

  ngOnInit() {
    this.store.dispatch(init());
  }
}
