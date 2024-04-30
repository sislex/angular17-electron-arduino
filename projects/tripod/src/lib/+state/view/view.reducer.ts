import { createReducer, on } from '@ngrx/store';
import { setSideMenu } from './view.actions';

export const VIEW_FEATURE_KEY = 'view';

export interface IMenuItem {
  name: string;
  isSelected?: boolean;
  data?: any;
}

export interface IViewState {
  sideMenu: IMenuItem[];
}

export const initialViewState: IViewState = {
  sideMenu:  [
    {name: 'Image from video', data: {src: 'assets/videos/people.mp4', isVideo: true, scaleRecognition: 2, recognitionInterval: 500}},
  ],
};

export const viewReducer = createReducer(
  initialViewState,
  on(setSideMenu, (state, {sideMenu}) => ({...state, sideMenu})),
);
