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
  Lab,
  LabSchedule,
  CreateLabRequest,
  UpdateLabRequest,
  CreateScheduleRequest,
} from '../models/lab.model';
import { LabService } from '../services/lab.service';
import { AppStore } from '../../../../store/app.store';

interface LabState {
  labs: Lab[];
  schedules: LabSchedule[];
  loading: boolean;
  loaded: boolean;
}

const initialState: LabState = {
  labs: [],
  schedules: [],
  loading: false,
  loaded: false,
};

export const LabStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeLabs: computed(() => store.labs().filter((l) => true)),
    availableLabs: computed(() =>
      store.labs().filter((l) => l.status === 'available')
    ),
    occupiedLabs: computed(() =>
      store.labs().filter((l) => l.status === 'occupied')
    ),
    maintenanceLabs: computed(() =>
      store.labs().filter((l) => l.status === 'maintenance')
    ),
    activeSchedules: computed(() =>
      store.schedules().filter((s) => s.status === 'active')
    ),
    todaySchedules: computed(() => {
      const today = new Date().toDateString();
      return store
        .schedules()
        .filter((s) => new Date(s.startTime).toDateString() === today);
    }),
    upcomingSchedules: computed(() => {
      const now = new Date();
      return store
        .schedules()
        .filter((s) => new Date(s.startTime) > now && s.status === 'scheduled')
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
    }),
  })),
  withMethods(
    (store, labService = inject(LabService), appStore = inject(AppStore)) => ({
      loadLabs: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            labService.getLabs().pipe(
              tap((labs) =>
                patchState(store, { labs, loading: false, loaded: true })
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

      createLab: rxMethod<CreateLabRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            labService.createLab(request).pipe(
              tap((lab) =>
                patchState(store, {
                  labs: [...store.labs(), lab],
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

      updateLab: rxMethod<UpdateLabRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            labService.updateLab(request).pipe(
              tap((updatedLab) =>
                patchState(store, {
                  labs: store
                    .labs()
                    .map((l) => (l.id === updatedLab.id ? updatedLab : l)),
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

      deleteLab: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            labService.deleteLab(id).pipe(
              tap(() =>
                patchState(store, {
                  labs: store.labs().filter((l) => l.id !== id),
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

      loadSchedules: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            labService.getSchedules().pipe(
              tap((schedules) =>
                patchState(store, { schedules, loading: false, loaded: true })
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

      createSchedule: rxMethod<CreateScheduleRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            labService.createSchedule(request).pipe(
              tap((schedule) =>
                patchState(store, {
                  schedules: [...store.schedules(), schedule],
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
    })
  )
);
