import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import {
  Equipment,
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
} from '../models/equipment.model';
import { EquipmentService } from '../services/equipment.service';
import { AppStore } from '../../../../store/app.store';

interface EquipmentState {
  equipments: Equipment[];
  loading: boolean;
  loaded: boolean;
}

const initialState: EquipmentState = {
  equipments: [],
  loading: false,
  loaded: false,
};

export const EquipmentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      equipmentService = inject(EquipmentService),
      appStore = inject(AppStore)
    ) => ({
      loadEquipments: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            equipmentService.getEquipments().pipe(
              tap((equipments) =>
                patchState(store, { equipments, loading: false, loaded: true })
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

      createEquipment: rxMethod<CreateEquipmentRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            equipmentService.createEquipment(request).pipe(
              tap((equipment) =>
                patchState(store, {
                  equipments: [...store.equipments(), equipment],
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

      updateEquipment: rxMethod<UpdateEquipmentRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            equipmentService.updateEquipment(request).pipe(
              tap((updatedEquipment) =>
                patchState(store, {
                  equipments: store
                    .equipments()
                    .map((e) =>
                      e.id === updatedEquipment.id ? updatedEquipment : e
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

      deleteEquipment: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((id) =>
            equipmentService.deleteEquipment(id).pipe(
              tap(() =>
                patchState(store, {
                  equipments: store.equipments().filter((e) => e.id !== id),
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
