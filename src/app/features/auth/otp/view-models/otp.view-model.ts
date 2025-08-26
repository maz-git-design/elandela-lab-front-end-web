import { computed, inject } from '@angular/core';
import { OtpStore } from '../store/otp.store';

export function useOtpViewModel() {
  const store = inject(OtpStore);

  return {
    // State
    loading: store.loading,
    loaded: store.loaded,
    success: store.success,
    
    // Computed
    canSubmit: computed(() => !store.loading()),
    
    // Actions
    verifyOtp: store.verifyOtp,
    clearState: store.clearState,
  };
}