import { User } from '../../../../core/services/user.service';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  user: User;
  success: boolean;
}
