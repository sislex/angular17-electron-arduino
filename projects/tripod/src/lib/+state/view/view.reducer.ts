import { createReducer, on } from '@ngrx/store';
import * as ViewAction from './view.actions';

export const VIEW_FEATURE_KEY = 'view';

export interface IMenuItem {
  name: string;
  isSelected?: boolean;
  data?: any;
}

export interface IViewState {
  allowRecognition: boolean;
  sideMenu: IMenuItem[];
}

export const initialViewState: IViewState = {
  allowRecognition: true,
  sideMenu:  [
    {name: 'Image from video', data: {src: 'assets/videos/people.mp4', isVideo: true, scaleRecognition: 2, recognitionInterval: 500}},
  ],
};

export const viewReducer = createReducer(
  initialViewState,
  on(ViewAction.setSideMenu, (state, {sideMenu}) => ({...state, sideMenu})),
  on(ViewAction.setAllowRecognition, (state) => ({...state, allowRecognition: !state.allowRecognition})),
  on(ViewAction.setIsRecognition, (state, {allowRecognition}) => ({...state, allowRecognition})),
);
