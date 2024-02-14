import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TRIPOD_SKIN_FEATURE_KEY, SkinState } from './skin.reducer';

export const selectFeature = createFeatureSelector<SkinState>(TRIPOD_SKIN_FEATURE_KEY);

export const getSkin = createSelector(
    selectFeature,
    (state: SkinState) => state.skin
);