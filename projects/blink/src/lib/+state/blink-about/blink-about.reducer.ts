import { createReducer, on } from '@ngrx/store';
// import * as AboutActions from './blink-about.actions';

export const BLINK_ABOUT_FEATURE_KEY = 'about';

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
    titleAbout: 'device',
    aboutList: [
        {name: 'Name', description: 'Page of device'},
        {name: 'Description', description: 'Contains main device controls.'},
        {name: 'Date of create', description: '23.01.2024'},
        {name: 'Version', description: '1.0.0'}
        ],
};

export const blinkAboutReducer = createReducer(
    initialState,
    // on(AboutActions.setData, (state, {titleAbout}) => ({ ...state, titleAbout })),
    // on(AboutActions.setData, (state, {aboutList}) => ({ ...state, aboutList })),
);

