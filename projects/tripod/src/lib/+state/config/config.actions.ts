import { createAction, props } from '@ngrx/store';

export const init = createAction(`[blinkConfig] init`);

export const getInfo = createAction(`[blinkConfig] getInfo`);

export const setConfig = createAction(
  `[blinkConfig] setConfig`,
  props<{ mode: string, led: string }>()
);

