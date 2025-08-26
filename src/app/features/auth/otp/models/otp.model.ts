export interface OtpRequest {
  code: string;
  email: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
}