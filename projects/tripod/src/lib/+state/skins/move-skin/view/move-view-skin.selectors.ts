import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TRIPOD_VIEW_SKIN_FEATURE_KEY, MoveViewSkinState } from './move-view-skin.reducer';

export const selectFeature = createFeatureSelector<MoveViewSkinState>(TRIPOD_VIEW_SKIN_FEATURE_KEY);

export const getSteps = createSelector(
    selectFeature,
    (state: MoveViewSkinState) => state.steps
);

export const getDelay = createSelector(
    selectFeature,
    (state: MoveViewSkinState) => state.delay
);