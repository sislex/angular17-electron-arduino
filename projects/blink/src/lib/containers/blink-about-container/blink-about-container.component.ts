import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from '../../../../../ui/src/lib/components/about/about.component';
import { Store } from '@ngrx/store';
import { getAboutList, getAboutTitle } from '../../+state/blink-about/blink-about.selectors';
import { blinkAboutState} from '../../+state/blink-about/blink-about.reducer';


@Component({
  selector: 'about-container',
  standalone: true,
  imports: [AsyncPipe, AboutComponent],
  templateUrl: './blink-about-container.component.html',
  styleUrl: './blink-about-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BlinkAboutContainerComponent {

  abouts$ = this.store$.select(getAboutList);
  titles$ = this.store$.select(getAboutTitle);

  constructor(private store$: Store<blinkAboutState>) {
  }

  // events($event: any) {
  //   if ($event.event === 'NavComponent:BUTTON_CLICKED'  && $event.data.message === 'aboutWidget'){
    // this.store.dispatch(setData({ titleAbout: 'widget', aboutList: [{name: 'GG', description: 'AA'}]})
  //   } else if ($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.message === 'aboutWidget'){
    // this.store.dispatch(setData({ titleAbout: 'widget', aboutList: [{name: 'GG', description: 'AA'}]})
  //   } else if($event.event === 'NavDeviceComponent:BUTTON_CLICKED' && $event.data.message === 'aboutDevice'){
  //     this.store.dispatch(sendMessage({message: {event: 'ABOUT_DEVICE'}}));
  // this.store.dispatch(setData({ titleAbout: 'device',  })
  //   }

  // этот кусок раскинуть в nav и nav-sevice Container

}