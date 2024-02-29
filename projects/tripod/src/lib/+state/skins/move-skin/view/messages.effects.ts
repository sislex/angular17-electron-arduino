import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { MoveViewSkinState } from './move-view-skin.reducer';
import {initSkin, sendDirection, setActiveDelay, setActiveStep, setDelay, setSteps} from './move-view-skin.actions';
import { getDelay, getSteps } from './move-view-skin.selectors';
import { sendMessageToDevice } from '../../../messages/messages.actions';

@Injectable()
export class SetButtonEffects {


  setActiveStepsList$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveStep ),
        concatLatestFrom(() => this.store.select( getSteps )),
        tap(([{steps}, stepsList]) => {
          const newsStepsList = stepsList.map(item => ({
            ...item,
            selected: item === steps
          }));
          this.store.dispatch(setSteps({
            stepsList: newsStepsList
          }));
        })
      ),
    {
      dispatch: false,
    }
  );

  setActiveDelayList$ = createEffect(() =>
      this.actions$.pipe(
        ofType( setActiveDelay ),
        concatLatestFrom(() => this.store.select( getDelay )),
        tap(([{delay}, delayList]) => {
          let data;
          const newsDelayList = delayList.map(item => ({
            ...item,
            selected: item === delay
          }));
          this.store.dispatch(setDelay({
            delayList: newsDelayList
          }));
        })
      ),
    {
      dispatch: false,
    }
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
      ),
    {
      dispatch: false,
    }
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
      ),
    {
      dispatch: false,
    }
  );


  constructor(
    private store: Store<MoveViewSkinState>,
    private actions$: Actions,
  ) {}

}
