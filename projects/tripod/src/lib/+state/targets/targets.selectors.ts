import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ICoordinates, ICoordinatesItem, IViewState, TARGETS_FEATURE_KEY} from './targets.reducer';
import {findNearestPointToCenter} from '../../../../../app/src/lib/halpers/coordinates-utils';

export const selectFeature = createFeatureSelector<IViewState>(TARGETS_FEATURE_KEY);

export const getCoordinatesList = createSelector(
  selectFeature,
  (state: IViewState) => state.coordinatesList
);

// Новый селектор
export const getLastArrayFromCoordinatesList = createSelector(
  getCoordinatesList,
  (coordinatesList) => {
    if (Object.keys(coordinatesList).length === 0) {
      // Возвращаем undefined, если список пуст
      return undefined;
    }
    let keys = Object.keys(coordinatesList).map(Number);
    let lastKey = Math.max(...keys);
    let lastArray = coordinatesList[lastKey];
    return lastArray;
  }
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
      let minValue = Math.min(coordinates.width, coordinates.height);
      distance = {
        left: 50 - (coordinates.left + coordinates.width/2),
        top: 50 - (coordinates.top + coordinates.height/2),
        radius: minValue / Math.sqrt(2),
      };
    }
    return distance;
  }
);

export const getLastDistanceList = createSelector(
  selectFeature,
  (state: IViewState) => {
    let distanceList: ICoordinates[] = [];
    if (state.coordinatesList[state.currentCoordinatesNumber]) {
      distanceList = state.coordinatesList[state.currentCoordinatesNumber].map(coordinates => {
        let minValue = Math.min(coordinates.width, coordinates.height);
        return {
          left: 50 - (coordinates.left + coordinates.width/2),
          top: 50 - (coordinates.top + coordinates.height/2),
          radius: minValue / Math.sqrt(2),
        };
      });
    }

    return distanceList;
  }
);

export const getTargetsList = createSelector(
  selectFeature,
  (state: IViewState) => state.targetsList
);

export const getTargetsData = createSelector(
  getTargetsList,
  (targetsList) => {
    return targetsList.map(target => ({
      id: target.id,
      counter: target.counter
    }));
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

