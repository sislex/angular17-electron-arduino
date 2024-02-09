import { createAction, props } from '@ngrx/store';

export const setDeviceName = createAction(
  `[blinkMessages] setDeviceName`,
  props<{ deviceName: string }>()
);

