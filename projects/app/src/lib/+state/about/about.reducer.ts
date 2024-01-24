import { createReducer, on } from '@ngrx/store';
// import * as AboutActions from './about.actions';

export const ABOUT_FEATURE_KEY = 'about';

export interface IAbout {
    name: string;
    description: string;
}

export interface AboutState {
    titleAbout: string;
    aboutList: IAbout[];
}

export interface AboutPartialState {
    readonly [ABOUT_FEATURE_KEY]: AboutState;
}

export const initialState: AboutState = {
    titleAbout: 'widget',
    aboutList: [
        {name: 'Name', description: 'Main page'},
        {name: 'Description', description: 'Contains the main application control panels'},
        {name: 'Date of create', description: '23.01.2024'},
        {name: 'Version', description: '1.0.0'}
    ],
};

export const aboutReducer = createReducer(
    initialState,
    // on(AboutActions.setData, (state, {titleAbout}) => ({ ...state, titleAbout })),
    // on(AboutActions.setData, (state, {aboutList}) => ({ ...state, aboutList })),
);

