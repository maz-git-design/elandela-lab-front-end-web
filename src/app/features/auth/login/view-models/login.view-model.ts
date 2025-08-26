import { computed, inject } from '@angular/core';
import { LoginStore } from '../store/login.store';

export function useLoginViewModel() {
  const store = inject(LoginStore);

  return {
    // State
    user: store.user,
    loading: store.loading,
    loaded: store.loaded,
    
    // Computed
    isAuthenticated: computed(() => !!store.user()),
    canSubmit: computed(() => !store.loading()),
    
    // Actions
    login: store.login,
    logout: store.logout,
  };
}