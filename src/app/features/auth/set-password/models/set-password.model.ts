export interface SetPasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SetPasswordResponse {
  success: boolean;
  message: string;
}
