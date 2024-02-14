import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TRIPOD_ABOUT_FEATURE_KEY, AboutState } from './about.reducer';

export const selectFeature = createFeatureSelector<AboutState>(TRIPOD_ABOUT_FEATURE_KEY);

export const getAboutTitle = createSelector(
    selectFeature,
    (state: AboutState) => state.titleAbout
);

export const getAboutList = createSelector(
    selectFeature,
    (state: AboutState) => state.aboutList
);
