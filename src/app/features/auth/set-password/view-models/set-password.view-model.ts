import { computed, inject } from '@angular/core';
import { SetPasswordStore } from '../store/set-password.store';

export function useSetPasswordViewModel() {
  const store = inject(SetPasswordStore);

  return {
    // State
    loading: store.loading,
    loaded: store.loaded,
    success: store.success,
    
    // Computed
    canSubmit: computed(() => !store.loading()),
    
    // Actions
    setPassword: store.setPassword,
    clearState: store.clearState,
  };
}