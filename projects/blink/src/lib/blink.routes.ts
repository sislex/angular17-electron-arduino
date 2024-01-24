import {Routes} from '@angular/router';
import {BlinkContainerComponent} from './containers/blink-container/blink-container.component';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {BLINK_CONFIG_FEATURE_KEY, blinkConfigReducer} from './+state/blink-config/blink-config.reducer';
import {BlinkConfigEffects} from './+state/blink-config/blink-config.effects';
import { BLINK_ABOUT_FEATURE_KEY, blinkAboutReducer } from './+state/blink-about/blink-about.reducer';

export const blinkRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(BLINK_CONFIG_FEATURE_KEY, blinkConfigReducer),
      provideState(BLINK_ABOUT_FEATURE_KEY, blinkAboutReducer),
      provideEffects([
        BlinkConfigEffects,
      ]),
    ],
    component: BlinkContainerComponent,
  },
  // {
  //   path: '',
  //   providers: [
  //     provideState(BLINK_CONFIG_FEATURE_KEY, blinkConfigReducer),
  //     provideState(BLINK_ABOUT_FEATURE_KEY, blinkAboutReducer),
  //     provideEffects([
  //       BlinkConfigEffects,
  //     ]),
  //   ],
  //   component: BlinkContainerComponent,
  // },
];
