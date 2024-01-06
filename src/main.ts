import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../projects/app/src/lib/app.config';
import {AppContainerComponent} from '../projects/app/src/lib/containers/app-container/app-container.component';

bootstrapApplication(AppContainerComponent, appConfig)
  .catch((err) => console.error(err));
