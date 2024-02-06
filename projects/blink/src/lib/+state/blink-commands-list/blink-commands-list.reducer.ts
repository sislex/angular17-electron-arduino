import { createReducer } from '@ngrx/store';

export const BLINK_COMMANDS_LIST_FEATURE_KEY = 'blink/commandsList';

export interface IBlinkCommands {
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
    commands: [ {name: 'ON Indicator', event: '{"event":"LED","data":{"command":"ON"}}'}, 
    {name: 'OFF Indicator', event: '{"event":"LED","data":{"command":"OFF"}}'},
    {name: 'BLINK Indicator', event: '{"event":"LED","data":{"command":"BLINK"}}'}]
};

export const blinkCommandsReducer = createReducer(
    initialState,
);

