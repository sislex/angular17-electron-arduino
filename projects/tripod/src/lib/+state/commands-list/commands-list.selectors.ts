import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIPOD_COMMANDS_LIST_FEATURE_KEY, CommandsListState } from './commands-list.reducer';

export const selectFeature = createFeatureSelector<CommandsListState>(TRIPOD_COMMANDS_LIST_FEATURE_KEY);

export const getCommandsList = createSelector(
    selectFeature,
    (state: CommandsListState) => state.commands
);
