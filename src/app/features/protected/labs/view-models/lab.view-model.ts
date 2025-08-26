import { computed, inject } from '@angular/core';
import { LabStore } from '../store/lab.store';
import { 
  CreateLabRequest, UpdateLabRequest,
  CreateScheduleRequest, UpdateScheduleRequest
} from '../models/lab.model';

export function useLabViewModel() {
  const store = inject(LabStore);

  return {
    // State
    labs: store.labs,
    schedules: store.schedules,
    loading: store.loading,
    loaded: store.loaded,

    // Computed
    activeLabs: store.activeLabs,
    availableLabs: store.availableLabs,
    occupiedLabs: store.occupiedLabs,
    maintenanceLabs: store.maintenanceLabs,
    activeSchedules: store.activeSchedules,
    todaySchedules: store.todaySchedules,
    upcomingSchedules: store.upcomingSchedules,
    
    labsCount: computed(() => store.labs().length),
    availableCount: computed(() => store.availableLabs().length),
    occupiedCount: computed(() => store.occupiedLabs().length),
    schedulesCount: computed(() => store.schedules().length),
    todaySchedulesCount: computed(() => store.todaySchedules().length),

    // Actions
    loadLabs: () => store.loadLabs(),
    createLab: (request: CreateLabRequest) => store.createLab(request),
    updateLab: (request: UpdateLabRequest) => store.updateLab(request),
    deleteLab: (id: string) => store.deleteLab(id),
    loadSchedules: () => store.loadSchedules(),
    createSchedule: (request: CreateScheduleRequest) => store.createSchedule(request),
  };
}