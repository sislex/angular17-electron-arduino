import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BLINK_SKIN_FEATURE_KEY, BlinkSkinState } from './blink-skin.reducer';

export const selectFeature = createFeatureSelector<BlinkSkinState>(BLINK_SKIN_FEATURE_KEY);

export const getSkin = createSelector(
    selectFeature,
    (state: BlinkSkinState) => state.skin
);