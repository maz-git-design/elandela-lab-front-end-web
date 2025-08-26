import { computed, inject } from '@angular/core';
import { AttendanceStore } from '../store/attendance.store';

import {
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../models/attendance.model';

export function useAttendanceViewModel() {
  const store = inject(AttendanceStore);

  return {
    attendances: store.attendances,
    loading: store.loading,
    loaded: store.loaded,
    attendancesCount: computed(() => store.attendances().length),

    loadAttendances: () => store.loadAttendances(),
    createAttendance: (request: CreateAttendanceRequest) =>
      store.createAttendance(request),
    updateAttendance: (request: UpdateAttendanceRequest) =>
      store.updateAttendance(request),
    deleteAttendance: (id: string) => store.deleteAttendance(id),
  };
}
