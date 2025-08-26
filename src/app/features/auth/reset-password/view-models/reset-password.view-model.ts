import { computed, inject } from '@angular/core';
import { ResetPasswordStore } from '../store/reset-password.store';

export function useResetPasswordViewModel() {
  const store = inject(ResetPasswordStore);

  return {
    // State
    loading: store.loading,
    loaded: store.loaded,
    success: store.success,
    
    // Computed
    canSubmit: computed(() => !store.loading()),
    
    // Actions
    resetPassword: store.resetPassword,
    clearState: store.clearState,
  };
}