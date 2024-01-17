import { Routes } from '@angular/router';
import {UsbListContainerComponent} from './containers/usb-list-container/usb-list-container.component';

export const routes: Routes = [
  {
    path: 'usb-list',
    component: UsbListContainerComponent,
  },
  {
    path: 'control/blink/:deviceName',
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
