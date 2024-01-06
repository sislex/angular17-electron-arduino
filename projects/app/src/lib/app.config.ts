import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {appRoutes} from '../../projects/app/src/lib/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),

    provideStore({}),
    provideStoreDevtools(),
  ]
};
