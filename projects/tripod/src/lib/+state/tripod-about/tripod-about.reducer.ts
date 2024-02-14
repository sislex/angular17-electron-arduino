import { createReducer } from '@ngrx/store';

export const WIDGET_ABOUT_FEATURE_KEY = 'tripod/about';

export interface IAbout {
    name: string;
    description: string;
}

export interface widgetAboutState {
    titleAbout: string;
    aboutList: IAbout[];
}

export interface AboutPartialState {
    readonly [WIDGET_ABOUT_FEATURE_KEY]: widgetAboutState;
}

export const initialState: widgetAboutState = {
    titleAbout: 'widget',
    aboutList: [
        {name: 'Name', description: 'Tripod widget'},
        {name: 'Description', description: 'Works with a microcontroller.'},
        {name: 'Date of create', description: '14.02.2024'},
        {name: 'Version', description: '1.0.0'}
        ],
};

export const widgetAboutReducer = createReducer(
    initialState,
);