import { createReducer, on } from '@ngrx/store';

export const TRIPOD_TARGETS_FEATURE_KEY = 'tripod/messages';

export interface ITargetsState {
  target: ITarget[];
}

export interface ITarget {
  targetName: string;
  posData: IDataTarget[];
  speedVerification: number;
}

export interface IDataTarget {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
}

export interface TripodTargetsPartialState {
  readonly [TRIPOD_TARGETS_FEATURE_KEY]: ITargetsState;
}

export const initialState: ITargetsState = {
  target: []
};

export const TargetsReducer = createReducer(
    initialState,
);


