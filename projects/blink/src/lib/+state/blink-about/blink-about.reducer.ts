import { createReducer, on } from '@ngrx/store';
// import * as AboutActions from './blink-about.actions';

export const BLINK_ABOUT_FEATURE_KEY = 'aboutWidgetDevice';

export interface IAbout {
    name: string;
    description: string;
}

export interface blinkAboutState {
    titleAbout: string;
    aboutList: IAbout[];
}

export interface AboutPartialState {
    readonly [BLINK_ABOUT_FEATURE_KEY]: blinkAboutState;
}

export const initialState: blinkAboutState = {
    titleAbout: 'widget',
    aboutList: [
        {name: 'Name', description: 'Blink widget'},
        {name: 'Description', description: 'Works with a microcontroller. Sends sets of commands to turn on, turn off and blink the light bulb on the microcontroller.'},
        {name: 'Date of create', description: '01.02.2024'},
        {name: 'Version', description: '1.0.0'}
        ],
};

export const blinkAboutReducer = createReducer(
    initialState,
);

