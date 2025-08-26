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
  AcademicYear,
  CreateAcademicYearRequest,
  UpdateAcademicYearRequest,
} from '../models/academic-year.model';
import { AcademicYearService } from '../services/academic-year.service';
import { AppStore } from '../../../../../store/app.store';

interface AcademicYearState {
  academicYears: AcademicYear[];
  loading: boolean;
  loaded: boolean;
}

const initialState: AcademicYearState = {
  academicYears: [],
  loading: false,
  loaded: false,
};

export const AcademicYearStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeAcademicYears: computed(() =>
      store.academicYears().filter((ay) => ay.isActive)
    ),
    currentAcademicYear: computed(() =>
      store.academicYears().find((ay) => ay.isCurrent)
    ),
  })),
  withMethods(
    (
      store,
      academicYearService = inject(AcademicYearService),
      appStore = inject(AppStore)
    ) => ({
      loadAcademicYears: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            academicYearService.getAcademicYears().pipe(
              tap((academicYears) =>
                patchState(store, {
                  academicYears,
                  loading: false,
                  loaded: true,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message);
                return of([]);
              })
            )
          )
        )
      ),

      createAcademicYear: rxMethod<CreateAcademicYearRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            academicYearService.createAcademicYear(request).pipe(
              tap((academicYear) =>
                patchState(store, {
                  academicYears: [...store.academicYears(), academicYear],
                  loading: false,
                })
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

      updateAcademicYear: rxMethod<UpdateAcademicYearRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            academicYearService.updateAcademicYear(request).pipe(
              tap((updatedAcademicYear) =>
                patchState(store, {
                  academicYears: store
                    .academicYears()
                    .map((ay) =>
                      ay.id === updatedAcademicYear.id
                        ? updatedAcademicYear
                        : ay
                    ),
                  loading: false,
                })
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

      deleteAcademicYear: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            academicYearService.deleteAcademicYear(id).pipe(
              tap(() =>
                patchState(store, {
                  academicYears: store
                    .academicYears()
                    .filter((ay) => ay.id !== id),
                  loading: false,
                })
              ),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
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
