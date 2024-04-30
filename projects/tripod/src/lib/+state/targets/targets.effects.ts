import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  addCoordinates,
  addCoordinatesData,
  matchingTargets,
  // setActiveTarget, setNewActiveTarget,
  setNewTargetsList
} from './targets.actions';
import { Store } from '@ngrx/store';
import {
  getCurrentCoordinatesNumber,
  getNumberOfCoordinates, getOverageRecognitionTime,
  getCoordinatesList,
  getTargetsList,
  getLastDistanceList, getCoordinateList,
} from './targets.selectors';
import {ICoordinatesItem} from './targets.reducer';
import { ProcessingObjectData } from '../../skins/buttonsVideo/services/processingObjectData.service';

@Injectable()
export class TargetsEffects {

  sendMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addCoordinates),
        concatLatestFrom(
          () =>[
            this.store.select(getCoordinatesList),
            this.store.select(getNumberOfCoordinates),
            this.store.select(getCurrentCoordinatesNumber),
            this.store.select(getOverageRecognitionTime),
          ],
        ),
        tap(([
          {recognitionData},
               coordinatesList ,
               numberOfCoordinates,
               currentCoordinatesNumber,
               overageRecognitionTime,
            ]) => {
          recognitionData = JSON.parse(JSON.stringify(recognitionData));
          recognitionData.coordinates = recognitionData.coordinates.map((item: ICoordinatesItem) => ({
            top: 1 * item.top,
            left: 1 * item.left,
            width: 1 * item.width,
            height: 1 * item.height,
          }));
          currentCoordinatesNumber = currentCoordinatesNumber + 1;

          const newCoordinatesList = {
            ...coordinatesList,
            [currentCoordinatesNumber]: recognitionData.coordinates,
          };
          if (newCoordinatesList[currentCoordinatesNumber - numberOfCoordinates]) {
            delete newCoordinatesList[currentCoordinatesNumber - numberOfCoordinates];
          }

          if (overageRecognitionTime === 0) {
            overageRecognitionTime = recognitionData.recognitionTime;
          }
          const newOverageRecognitionTime = Math.round((overageRecognitionTime + recognitionData.recognitionTime) / 2);


          const data = {
            coordinatesList: newCoordinatesList,
            currentCoordinatesNumber,
            overageRecognitionTime: newOverageRecognitionTime,
          };

          this.store.dispatch(addCoordinatesData({data}));
          this.store.dispatch(matchingTargets());
        })
      ),
    {
      dispatch: false,
    }
  );

  // setActiveNewTarget$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType( setActiveTarget ),
  //       concatLatestFrom(() => this.store.select( getTargetsList )),
  //       tap(([{target}, coordinatesList]) => {
  //         console.log('На входе', coordinatesList)
  //         const newActiveTargets = coordinatesList.map(item => ({
  //           ...item,
  //           selected: item === target
  //         }));
  //         this.store.dispatch(setNewActiveTarget({
  //           targetsList: newActiveTargets
  //
  //         }));
  //         console.log('На выходе', newActiveTargets)
  //       })
  //     ),
  //   {dispatch: false}
  // );

  matchingTargets$ = createEffect(() =>
    this.actions$.pipe(
      ofType( matchingTargets ),
      concatLatestFrom(() => [
        this.store.select( getTargetsList ),
        this.store.select( getLastDistanceList ),
      ]),
  tap(([, oldTargetsList, newCoordinatesList]) => {
    let newTargetsList = this.processingObjectData.processMatchingTargets(newCoordinatesList, oldTargetsList);
        this.store.dispatch(setNewTargetsList({newTargetsList}));
      })
    ), {dispatch: false}
  );



  constructor(
    private readonly store: Store,
    private actions$: Actions,
    private processingObjectData: ProcessingObjectData,
  ) {}
}
