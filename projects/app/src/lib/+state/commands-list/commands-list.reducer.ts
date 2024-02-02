import { createReducer } from '@ngrx/store';

export const COMMANDS_LIST_FEATURE_KEY = 'general commands';

export interface ICommands {
    num: number;
    name: string;
    event: string;
}

export interface CommandsListState {
    commands: ICommands[];
}

export interface CommandsListPartialState {
    readonly [COMMANDS_LIST_FEATURE_KEY]: CommandsListState;
}

export const initialState: CommandsListState = {
    commands: [ {num: 1, name: 'nam1', event: 'ev1'}, 
    {num: 2, name: 'nam2', event: 'ev2'}]
};

export const commandsReducer = createReducer(
    initialState,
);

