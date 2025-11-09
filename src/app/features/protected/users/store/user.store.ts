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
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../models/user.model';
import { UserService } from '../services/user.service';
import { AppStore } from '../../../../store/app.store';

interface UserState {
  users: User[];
  loading: boolean;
  loaded: boolean;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  loaded: false,
  selectedUser: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeUsers: computed(() => store.users().filter((u) => u.status)),
    usersByRole: computed(() => {
      const users = store.users();
      return {
        admin: users.filter((u) => true),
        teacher: users.filter((u) => false),
        student: users.filter((u) => false),
      };
    }),
  })),
  withMethods(
    (
      store,
      userService = inject(UserService),
      appStore = inject(AppStore)
    ) => ({
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            userService.getUsers().pipe(
              tap((users) =>
                patchState(store, { users, loading: false, loaded: true })
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

      createUser: rxMethod<CreateUserRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            userService.createUser(request).pipe(
              tap((user) =>
                patchState(store, {
                  users: [...store.users(), user],
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

      updateUser: rxMethod<UpdateUserRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            userService.updateUser(request).pipe(
              tap((updatedUser) =>
                patchState(store, {
                  users: store
                    .users()
                    .map((u) => (u.id === updatedUser.id ? updatedUser : u)),
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

      deleteUser: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            userService.deleteUser(id).pipe(
              tap(() =>
                patchState(store, {
                  users: store.users().filter((u) => u.id !== id),
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

      selectUser: (user: User | null) =>
        patchState(store, { selectedUser: user }),
    })
  )
);
