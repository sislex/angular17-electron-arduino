import {createFeatureSelector, createSelector} from '@ngrx/store';
import { WIDGET_ABOUT_FEATURE_KEY, widgetAboutState } from './tripod-about.reducer';

export const selectFeature = createFeatureSelector<widgetAboutState>(WIDGET_ABOUT_FEATURE_KEY);

export const getAboutTitle = createSelector(
    selectFeature,
    (state: widgetAboutState) => state.titleAbout
);

export const getAboutList = createSelector(
    selectFeature,
    (state: widgetAboutState) => state.aboutList
);
