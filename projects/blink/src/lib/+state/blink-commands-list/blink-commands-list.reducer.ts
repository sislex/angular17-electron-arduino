import { createReducer } from '@ngrx/store';

export const BLINK_COMMANDS_LIST_FEATURE_KEY = 'blink/commandsList';

export interface IBlinkCommands {
    num: number;
    name: string;
    event: string;
}

export interface BlinkCommandsListState {
    commands: IBlinkCommands[];
}

export interface BlinkCommandsListPartialState {
    readonly [BLINK_COMMANDS_LIST_FEATURE_KEY]: BlinkCommandsListState;
}

export const initialState: BlinkCommandsListState = {
    commands: [ {num: 122, name: 'nam1', event: 'ev1'}, 
    {num: 222, name: 'nam2', event: 'ev2'},
    {num: 222123123, name: 'nam2', event: 'ev2'}]
};

export const blinkCommandsReducer = createReducer(
    initialState,
);

