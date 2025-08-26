import { computed, inject } from '@angular/core';
import { ActivityStore } from '../store/activity.store';
import { CreateActivityRequest, UpdateActivityRequest } from '../models/activity.model';

export function useActivityViewModel() {
  const store = inject(ActivityStore);

  return {
    activities: store.activities,
    loading: store.loading,
    loaded: store.loaded,
    activeActivities: store.activeActivities,
    activitiesCount: computed(() => store.activities().length),

    loadActivities: () => store.loadActivities(),
    createActivity: (request: CreateActivityRequest) => store.createActivity(request),
    updateActivity: (request: UpdateActivityRequest) => store.updateActivity(request),
    deleteActivity: (id: string) => store.deleteActivity(id),
  };
}