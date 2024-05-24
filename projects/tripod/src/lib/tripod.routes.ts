import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AboutContainer } from './containers/about-container/about-container.component';
import { MessagesContainer } from './containers/message-container/message-container';
import { TRIPOD_ABOUT_FEATURE_KEY, AboutReducer } from './+state/about/about.reducer';
import { TRIPOD_COMMANDS_LIST_FEATURE_KEY, CommandsReducer } from './+state/commands-list/commands-list.reducer';
import { TRIPOD_SKIN_FEATURE_KEY, SkinReducer } from './+state/skin/skin.reducer';
import { CommandsListContainer } from './containers/commands-list-container/commands-list-container';
import { ControlContainer } from './containers/control-container/control-container';
import { TRIPOD_MESSAGES_FEATURE_KEY, MessagesReducer } from './+state/messages/messages.reducer';
import { MessagesEffects } from './+state/messages/messages.effects';
import { ConfigEffects } from './+state/config/config.effects';
import { TRIPOD_CONFIG_FEATURE_KEY, ConfigReducer } from './+state/config/config.reducer';
import { MoveViewSkinReducer, TRIPOD_VIEW_SKIN_FEATURE_KEY } from './+state/skins/move-skin/view/move-view-skin.reducer';
import { SetButtonEffects } from './+state/skins/move-skin/view/move-view-skin.effects';
import {VIEW_FEATURE_KEY, viewReducer} from "./+state/view/view.reducer";
import {TARGETS_FEATURE_KEY, targetsReducer} from "./+state/targets/targets.reducer";
import {ViewEffects} from "./+state/view/view.effects";
import {TargetsEffects} from "./+state/targets/targets.effects";

  export const tripodRoutes: Routes = [
    {
      path: '',
      providers: [
        provideState(TRIPOD_MESSAGES_FEATURE_KEY, MessagesReducer),
        provideState(TRIPOD_CONFIG_FEATURE_KEY, ConfigReducer),
        provideState(TRIPOD_ABOUT_FEATURE_KEY, AboutReducer),
        provideState(TRIPOD_COMMANDS_LIST_FEATURE_KEY, CommandsReducer),
        provideState(TRIPOD_SKIN_FEATURE_KEY, SkinReducer),
        provideState(TRIPOD_VIEW_SKIN_FEATURE_KEY, MoveViewSkinReducer),
        provideState(TRIPOD_VIEW_SKIN_FEATURE_KEY, MoveViewSkinReducer),
        provideState(VIEW_FEATURE_KEY, viewReducer),
        provideState(TARGETS_FEATURE_KEY, targetsReducer),
        provideEffects([
          MessagesEffects,
          SetButtonEffects,
          ConfigEffects,
          ViewEffects,
          TargetsEffects,
        ]),
      ],
      children: [
        {
          path: 'commandsList',
          component: CommandsListContainer,
        },
        {
          path: 'logDevice',
          component: MessagesContainer,
        },
        {
          path: '',
          component: ControlContainer,
        },
        {
          path: 'aboutDevWidget',
          component: AboutContainer,
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
    },
  ];
