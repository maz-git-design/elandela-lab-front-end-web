import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { AppStore } from '../../../../store/app.store';
import {
  ChangePasswordRequest,
  UpdateAvatarRequest,
  UpdateProfileRequest,
  UserProfile,
} from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  loaded: false,
};

export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      profileService = inject(ProfileService),
      appStore = inject(AppStore)
    ) => ({
      loadProfile: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            profileService.getProfile().pipe(
              tap((profile) =>
                patchState(store, { profile, loading: false, loaded: true })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      updateProfile: rxMethod<UpdateProfileRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            profileService.updateProfile(request).pipe(
              tap((profile) => patchState(store, { profile, loading: false, loaded: true })),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      changePassword: rxMethod<ChangePasswordRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            profileService.changePassword(request).pipe(
              tap(() => patchState(store, { loading: false, loaded: true })),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(false);
              })
            )
          )
        )
      ),

      updateAvatar: rxMethod<UpdateAvatarRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            profileService.updateAvatar(request).pipe(
              tap((profile) => patchState(store, { profile, loading: false, loaded: true })),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),
    })
  )
);
