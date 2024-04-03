import { ApplicationConfig } from '@angular/core';

import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {IpcService} from './services/ipc.service';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {CONFIG_FEATURE_KEY, configReducer} from './+state/config/config.reducer';
import {ACCOUNT_FEATURE_KEY, accountReducer} from './+state/account/account.reducer';
import {MESSAGES_FEATURE_KEY, messagesReducer} from './+state/messages/messages.reducer';
import {USB_FEATURE_KEY, usbReducer} from './+state/usb/usb.reducer';
import {ABOUT_FEATURE_KEY, aboutReducer} from './+state/about/about.reducer';
import {COMMANDS_LIST_FEATURE_KEY, commandsReducer} from './+state/commands-list/commands-list.reducer';
import {provideEffects} from '@ngrx/effects';
import {ConfigEffects} from './+state/config/config.effects';
import {AccountEffects} from './+state/account/account.effects';
import {MessagesEffects} from './+state/messages/messages.effects';
import {UsbEffects} from './+state/usb/usb.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {TARGETS_FEATURE_KEY, targetsReducer} from '../../../tripod/src/lib/+state/targets/targets.reducer';
import {TargetsEffects} from '../../../tripod/src/lib/+state/targets/targets.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideRouterStore(),
    provideStore({}),
    provideStoreDevtools(),
    IpcService,
    provideState('router', routerReducer),
    provideState(CONFIG_FEATURE_KEY, configReducer),
    provideState(ACCOUNT_FEATURE_KEY, accountReducer),
    provideState(MESSAGES_FEATURE_KEY, messagesReducer),
    provideState(COMMANDS_LIST_FEATURE_KEY, commandsReducer),
    provideState(USB_FEATURE_KEY, usbReducer),
    provideState(ABOUT_FEATURE_KEY, aboutReducer),
    provideState(TARGETS_FEATURE_KEY, targetsReducer),
    provideEffects([
        ConfigEffects,
        AccountEffects,
        MessagesEffects,
        UsbEffects,
        TargetsEffects,
    ]),
    provideAnimations(),
    provideAnimations()
]
};
