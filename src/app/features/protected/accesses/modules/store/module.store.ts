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
  Module,
  CreateModuleRequest,
  UpdateModuleRequest,
} from '../models/module.model';
import { ModuleService } from '../services/module.service';
import { AppStore } from '../../../../../store/app.store';

interface ModuleState {
  modules: Module[];
  loading: boolean;
  loaded: boolean;
}

const initialState: ModuleState = {
  modules: [],
  loading: false,
  loaded: false,
};

export const ModuleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    activeModules: computed(() =>
      store.modules().filter((module) => module.isActive)
    ),
  })),
  withMethods(
    (
      store,
      moduleService = inject(ModuleService),
      appStore = inject(AppStore)
    ) => ({
      loadModules: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            moduleService.getModules().pipe(
              tap((modules) =>
                patchState(store, { modules, loading: false, loaded: true })
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

      createModule: rxMethod<CreateModuleRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            moduleService.createModule(request).pipe(
              tap((module) =>
                patchState(store, {
                  modules: [...store.modules(), module],
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

      updateModule: rxMethod<UpdateModuleRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            moduleService.updateModule(request).pipe(
              tap((updatedModule) =>
                patchState(store, {
                  modules: store
                    .modules()
                    .map((module) =>
                      module.id === updatedModule.id ? updatedModule : module
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

      deleteModule: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            moduleService.deleteModule(id).pipe(
              tap(() =>
                patchState(store, {
                  modules: store.modules().filter((module) => module.id !== id),
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
