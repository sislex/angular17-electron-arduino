import { createReducer } from '@ngrx/store';

export const COMMANDS_LIST_FEATURE_KEY = 'general commands';

export interface ICommands {
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
    commands: [ {name: 'Connect to device', event: '{"event":"CONNECT_USB_DEVICE","data":{"name":"COM1","timestamp":1706869676852}}'}, 
    {name: 'Disconnect to device', event: '{"event":"DISCONNECT_USB_DEVICE","data":{"name":"COM1","timestamp":1706869677595}}'}]
};

export const commandsReducer = createReducer(
    initialState,
);

