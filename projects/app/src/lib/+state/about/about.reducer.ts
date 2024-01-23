import { createReducer, on } from '@ngrx/store';
import * as AboutActions from './about.actions';

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
    titleAbout: '',
    aboutList: [],
};

export const aboutReducer = createReducer(
    initialState,
    on(AboutActions.setData, (state, {titleAbout}) => ({ ...state, titleAbout })),
    on(AboutActions.setData, (state, {aboutList}) => ({ ...state, aboutList })),
);

