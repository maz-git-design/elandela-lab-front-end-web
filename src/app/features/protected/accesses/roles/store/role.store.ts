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
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '../models/role.model';
import { RoleService } from '../services/role.service';
import { AppStore } from '../../../../../store/app.store';

interface RoleState {
  roles: Role[];
  loading: boolean;
  loaded: boolean;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  loaded: false,
};

export const RoleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeRoles: computed(() => store.roles().filter((role) => role.isActive)),
  })),
  withMethods(
    (
      store,
      roleService = inject(RoleService),
      appStore = inject(AppStore)
    ) => ({
      loadRoles: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            roleService.getRoles().pipe(
              tap((roles) =>
                patchState(store, { roles, loading: false, loaded: true })
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

      createRole: rxMethod<CreateRoleRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            roleService.createRole(request).pipe(
              tap((role) =>
                patchState(store, {
                  roles: [...store.roles(), role],
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

      updateRole: rxMethod<UpdateRoleRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            roleService.updateRole(request).pipe(
              tap((updatedRole) =>
                patchState(store, {
                  roles: store
                    .roles()
                    .map((role) =>
                      role.id === updatedRole.id ? updatedRole : role
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

      deleteRole: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            roleService.deleteRole(id).pipe(
              tap(() =>
                patchState(store, {
                  roles: store.roles().filter((role) => role.id !== id),
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
