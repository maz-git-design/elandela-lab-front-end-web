export interface Cohort {
  id: string;
  name: string;
  academicYear: string;
  description?: string;
  departmentId: string;
  capacity: number;
  currentEnrollment: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCohortRequest {
  name: string;
  academicYear: string;
  description?: string;
  departmentId: string;
  capacity?: number;
}

export interface UpdateCohortRequest {
  id: string;
  name?: string;
  academicYear?: string;
  description?: string;
  departmentId?: string;
  capacity?: number;
}