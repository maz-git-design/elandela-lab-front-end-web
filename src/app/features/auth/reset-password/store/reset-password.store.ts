import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { ResetPasswordRequest } from '../models/reset-password.model';
import { ResetPasswordService } from '../services/reset-password.service';
import { AppStore } from '../../../../store/app.store';

interface ResetPasswordState {
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

const initialState: ResetPasswordState = {
  loading: false,
  loaded: false,
  success: false,
};

export const ResetPasswordStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      resetService = inject(ResetPasswordService),
      appStore = inject(AppStore)
    ) => ({
      resetPassword: rxMethod<ResetPasswordRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, success: false })),
          switchMap((request) =>
            resetService.resetPassword(request).pipe(
              tap((response) => {
                patchState(store, {
                  loading: false,
                  loaded: true,
                  success: response.success,
                });
              }),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message || 'Password reset failed');
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
