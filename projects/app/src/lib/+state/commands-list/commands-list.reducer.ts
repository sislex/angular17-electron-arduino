import { createReducer } from '@ngrx/store';

export const COMMANDS_LIST_FEATURE_KEY = 'commandsList';

export interface ICommands {
    name: string;
    description: string;
    message: any;
}

export interface CommandsListState {
    commandsList: ICommands[];
}

export interface CommandsListPartialState {
    readonly [COMMANDS_LIST_FEATURE_KEY]: CommandsListState;
}

export const initialState: CommandsListState = {
    commandsList: [{
        name: 'Connect to device', 
        description: '{"event":"CONNECT_USB_DEVICE","data":{"name":"COM123","timestamp":000}}',
        message: {event:"CONNECT_USB_DEVICE", data:{deviceName:"COM123", timestamp:111}} 
    }, 
    {
        name: 'Disconnect to device', 
        description: '{"event":"DISCONNECT_USB_DEVICE","data":{"name":"COM123","timestamp":000}}',
        message: {event:"DISCONNECT_USB_DEVICE", data:{deviceName:"COM123", timestamp:111}}
    }]
};

export const commandsReducer = createReducer(
    initialState,
);
