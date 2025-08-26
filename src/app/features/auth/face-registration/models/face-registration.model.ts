export interface FaceRegistrationRequest {
  biometricSteps: string[];
  biometricId: string;
  userId: string;
}

export interface FaceRegistrationResponse {
  success: boolean;
  biometricId: string;
  message: string;
}

export interface FaceDetectionState {
  isCapturing: boolean;
  isMovementDetected: boolean;
  isPositionCorrect: boolean;
  currentStep: number;
  totalSteps: number;
  capturedSteps: string[];
  finalBiometricId: string;
}