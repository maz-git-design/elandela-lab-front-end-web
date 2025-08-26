import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { SetPasswordRequest } from '../models/set-password.model';
import { SetPasswordService } from '../services/set-password.service';
import { AppStore } from '../../../../store/app.store';

interface SetPasswordState {
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

const initialState: SetPasswordState = {
  loading: false,
  loaded: false,
  success: false,
};

export const SetPasswordStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      setPasswordService = inject(SetPasswordService),
      appStore = inject(AppStore)
    ) => ({
      setPassword: rxMethod<SetPasswordRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, success: false })),
          switchMap((request) =>
            setPasswordService.setPassword(request).pipe(
              tap((response) => {
                const currentUser = JSON.parse(
                  localStorage.getItem('currentUser') || '{}'
                );
                const updatedUser = {
                  ...currentUser,
                  isFirstLogin: false,
                  passwordReset: false,
                  hasPassword: true,
                };
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(updatedUser)
                );

                patchState(store, {
                  loading: false,
                  loaded: true,
                  success: true,
                });
              }),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      clearState: () => patchState(store, initialState),
    })
  )
);
