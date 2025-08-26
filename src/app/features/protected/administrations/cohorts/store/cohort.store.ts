import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import {
  Cohort,
  CreateCohortRequest,
  UpdateCohortRequest,
} from '../models/cohort.model';
import { CohortService } from '../services/cohort.service';
import { AppStore } from '../../../../../store/app.store';

interface CohortState {
  cohorts: Cohort[];
  loading: boolean;
  loaded: boolean;
}

const initialState: CohortState = {
  cohorts: [],
  loading: false,
  loaded: false,
};

export const CohortStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeCohorts: computed(() => store.cohorts().filter((c) => c.isActive)),
  })),
  withMethods(
    (
      store,
      cohortService = inject(CohortService),
      appStore = inject(AppStore)
    ) => ({
      loadCohorts: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            cohortService.getCohorts().pipe(
              tap((cohorts) =>
                patchState(store, { cohorts, loading: false, loaded: true })
              ),
              catchError((error) => {
                patchState(store, { loading: false });
                appStore.setError(error.message);
                return of([]);
              })
            )
          )
        )
      ),

      createCohort: rxMethod<CreateCohortRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            cohortService.createCohort(request).pipe(
              tap((cohort) =>
                patchState(store, {
                  cohorts: [...store.cohorts(), cohort],
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      updateCohort: rxMethod<UpdateCohortRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            cohortService.updateCohort(request).pipe(
              tap((updatedCohort) =>
                patchState(store, {
                  cohorts: store
                    .cohorts()
                    .map((c) =>
                      c.id === updatedCohort.id ? updatedCohort : c
                    ),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false });
                appStore.setError(error.message);
                return of(null);
              })
            )
          )
        )
      ),

      deleteCohort: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            cohortService.deleteCohort(id).pipe(
              tap(() =>
                patchState(store, {
                  cohorts: store.cohorts().filter((c) => c.id !== id),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false });
                appStore.setError(error.message);
                return of(false);
              })
            )
          )
        )
      ),
    })
  )
);
