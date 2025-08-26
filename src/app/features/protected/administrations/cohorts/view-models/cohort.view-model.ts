import { computed, inject } from '@angular/core';
import { CohortStore } from '../store/cohort.store';
import { CreateCohortRequest, UpdateCohortRequest } from '../models/cohort.model';

export function useCohortViewModel() {
  const store = inject(CohortStore);

  return {
    cohorts: store.cohorts,
    loading: store.loading,
    loaded: store.loaded,
    activeCohorts: store.activeCohorts,
    cohortsCount: computed(() => store.cohorts().length),

    loadCohorts: () => store.loadCohorts(),
    createCohort: (request: CreateCohortRequest) => store.createCohort(request),
    updateCohort: (request: UpdateCohortRequest) => store.updateCohort(request),
    deleteCohort: (id: string) => store.deleteCohort(id),
  };
}