import { computed, inject } from '@angular/core';
import { EquipmentStore } from '../store/equipment.store';

import {
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
} from '../models/equipment.model';

export function useEquipmentViewModel() {
  const store = inject(EquipmentStore);

  return {
    equipments: store.equipments,
    loading: store.loading,
    loaded: store.loaded,
    equipmentsCount: computed(() => store.equipments().length),

    loadEquipments: () => store.loadEquipments(),
    createEquipment: (request: CreateEquipmentRequest) =>
      store.createEquipment(request),
    updateEquipment: (request: UpdateEquipmentRequest) =>
      store.updateEquipment(request),
    deleteEquipment: (id: string) => store.deleteEquipment(id),
  };
}
