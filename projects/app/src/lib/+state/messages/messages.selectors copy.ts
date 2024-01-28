// // actions.ts
// import { createAction, props } from '@ngrx/store';

// export const filterData = createAction(
//   '[Data List] Filter Data',
//   props<{ filter: string }>()
// );

// // reducer.ts
// import { createReducer, on } from '@ngrx/store';
// import { filterData } from './actions';

// export interface State {
//   data: any[];
//   filteredData: any[];
// }

// export const initialState: State = {
//   data: [],
//   filteredData: []
// };

// export const dataReducer = createReducer(
//   initialState,
//   on(filterData, (state, { filter }) => {
//     const filteredData = state.data.filter(item => item.name.includes(filter));
//     return { ...state, filteredData };
//   })
// );

// // selectors.ts
// import { createSelector } from '@ngrx/store';
// import { State } from './reducer';

// export const selectData = (state: State) => state.data;
// export const selectFilteredData = (state: State) => state.filteredData;

// export const selectFilteredDataByName = createSelector(
//   selectFilteredData,
//   (filteredData, name) => filteredData.filter(item => item.name === name)
// );

// // effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { filterData } from './actions';
// import { map, switchMap } from 'rxjs/operators';
// import { DataService } from './data.service';

// @Injectable()
// export class DataEffects {
//   filterData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(filterData),
//       switchMap(({ filter }) =>
//         this.dataService.getData().pipe(
//           map(data => {
//             const filteredData = data.filter(item => item.name.includes(filter));
//             return filterDataSuccess({ filteredData });
//           })
//         )
//       )
//     )
//   );

//   constructor(private actions$: Actions, private dataService: DataService) {}
// }
