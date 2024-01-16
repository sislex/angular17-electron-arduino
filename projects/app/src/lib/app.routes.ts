import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../../blink/src/lib/blink.routes').then(
        (m) => m.blinkRoutes
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
