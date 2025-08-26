import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface AppState {
  error: string | null;
  isOnline: boolean;
}

const initialState: AppState = {
  error: null,
  isOnline: navigator.onLine,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setError: (error: string) => patchState(store, { error }),
    clearError: () => patchState(store, { error: null }),
    setOnlineStatus: (isOnline: boolean) => patchState(store, { isOnline }),
  }))
);