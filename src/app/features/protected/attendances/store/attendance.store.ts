import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import {
  Attendance,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../models/attendance.model';
import { AttendanceService } from '../services/attendance.service';
import { AppStore } from '../../../../store/app.store';

interface AttendanceState {
  attendances: Attendance[];
  loading: boolean;
  loaded: boolean;
}

const initialState: AttendanceState = {
  attendances: [],
  loading: false,
  loaded: false,
};

export const AttendanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      attendanceService = inject(AttendanceService),
      appStore = inject(AppStore)
    ) => ({
      loadAttendances: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            attendanceService.getAttendances().pipe(
              tap((attendances) =>
                patchState(store, { attendances, loading: false, loaded: true })
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

      createAttendance: rxMethod<CreateAttendanceRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            attendanceService.createAttendance(request).pipe(
              tap((attendance) =>
                patchState(store, {
                  attendances: [...store.attendances(), attendance],
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

      updateAttendance: rxMethod<UpdateAttendanceRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            attendanceService.updateAttendance(request).pipe(
              tap((updatedAttendance) =>
                patchState(store, {
                  attendances: store
                    .attendances()
                    .map((a) =>
                      a.id === updatedAttendance.id ? updatedAttendance : a
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

      deleteAttendance: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            attendanceService.deleteAttendance(id).pipe(
              tap(() =>
                patchState(store, {
                  attendances: store.attendances().filter((a) => a.id !== id),
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
