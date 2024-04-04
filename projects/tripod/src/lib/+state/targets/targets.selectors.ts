import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IViewState, TARGETS_FEATURE_KEY} from './targets.reducer';
import {findNearestPointToCenter} from '../../../../../app/src/lib/halpers/coordinates-utils';

export const selectFeature = createFeatureSelector<IViewState>(TARGETS_FEATURE_KEY);

export const getCoordinatesList = createSelector(
  selectFeature,
  (state: IViewState) => state.coordinatesList
);

export const getCoordinatesStyles = createSelector(
  selectFeature,
  (state: IViewState) => {
    let result: any[] = [];
    if (state.coordinatesList[state.currentCoordinatesNumber]) {
      const centerCoordinates = findNearestPointToCenter(state.coordinatesList[state.currentCoordinatesNumber]);
      result = state.coordinatesList[state.currentCoordinatesNumber].map((item, index) => {
        let color = 'red';
        if (item === centerCoordinates) {
          color = 'green';
        }
        return {
          top: item.top + '%' ,
          left: item.left + '%',
          width: item.width + '%',
          height: item.height + '%',
          'border-color': color,
        };
      });
    }

    return result;
  }
);

export const getTheDistanceToTheCenterOfTheNearestTarget = createSelector(
  selectFeature,
  (state: IViewState) => {
    let distance;
    if (state.coordinatesList[state.currentCoordinatesNumber]) {
      const coordinates = findNearestPointToCenter(state.coordinatesList[state.currentCoordinatesNumber]);
      distance = {
        top: 50 - (coordinates.top + coordinates.height/2),
        left: 50 - (coordinates.left + coordinates.width/2)
      };
    }
    return distance;
  }
);

export const getNumberOfCoordinates = createSelector(
  selectFeature,
  (state: IViewState) => state.numberOfCoordinates
);

export const getCurrentCoordinatesNumber = createSelector(
  selectFeature,
  (state: IViewState) => state.currentCoordinatesNumber
);

export const getOverageRecognitionTime = createSelector(
  selectFeature,
  (state: IViewState) => state.overageRecognitionTime
);

