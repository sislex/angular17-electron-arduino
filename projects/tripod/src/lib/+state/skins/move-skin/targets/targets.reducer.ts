import { createReducer, on } from '@ngrx/store';
// import * as BlinkMessagesActions from './targets.actions';

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
  target: [
    {targetName: 'target1', posData: [ {xPos: 5, yPos: 5,  width:5, height: 5} ], speedVerification: 0},
    {targetName: 'target2', posData: [ {xPos: 10, yPos: 10,  width:10, height: 10} ], speedVerification: 1},
  ]
};

export const TargetsReducer = createReducer(
    initialState,
);


