import { createReducer, on } from '@ngrx/store';
import * as TargetsAction from './targets.actions';

export const TARGETS_FEATURE_KEY = 'targets';

export interface ICoordinatesItem {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ICoordinates {
  top: number;
  left: number;
  radius: number;
}

export interface ITarget{
  id: number;
  counter: number;
  coordinates: ICoordinates;
}

export class Target implements ITarget {
  id: number;
  counter: number;
  coordinates: ICoordinates;

  constructor(id: number, coordinates: ICoordinates) {
    this.id = id;
    this.counter = 1;
    this.coordinates = coordinates;
  }
}

export interface IViewState {
  numberOfCoordinates: number;
  currentCoordinatesNumber: number;
  overageRecognitionTime: number;
  coordinatesList: { [key: number]: ICoordinatesItem[] };
  targetsList: ITarget [];
  selectedId: number;
}

export const initialViewState: IViewState = {
  numberOfCoordinates: 100,
  currentCoordinatesNumber: 0,
  overageRecognitionTime: 0,
  coordinatesList:  {},
  targetsList: [],
  selectedId: -1,
};

export const targetsReducer = createReducer(
  initialViewState,
  on(TargetsAction.addCoordinatesData, (state, {data}) => ({
    ...state,
    coordinatesList: data.coordinatesList,
    currentCoordinatesNumber: data.currentCoordinatesNumber,
    overageRecognitionTime: data.overageRecognitionTime,
  })),
  on(TargetsAction.setNewTargetsList, (state, {newTargetsList}) => ({ ...state, targetsList: newTargetsList })),
  on(TargetsAction.setActiveTarget, (state, {selectedId}) => ({ ...state, selectedId })),
);
