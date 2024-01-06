import {Routes} from '@angular/router';
import {AppContainerComponent} from './containers/app-container/app-container.component';
import {provideState, provideStore} from '@ngrx/store';
import {CONFIG_FEATURE_KEY, configReducer} from './+state/config/config.reducer';
import {provideEffects} from '@ngrx/effects';
import {ConfigEffects} from './+state/config/config.effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {ACCOUNT_FEATURE_KEY, accountReducer} from './+state/account/account.reducer';
import {MESSAGES_FEATURE_KEY, messagesReducer} from './+state/messages/messages.reducer';
import {USB_FEATURE_KEY, usbReducer} from './+state/usb/usb.reducer';
import {AccountEffects} from './+state/account/account.effects';
import {MessagesEffects} from './+state/messages/messages.effects';
import {UsbEffects} from './+state/usb/usb.effects';
import {IpcService} from './services/ipc.service';
import {AuthContainerComponent} from './containers/auth-container/auth-container.component';

export const appRoutes: Routes = [
  {
    path: '',
    providers: [

    ],
    component: AuthContainerComponent,
  },
];
