import { createReducer } from '@ngrx/store';

export const TRIPOD_ABOUT_FEATURE_KEY = 'tripod/about';

export interface IAbout {
    name: string;
    description: string;
}

export interface AboutState {
    titleAbout: string;
    aboutList: IAbout[];
}

export interface AboutPartialState {
    readonly [TRIPOD_ABOUT_FEATURE_KEY]: AboutState;
}

export const initialState: AboutState = {
    titleAbout: 'widget',
    aboutList: [
        {name: 'Name', description: 'Tripod widget'},
        {name: 'Description', description: 'Works with a microcontroller.'},
        {name: 'Date of create', description: '14.02.2024'},
        {name: 'Version', description: '1.0.0'}
        ],
};

export const AboutReducer = createReducer(
    initialState,
);