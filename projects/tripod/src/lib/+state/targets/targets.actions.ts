import {createAction, props} from '@ngrx/store';
import {ICoordinatesItem, ITarget} from './targets.reducer';

export const addCoordinates = createAction(
  '[Targets] addCoordinates',
  props<{ recognitionData: {coordinates: ICoordinatesItem[], recognitionTime: number} }>()
);

export const addCoordinatesData = createAction(
  '[Targets] addCoordinatesData',
  props<{ data: {
      coordinatesList: { [key: number]: ICoordinatesItem[] },
      currentCoordinatesNumber: number,
      overageRecognitionTime: number,
    } }>()
);

export const matchingTargets = createAction(
  '[Targets] matchingTargets',
);

export const setNewTargetsList = createAction(
  '[Targets] setNewTargetsList',
  props<{ newTargetsList: ITarget[] }>()
);

export const checkNewTargetsList = createAction(
  '[Targets] checkNewTargetsList',
);

export const setCoordinatesList = createAction(
  '[Targets] setSideMenu',
  props<{ coordinatesList: ICoordinatesItem }>()
);
