export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  department?: string;
  cohort?: string;
  studentId?: string;
  employeeId?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateAvatarRequest {
  avatar: string;
}

export interface ProfileStats {
  totalSessions: number;
  attendanceRate: number;
  equipmentUsage: number;
  lastActivity: Date;
}