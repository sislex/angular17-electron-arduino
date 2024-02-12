import { createReducer } from '@ngrx/store';
import { ICommands } from '../../../../../app/src/lib/+state/commands-list/commands-list.reducer';

export const BLINK_COMMANDS_LIST_FEATURE_KEY = 'blink/commandsList';

export interface BlinkCommandsListState {
    commands: ICommands[];
}

export interface BlinkCommandsListPartialState {
    readonly [BLINK_COMMANDS_LIST_FEATURE_KEY]: BlinkCommandsListState;
}

export const initialState: BlinkCommandsListState = {
    commands: [
    {name: 'ON Indicator', description:'{command:"ON"}', event: {command:"ON"}}, 
    {name: 'OFF Indicator', description:'{command:"OFF"}', event: {command:"OFF"}},
    {name: 'BLINK Indicator', description:'{command:"BLINK"}', event: {command:"BLINK"}}
    ]
};

export const blinkCommandsReducer = createReducer(
    initialState,
);

