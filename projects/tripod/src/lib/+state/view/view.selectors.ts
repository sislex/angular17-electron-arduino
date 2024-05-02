import {createFeatureSelector, createSelector} from '@ngrx/store';
import { IViewState, VIEW_FEATURE_KEY } from './view.reducer';

export const selectFeature = createFeatureSelector<IViewState>(VIEW_FEATURE_KEY);

export const getSideMenu = createSelector(
  selectFeature,
  (state: IViewState) => state.sideMenu
);

export const getAllowRecognition = createSelector(
  selectFeature,
  (state: IViewState) => state.allowRecognition
);

export const getSelectedSideMenuItem = createSelector(
  selectFeature,
  (state: IViewState) => state.sideMenu.find(item => item.isSelected)
);

export const isVideoView = createSelector(
  selectFeature,
  (state: IViewState) => state.sideMenu.find(item => item.isSelected)?.name === 'Image from video'
);
