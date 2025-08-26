import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { OtpRequest } from '../models/otp.model';
import { OtpService } from '../services/otp.service';
import { AppStore } from '../../../../store/app.store';

interface OtpState {
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

const initialState: OtpState = {
  loading: false,
  loaded: false,
  success: false,
};

export const OtpStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, otpService = inject(OtpService), appStore = inject(AppStore)) => ({
      verifyOtp: rxMethod<OtpRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, success: false })),
          switchMap((request) =>
            otpService.verifyOtp(request).pipe(
              tap((response) => {
                patchState(store, {
                  loading: false,
                  loaded: true,
                  success: response.success,
                });
                if (!response.success && response.message) {
                  appStore.setError(response.message);
                }
              }),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message || 'OTP verification failed');
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
