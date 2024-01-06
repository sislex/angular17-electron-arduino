import { createAction, props } from '@ngrx/store';

export const setChannelName = createAction(
  '[Config] setChannelName',
  props<{ channelName: string }>()
);
