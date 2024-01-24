import {Routes} from '@angular/router';
import {BlinkContainerComponent} from './containers/blink-container/blink-container.component';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {BLINK_CONFIG_FEATURE_KEY, blinkConfigReducer} from './+state/blink-config/blink-config.reducer';
import {BlinkConfigEffects} from './+state/blink-config/blink-config.effects';

export const blinkRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(BLINK_CONFIG_FEATURE_KEY, blinkConfigReducer),
      provideEffects([
        BlinkConfigEffects,
      ]),
    ],
    children: [
      {
        path: '',
        component: BlinkContainerComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
