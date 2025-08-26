import { computed, inject } from '@angular/core';
import { AcademicYearStore } from '../store/academic-year.store';
import { CreateAcademicYearRequest, UpdateAcademicYearRequest } from '../models/academic-year.model';

export function useAcademicYearViewModel() {
  const store = inject(AcademicYearStore);

  return {
    academicYears: store.academicYears,
    loading: store.loading,
    loaded: store.loaded,
    activeAcademicYears: store.activeAcademicYears,
    currentAcademicYear: store.currentAcademicYear,
    academicYearsCount: computed(() => store.academicYears().length),

    loadAcademicYears: () => store.loadAcademicYears(),
    createAcademicYear: (request: CreateAcademicYearRequest) => store.createAcademicYear(request),
    updateAcademicYear: (request: UpdateAcademicYearRequest) => store.updateAcademicYear(request),
    deleteAcademicYear: (id: string) => store.deleteAcademicYear(id),
  };
}