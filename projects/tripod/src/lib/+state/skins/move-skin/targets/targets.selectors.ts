import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TRIPOD_TARGETS_FEATURE_KEY, ITargetsState } from './targets.reducer';

export const selectFeature = createFeatureSelector<ITargetsState>(TRIPOD_TARGETS_FEATURE_KEY);

export const getTargetsList = createSelector(
    selectFeature,
    (state: ITargetsState) => state.target
);
