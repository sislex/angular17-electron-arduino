import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { MoveViewSkinState } from './move-view-skin.reducer';
import {
  initSkin,
  sendDirection,
  setActiveDelay, setActiveOrientation,
  setActiveQuality, setActiveResolution,
  setActiveStep, setActiveZoom,
  setDelay, setOrientation, setQuality, setResolution,
  setSteps, setZoom
} from './move-view-skin.actions';
import {getDelay, getOrientation, getQuality, getResolution, getSteps, getZoom} from './move-view-skin.selectors';
import { sendMessageToDevice } from '../../../messages/messages.actions';

@Injectable()
export class SetButtonEffects {

  setActiveStepsList$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveStep ),
        concatLatestFrom(() => this.store.select( getSteps )),
        tap(([{steps}, stepsList]) => {
          const newStepsList = stepsList.map(item => ({
            ...item,
            selected: item === steps
          }));
          this.store.dispatch(setSteps({
            stepsList: newStepsList
          }));
        })
      ),
    {dispatch: false}
  );

  setActiveDelayList$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveDelay ),
        concatLatestFrom(() => this.store.select( getDelay )),
        tap(([{delay}, delayList]) => {
          const newDelayList = delayList.map(item => ({
            ...item,
            selected: item === delay
          }));
          this.store.dispatch(setDelay({
            delayList: newDelayList
          }));
        })
      ), {dispatch: false}
  );

  setActiveQuality$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveQuality ),
        concatLatestFrom(() => this.store.select( getQuality )),
        tap(([{quality}, delayList]) => {
          const newQualityList = delayList.map(item => ({
            ...item,
            selected: item === quality
          }));

          this.store.dispatch(setQuality({
            qualityList: newQualityList
          }));
        })
      ), {dispatch: false}
  );

  setActiveResolution$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveResolution ),
        concatLatestFrom(() => this.store.select( getResolution )),
        tap(([{resolution}, resolutionList]) => {
          const newResolutionList = resolutionList.map(item => ({
            ...item,
            selected: item === resolution
          }));

          this.store.dispatch(setResolution({
            resolutionList: newResolutionList
          }));
        })
      ), {dispatch: false}
  );

  setActiveZoom$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveZoom ),
        concatLatestFrom(() => this.store.select( getZoom )),
        tap(([{zoom}, zoomList]) => {
          const newZoomList = zoomList.map(item => ({
            ...item,
            selected: item === zoom
          }));

          this.store.dispatch(setZoom({
            zoomList: newZoomList
          }));
        })
      ), {dispatch: false}
  );

  setActiveOrientation$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveOrientation ),
        concatLatestFrom(() => this.store.select( getOrientation )),
        tap(([{orientation}, orientationList]) => {
          const newOrientationList = orientationList.map(item => ({
            ...item,
            selected: item === orientation
          }));

          this.store.dispatch(setOrientation({
            orientationList: newOrientationList
          }));
        })
      ), {dispatch: false}
  );

  setDirection$ = createEffect(() =>
      this.actions$.pipe(
        ofType( sendDirection ),
        concatLatestFrom(() => this.store.select( getSteps )),
        tap(([{direction, m}, stepsList]) => {
          const steps = stepsList.find(item => item.selected)?.data;
          let data;
            if (direction === 'RIGHT') {
              data = {
              s1: m === 1 ? steps : 1,
              };
            }
            if (direction === 'LEFT') {
              data = {
              s1: m === 1 ? -steps : -1,
              };
            }
            if (direction === 'UP') {
              data = {
              s2: m === 1 ? steps : 1,
              };
            }
            if (direction === 'DOWN') {
              data = {
              s2: m === 1 ? -steps : -1,
              };
            }

            this.store.dispatch(sendMessageToDevice({
              message: {
                event: 'SET',
                data: {...data, m}
              },
            }));
        })
      ), {dispatch: false}
  );

  initSkin$ = createEffect(() =>
      this.actions$.pipe(
        ofType( initSkin ),
        concatLatestFrom(() => this.store.select( getDelay )),
        tap(([, delayList]) => {
          const d = delayList.find(item => item.selected)?.data;

          this.store.dispatch(sendMessageToDevice({
            message: {
              event: 'SET',
              data: {d}
            },
          }));
        })
      ), {dispatch: false}
  );


  constructor(
    private store: Store<MoveViewSkinState>,
    private actions$: Actions,
  ) {}

}
