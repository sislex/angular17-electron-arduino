import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { ConfigPartialState} from './config.reducer';
import { Title } from '@angular/platform-browser';

@Injectable()
export class ConfigEffects {

  constructor(
    private store: Store<ConfigPartialState>,
    private actions$: Actions,
    private title: Title,
  ) {}

}
