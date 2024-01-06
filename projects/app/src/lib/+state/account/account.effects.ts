import { Injectable } from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, take, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  getUserFromLocalStorage,
  resetUser,
  resetUserFromLocalStorageAndState,
  setAndSaveUser,
  setUser
} from './account.actions';

const ACCOUNT_LOCALSTORAGE_KEY = 'TRIPOD:account';

@Injectable()
export class AccountEffects {

  resetUserFromLocalStorageAndState$ = createEffect(() =>
      this.actions$.pipe(
        ofType(resetUserFromLocalStorageAndState),
        tap(() => {
          localStorage.removeItem(ACCOUNT_LOCALSTORAGE_KEY);
          this.store.dispatch(resetUser());
        })
      ),
    {
      dispatch: false,
    }
  );

  getUserFromLocalStorage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getUserFromLocalStorage),
        tap(() => {
          const userJSON: string | null = localStorage.getItem(ACCOUNT_LOCALSTORAGE_KEY);
          if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user) {
              this.store.dispatch(setUser({ user }));
            }
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  setAndSaveUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setAndSaveUser),
        tap(({user}) => {
          localStorage.setItem(ACCOUNT_LOCALSTORAGE_KEY, JSON.stringify(user));
          this.store.dispatch(setUser({ user }));
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly store: Store,
    private actions$: Actions,
  ) {}
}
