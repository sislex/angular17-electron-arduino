import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'device',
  //   loadChildren: () =>
  //     import('../../projects/portal/src/lib/login.routes').then(
  //       (m) => m.loginRoutes
  //     ),
  // },

  {
    path: '**',
    redirectTo: '',
  },
];
