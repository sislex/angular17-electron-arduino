import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BLINK_ABOUT_FEATURE_KEY, blinkAboutState } from './blink-about.reducer';

export const selectFeature = createFeatureSelector<blinkAboutState>(BLINK_ABOUT_FEATURE_KEY);

export const getAboutTitle = createSelector(
    selectFeature,
    (state: blinkAboutState) => state.titleAbout
);

export const getAboutList = createSelector(
    selectFeature,
    (state: blinkAboutState) => state.aboutList
);
