import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { AppStore } from '../../../../store/app.store';
import { DashboardData } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  loaded: false,
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      dashboardService = inject(DashboardService),
      appStore = inject(AppStore)
    ) => ({
      loadDashboard: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            dashboardService.getDashboardData().pipe(
              tap((data) => patchState(store, { data, loading: false, loaded: true })),
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
