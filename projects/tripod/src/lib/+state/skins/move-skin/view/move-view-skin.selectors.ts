import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TRIPOD_VIEW_SKIN_FEATURE_KEY, MoveViewSkinState } from './move-view-skin.reducer';

export const selectFeature = createFeatureSelector<MoveViewSkinState>(TRIPOD_VIEW_SKIN_FEATURE_KEY);

export const getSteps = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.steps
);

export const getDelay1 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.delay1.find(item => item.selected)?.data
);

export const getDelay2 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.delay2.find(item => item.selected)?.data
);

export const getActiveDelay1 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.delay1
);

export const getActiveDelay2 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.delay2
);

export const getDelayModify1 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => {
    let result = state.delay1;
    if (state.isShift) {
      result = state.delay1.map((item, key) => {
        return {
          ...item,
          selected: (key === state.delay1.length - 1) ? true : false,
        };
      });
    } else if (state.isCtrl) {
      result = state.delay1.map((item, key) => {
        return {
          ...item,
          selected: (key === 0) ? true : false,
        };
      });
    }
    return result;
  }
);

export const getDelayModify2 = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => {
    let result = state.delay2;
    if (state.isShift) {
      result = state.delay2.map((item, key) => {
        return {
          ...item,
          selected: (key === state.delay2.length - 1) ? true : false,
        };
      });
    } else if (state.isCtrl) {
      result = state.delay2.map((item, key) => {
        return {
          ...item,
          selected: (key === 0) ? true : false,
        };
      });
    }
    return result;
  }
);

export const getVideoUrlHost = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.videoUrlHost
);

export const getVideoUrl = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.videoUrlHost + '/video'
);

export const getQuality = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.quality
);

export const getResolution = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.resolution
);

export const getZoom = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.zoom
);

export const getOrientation = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.orientation
);

export const getTargets = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.targets
);

export const getDirection = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.direction
);

export const getSendDirection = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => state.sendDirection
);

export const getDisplayTargets = createSelector(
  selectFeature,
  (state: MoveViewSkinState) => {
    let result = state.displayTargets;
    const isOn = state.targets.find(item => item.selected)?.data === true;
    if (!isOn) {
      result = state.displayTargets.map(item => ({
        ...item,
        selected: true,
      }));
    }
    return result;
  }
);

