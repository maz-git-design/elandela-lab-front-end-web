import { computed, inject } from '@angular/core';
import { FaceRegistrationStore } from '../store/face-registration.store';

export function useFaceRegistrationViewModel() {
  const store = inject(FaceRegistrationStore);

  const stepInstructions = [
    'Regardez droit devant',
    'Tournez légèrement à gauche',
    'Tournez légèrement à droite', 
    'Inclinez légèrement vers le haut',
    'Inclinez légèrement vers le bas'
  ];
  
  const stepLabels = [
    'Capture frontale',
    'Capture profil gauche',
    'Capture profil droit',
    'Capture angle haut',
    'Capture angle bas'
  ];

  return {
    // State
    loading: store.loading,
    loaded: store.loaded,
    success: store.success,
    isCapturing: store.isCapturing,
    isMovementDetected: store.isMovementDetected,
    isPositionCorrect: store.isPositionCorrect,
    currentStep: store.currentStep,
    totalSteps: store.totalSteps,
    capturedSteps: store.capturedSteps,
    finalBiometricId: store.finalBiometricId,
    
    // Computed
    allStepsCompleted: computed(() => store.capturedSteps().length === store.totalSteps()),
    progressPercentage: computed(() => Math.round((store.currentStep() / store.totalSteps()) * 100)),
    currentStepLabel: computed(() => stepLabels[store.currentStep() - 1] || 'Capture faciale'),
    currentStepInstruction: computed(() => stepInstructions[store.currentStep() - 1] || 'Positionnez votre visage'),
    
    // Actions
    startCapture: store.startCapture,
    stopCapture: store.stopCapture,
    updateDetection: store.updateDetection,
    captureStep: store.captureStep,
    registerFace: store.registerFace,
    resetState: store.resetState,
  };
}