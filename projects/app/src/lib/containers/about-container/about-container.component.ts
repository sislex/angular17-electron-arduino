import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from '../../../../../ui/src/lib/components/about/about.component';
import { Store } from '@ngrx/store';
import { getAboutList, getAboutTitle } from '../../+state/about/about.selectors';
import { AboutState} from '../../+state/about/about.reducer';


@Component({
  selector: 'about-container',
  standalone: true,
  imports: [AsyncPipe, AboutComponent],
  templateUrl: './about-container.component.html',
  styleUrl: './about-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AboutContainerComponent {

  abouts$ = this.store$.select(getAboutList);
  titles$ = this.store$.select(getAboutTitle);

  constructor(private store$: Store<AboutState>) {
  }
}