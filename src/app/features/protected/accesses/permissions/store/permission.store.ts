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
  Permission,
  CreatePermissionRequest,
  UpdatePermissionRequest,
} from '../models/permission.model';
import { PermissionService } from '../services/permission.service';
import { AppStore } from '../../../../../store/app.store';

interface PermissionState {
  permissions: Permission[];
  loading: boolean;
  loaded: boolean;
}

const initialState: PermissionState = {
  permissions: [],
  loading: false,
  loaded: false,
};

export const PermissionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activePermissions: computed(() =>
      store.permissions().filter((permission) => permission.isActive)
    ),
  })),
  withMethods(
    (
      store,
      permissionService = inject(PermissionService),
      appStore = inject(AppStore)
    ) => ({
      loadPermissions: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            permissionService.getPermissions().pipe(
              tap((permissions) =>
                patchState(store, { permissions, loading: false, loaded: true })
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

      createPermission: rxMethod<CreatePermissionRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            permissionService.createPermission(request).pipe(
              tap((permission) =>
                patchState(store, {
                  permissions: [...store.permissions(), permission],
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

      updatePermission: rxMethod<UpdatePermissionRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            permissionService.updatePermission(request).pipe(
              tap((updatedPermission) =>
                patchState(store, {
                  permissions: store
                    .permissions()
                    .map((permission) =>
                      permission.id === updatedPermission.id
                        ? updatedPermission
                        : permission
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

      deletePermission: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            permissionService.deletePermission(id).pipe(
              tap(() =>
                patchState(store, {
                  permissions: store
                    .permissions()
                    .filter((permission) => permission.id !== id),
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
