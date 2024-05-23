import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { MoveViewSkinState } from './move-view-skin.reducer';
import {
  sendDirection,
  setActiveDelay2, setActiveDelay1, setActiveOrientation,
  setActiveQuality, setActiveResolution,
  setActiveStep, setActiveZoom,
  setDelayList1, setDelayList2, setOrientation, setQuality, setResolution,
  setSteps, setZoom, setActiveDisplayTargets, setActiveTargets, setTargets, setDisplayTargets, setDirection, setDelay2, setDelay1, sendDataMove, setSendDirection
} from './move-view-skin.actions';
import {getActiveDelay1, getActiveDelay2, getDelay1, getDelay2, getDirection, getDisplayTargets, getOrientation, getQuality, getResolution, getSendDirection, getSteps, getTargets, getZoom} from './move-view-skin.selectors';
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


  setActiveTargetsList$ = createEffect(() =>
  this.actions$.pipe(
        ofType( setActiveTargets ),
        concatLatestFrom(() => this.store.select( getTargets )),
        tap(([{targets}, targetsList]) => {
          const newTargetsList = targetsList.map(item => ({
            ...item,
            selected: item === targets
          }));
          this.store.dispatch(setTargets({
            targetsList: newTargetsList
          }));
        })
      ),
      {dispatch: false}
  );

  setActiveDisplayargetsList$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveDisplayTargets ),
        concatLatestFrom(() => this.store.select( getDisplayTargets )),
        tap(([{displayTargets}, displayTargetsList]) => {
          const newDisplayTargetsList = displayTargetsList.map(item => ({
            ...item,
            selected: item === displayTargets
          }));
          this.store.dispatch(setDisplayTargets({
            displayTargetsList: newDisplayTargetsList
          }));
        })
        ),
    {dispatch: false}
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

  setActiveDelayList1$ = createEffect(() =>
    this.actions$.pipe(
      ofType( setActiveDelay1 ),
      concatLatestFrom(() => this.store.select( getActiveDelay1 )),
      tap(([{delay1}, delayList]) => {
        const newDelayList = delayList.map(item => ({
          ...item,
          selected: item === delay1
        }));
        this.store.dispatch(setDelayList1({
          activeDelayList1: newDelayList
        }));
        // console.log('setActiveDelayList1', newDelayList)
      })
    ), {dispatch: false}
  );

  setActiveDelayList2$ = createEffect(() =>
    this.actions$.pipe(
      ofType( setActiveDelay2 ),
      concatLatestFrom(() => this.store.select( getActiveDelay2 )),
      tap(([{delay2}, delayList]) => {
        const newDelayList = delayList.map(item => ({
          ...item,
          selected: item === delay2
        }));
        this.store.dispatch(setDelayList2({
          activeDelayList2: newDelayList
        }));
        // console.log('setActiveDelayList2', newDelayList)
      })
    ), {dispatch: false}
  );

  setActiveDelay1$ = createEffect(() =>
    this.actions$.pipe(
      ofType( setDelayList1 ),
      concatLatestFrom(() => this.store.select( getDelay1 )),
      tap(([{activeDelayList1}, delayList]) => {
        this.store.dispatch(setDelay1({
          delay: delayList
        }));
        this.store.dispatch(sendDataMove());
        // console.log('setActiveDelay1', delayList)
      })
    ), {dispatch: false}
  );

  setActiveDelay2$ = createEffect(() =>
    this.actions$.pipe(
      ofType( setDelayList2 ),
      concatLatestFrom(() => this.store.select( getDelay2 )),
      tap(([{activeDelayList2}, delayList]) => {
        this.store.dispatch(setDelay2({
          delay: delayList
        }));
        this.store.dispatch(sendDataMove());
        // console.log('setActiveDelay2', delayList)
      })
    ), {dispatch: false}
  );

  setDirection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendDirection),
      concatLatestFrom(() => this.store.select(getDirection)),
      tap(([{direction}, directionState]) => {

        console.log('Пришло в эффект из сервиса', direction);
        console.log('Старое направление использ в эффекте', directionState);

        let newDirectionState = {...directionState};
        if (direction === 'LEFT') {
          newDirectionState = {...newDirectionState, s1: -1 };
        } else if (direction === 'RIGHT') {
          newDirectionState = {...newDirectionState, s1: 1};
        } else if (direction === 'DOWN') {
          newDirectionState = {...newDirectionState, s2: -1};
        } else if (direction === 'UP') {
          newDirectionState = {...newDirectionState, s2: 1};
        } else if (direction === 'HORIZONTALSTOP') {
          newDirectionState = {...newDirectionState, s1: 0};
        } else if (direction === 'VERTICALSTOP') {
          newDirectionState = {...newDirectionState, s2: 0};
        }
        this.store.dispatch(setDirection({
          direction: newDirectionState
        }));
        this.store.dispatch(sendDataMove());
      })
    ), {dispatch: false}
  );

  sendDataMove$ = createEffect(() =>
    this.actions$.pipe(
    ofType( sendDataMove ),
    concatLatestFrom(() => [
      this.store.select( getSendDirection ),
      this.store.select( getDirection ),
    ]),
    tap(([, sendDirection, direction]) => {
      if (
        sendDirection.s1 != direction.s1
        || sendDirection.s2 != direction.s2
        || sendDirection.d1 != direction.d1
        || sendDirection.d2 != direction.d2
      ) {
        console.log('ОБНОВЛЕНИЕ НА', direction)

        this.store.dispatch(setSendDirection({
          sendDirection: direction
        }));

        this.store.dispatch(sendMessageToDevice({
          message: {
            event: 'SET',
            data: direction
          },
        }));
        }
      })
    ), {dispatch: false}
  );

  constructor(
    private store: Store<MoveViewSkinState>,
    private actions$: Actions,
  ) {}

}
