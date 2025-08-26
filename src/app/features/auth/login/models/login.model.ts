export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  user: User;
  success: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  isFirstLogin: boolean;
  faceData?: string;
  profileCompletion: number;
}