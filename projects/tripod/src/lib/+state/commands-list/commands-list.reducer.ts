import { createReducer } from '@ngrx/store';
import { ICommands } from '../../../../../app/src/lib/+state/commands-list/commands-list.reducer';

export const TRIPOD_COMMANDS_LIST_FEATURE_KEY = 'tripod/commandsList';

export interface CommandsListState {
    commands: ICommands[];
}

export interface BlinkCommandsListPartialState {
    readonly [TRIPOD_COMMANDS_LIST_FEATURE_KEY]: CommandsListState;
}

export const initialState: CommandsListState = {
    commands: [
    {name: 'ON Indicator', description:'{command:"ON"}', message: {event:"LED",data:{"command":"ON","timestamp":"1707740012056"}}}, 
    {name: 'OFF Indicator', description:'{command:"OFF"}', message: {event:"LED",data:{"command":"OFF","timestamp":"1707740012056"}}},
    {name: 'BLINK Indicator', description:'{command:"BLINK"}', message: {event:"LED",data:{"command":"BLINK","timestamp":"1707740012056"}}}
    ]
};

export const CommandsReducer = createReducer(
    initialState,
);

