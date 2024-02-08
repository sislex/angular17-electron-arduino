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
    commands: [ {name: 'ON Indicator', description: '{"event":"LED","data":{"command":"ON"}}', event: '{"event":"LED","data":{"command":"ON"}}'}, 
    {name: 'OFF Indicator', description: '{"event":"LED","data":{"command":"OFF"}}', event: '{"event":"LED","data":{"command":"OFF"}}'},
    {name: 'BLINK Indicator', description: '{"event":"LED","data":{"command":"BLINK"}}', event: '{"event":"LED","data":{"command":"BLINK"}}'}]
};

export const blinkCommandsReducer = createReducer(
    initialState,
);

