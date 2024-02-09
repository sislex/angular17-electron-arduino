import {Routes} from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import { BlinkAboutContainerComponent } from './containers/blink-about-container/blink-about-container.component';
import { BlinkMessagesContainerComponent } from './containers/blink-message-container/blink-message-container.component';
import { BLINK_ABOUT_FEATURE_KEY, blinkAboutReducer } from './+state/blink-about/blink-about.reducer';
import { BLINK_COMMANDS_LIST_FEATURE_KEY, blinkCommandsReducer } from './+state/blink-commands-list/blink-commands-list.reducer';
import { BLINK_MODE_FEATURE_KEY, blinkModeReducer } from './+state/blink-mode/blink-mode.reducer';
import { BlinkCommandsListContainer } from './containers/blink-commands-list-container/blink-commands-list-container.component';
import { BlinkContainerComponent } from './containers/blink-container/blink-container.component';
import {BLINK_MESSAGES_FEATURE_KEY, blinkMessagesReducer} from './+state/blink-messages/blink-messages.reducer';
import {BlinkMessagesEffects} from './+state/blink-messages/blink-messages.effects';

  export const blinkRoutes: Routes = [
    {
      path: '',
      providers: [
        provideState(BLINK_MESSAGES_FEATURE_KEY, blinkMessagesReducer),
        provideState(BLINK_ABOUT_FEATURE_KEY, blinkAboutReducer),
        provideState(BLINK_COMMANDS_LIST_FEATURE_KEY, blinkCommandsReducer),
        provideState(BLINK_MODE_FEATURE_KEY, blinkModeReducer),
        provideEffects([
          BlinkMessagesEffects,
        ]),
      ],
      children: [
        {
          path: 'commandsList',
          component: BlinkCommandsListContainer,
        },
        {
          path: 'logDevice',
          component: BlinkMessagesContainerComponent,
        },
        {
          path: '',
          component: BlinkContainerComponent,
        },
        {
          path: 'aboutDevWidget',
          component: BlinkAboutContainerComponent,
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
    },
  ];
