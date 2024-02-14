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
    {name: 'ON Indicator', description:'{event:"LED",data:{"command":"ON","timestamp":"1707740012056"}}', message: {event:"LED",data:{"command":"ON","timestamp":"1707740012056"}}}, 
    {name: 'OFF Indicator', description:'{event:"LED",data:{"command":"OFF","timestamp":"1707740012056"}}', message: {event:"LED",data:{"command":"OFF","timestamp":"1707740012056"}}},
    {name: 'BLINK Indicator', description:'{event:"LED",data:{"command":"BLINK","timestamp":"1707740012056"}}', message: {event:"LED",data:{"command":"BLINK","timestamp":"1707740012056"}}}
    ]
};

export const blinkCommandsReducer = createReducer(
    initialState,
);

