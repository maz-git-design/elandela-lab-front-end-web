import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { AppStore } from '../../../../store/app.store';
import { LoginRequest } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { User } from '../../../../core/services/user.service';

interface LoginState {
  user: User | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  loaded: false,
};

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      loginService = inject(LoginService),
      appStore = inject(AppStore)
    ) => ({
      login: rxMethod<LoginRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            loginService.login(request).pipe(
              tap((response) => {
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(response.user)
                );
                patchState(store, {
                  user: response.user,
                  loading: false,
                  loaded: true,
                });
              }),
              catchError((error) => {
                console.log('Login error:', error.message);
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message || 'Login failed');
                return of(null);
              })
            )
          )
        )
      ),

      logout: () => {
        localStorage.removeItem('currentUser');
        patchState(store, initialState);
      },
    })
  )
);
