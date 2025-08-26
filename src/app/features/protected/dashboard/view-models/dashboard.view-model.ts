import { computed, inject } from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';

export function useDashboardViewModel() {
  const store = inject(DashboardStore);

  return {
    // State
    data: store.data,
    loading: store.loading,
    loaded: store.loaded,
    
    // Computed
    stats: computed(() => store.data()?.stats || null),
    recentActivities: computed(() => store.data()?.recentActivities || []),
    hasData: computed(() => !!store.data()),
    
    // Actions
    loadDashboard: store.loadDashboard,
    clearState: store.clearState,
  };
}