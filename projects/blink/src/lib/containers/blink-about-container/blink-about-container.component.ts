import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from '../../../../../ui/src/lib/components/about/about.component';
import { Store } from '@ngrx/store';
import { getAboutList, getAboutTitle } from '../../+state/blink-about/blink-about.selectors';
import { blinkAboutState} from '../../+state/blink-about/blink-about.reducer';
import { BlinkNavPanelContainerComponent } from '../blink-nav-panel-container/blink-nav-panel-container.component';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';


@Component({
  selector: 'about-container',
  standalone: true,
  imports: [AsyncPipe, AboutComponent, BlinkNavPanelContainerComponent, DevicePageLayoutComponent],
  templateUrl: './blink-about-container.component.html',
  styleUrl: './blink-about-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkAboutContainerComponent {

  abouts$ = this.store$.select(getAboutList);
  titles$ = this.store$.select(getAboutTitle);

  constructor(private store$: Store<blinkAboutState>) {
  }
}