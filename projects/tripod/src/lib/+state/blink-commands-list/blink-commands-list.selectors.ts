import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BLINK_COMMANDS_LIST_FEATURE_KEY, BlinkCommandsListState } from './blink-commands-list.reducer';

export const selectFeature = createFeatureSelector<BlinkCommandsListState>(BLINK_COMMANDS_LIST_FEATURE_KEY);

export const getBlinkCommandsList = createSelector(
    selectFeature,
    (state: BlinkCommandsListState) => state.commands
);
