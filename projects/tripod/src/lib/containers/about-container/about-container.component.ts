import {ChangeDetectionStrategy, Component} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from '../../../../../ui/src/lib/components/about/about.component';
import { Store } from '@ngrx/store';
import { getAboutList, getAboutTitle } from '../../+state/about/about.selectors';
import { AboutState} from '../../+state/about/about.reducer';
import { NavPanelContainer } from '../../skins/buttons/containers/nav-panel-container/nav-panel-container';
import { DevicePageLayoutComponent } from '../../../../../ui/src/lib/layouts/device-page-layout/device-page-layout.component';


@Component({
  selector: 'about-container',
  standalone: true,
  imports: [AsyncPipe, AboutComponent, NavPanelContainer, DevicePageLayoutComponent],
  templateUrl: './about-container.component.html',
  styleUrl: './about-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AboutContainer {

  abouts$ = this.store$.select(getAboutList);
  titles$ = this.store$.select(getAboutTitle);

  constructor(private store$: Store<AboutState>) {
  }
}
