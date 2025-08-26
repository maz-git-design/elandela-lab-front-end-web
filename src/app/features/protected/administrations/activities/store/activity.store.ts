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
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
} from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { AppStore } from '../../../../../store/app.store';

interface ActivityState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ActivityState = {
  activities: [],
  loading: false,
  loaded: false,
};

export const ActivityStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeActivities: computed(() =>
      store.activities().filter((a) => a.isActive)
    ),
  })),
  withMethods(
    (
      store,
      activityService = inject(ActivityService),
      appStore = inject(AppStore)
    ) => ({
      loadActivities: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            activityService.getActivities().pipe(
              tap((activities) =>
                patchState(store, { activities, loading: false, loaded: true })
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

      createActivity: rxMethod<CreateActivityRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            activityService.createActivity(request).pipe(
              tap((activity) =>
                patchState(store, {
                  activities: [...store.activities(), activity],
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

      updateActivity: rxMethod<UpdateActivityRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            activityService.updateActivity(request).pipe(
              tap((updatedActivity) =>
                patchState(store, {
                  activities: store
                    .activities()
                    .map((a) =>
                      a.id === updatedActivity.id ? updatedActivity : a
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

      deleteActivity: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            activityService.deleteActivity(id).pipe(
              tap(() =>
                patchState(store, {
                  activities: store.activities().filter((a) => a.id !== id),
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
