import { Routes } from '@angular/router';
import {UsbListContainerComponent} from './containers/usb-list-container/usb-list-container.component';
import { MessagesContainerComponent } from './containers/messages-container/messages-container.component';
import { CommandsListContainerComponent } from './containers/commands-list-container/commands-list-container.component';
import { AboutContainerComponent } from './containers/about-container/about-container.component';

export const routes: Routes = [
  {
    path: 'usb-list',
    component: UsbListContainerComponent,
  },
  {
    path: 'logs',
    component: MessagesContainerComponent,
  },
  {
    path: 'commands-list',
    component: CommandsListContainerComponent,
  },
  {
    path: 'about',
    component: AboutContainerComponent,
  },
  {
    path: 'widget/blink',
    loadChildren: () =>
      import('../../../blink/src/lib/blink.routes').then(
        (m) => m.blinkRoutes
      ),
  },
  {
    path: '**',
    redirectTo: 'usb-list',
  },
];
