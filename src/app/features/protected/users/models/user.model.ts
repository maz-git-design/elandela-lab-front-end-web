export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  department?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
  isActive?: boolean;
}