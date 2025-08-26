import { computed, inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import {
  FaceRegistrationRequest,
  FaceDetectionState,
} from '../models/face-registration.model';
import { FaceRegistrationService } from '../services/face-registration.service';
import { AppStore } from '../../../../store/app.store';

interface FaceRegistrationStoreState extends FaceDetectionState {
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

const initialState: FaceRegistrationStoreState = {
  loading: false,
  loaded: false,
  success: false,
  isCapturing: false,
  isMovementDetected: false,
  isPositionCorrect: false,
  currentStep: 1,
  totalSteps: 5,
  capturedSteps: [],
  finalBiometricId: '',
};

export const FaceRegistrationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      faceService = inject(FaceRegistrationService),
      appStore = inject(AppStore)
    ) => ({
      startCapture: () => patchState(store, { isCapturing: true }),

      stopCapture: () =>
        patchState(store, {
          isCapturing: false,
          isMovementDetected: false,
          isPositionCorrect: false,
        }),

      updateDetection: (
        isMovementDetected: boolean,
        isPositionCorrect: boolean
      ) => patchState(store, { isMovementDetected, isPositionCorrect }),

      captureStep: (stepData: string) => {
        const capturedSteps = [...store.capturedSteps(), stepData];
        const currentStep = store.currentStep() + 1;
        const finalBiometricId =
          currentStep > store.totalSteps()
            ? generateFinalBiometricId(capturedSteps)
            : store.finalBiometricId();

        patchState(store, {
          capturedSteps,
          currentStep: Math.min(currentStep, store.totalSteps()),
          finalBiometricId,
          isCapturing: false,
        });
      },

      registerFace: rxMethod<FaceRegistrationRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            faceService.registerFace(request).pipe(
              tap((response) => {
                const currentUser = JSON.parse(
                  localStorage.getItem('currentUser') || '{}'
                );
                const updatedUser = {
                  ...currentUser,
                  biometricId: response.biometricId,
                  faceRegistered: true,
                  registrationDate: new Date().toISOString(),
                  captureMethod: 'multi-angle',
                };
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(updatedUser)
                );

                patchState(store, {
                  loading: false,
                  loaded: true,
                  success: true,
                });
              }),
              catchError((error) => {
                patchState(store, { loading: false, loaded: true });
                appStore.setError(error.message || 'Face registration failed');
                return of(null);
              })
            )
          )
        )
      ),

      resetState: () => patchState(store, initialState),
    })
  )
);

function generateFinalBiometricId(capturedSteps: string[]): string {
  let combinedHash = 0;
  capturedSteps.forEach((stepData, index) => {
    const stepValue = parseInt(stepData);
    combinedHash =
      ((combinedHash << 2) + stepValue + (index + 1) * 100) & 0xffffffff;
  });
  return Math.abs(combinedHash).toString().padStart(16, '0').slice(0, 16);
}
