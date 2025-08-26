export interface Cohort {
  id: string;
  name: string;
  description: string;
  academicYearId: string;
  departmentId: string;
  capacity: number;
  currentEnrollment: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCohortRequest {
  name: string;
  description: string;
  academicYearId: string;
  departmentId: string;
  capacity: number;
}

export interface UpdateCohortRequest extends CreateCohortRequest {
  id: string;
  isActive: boolean;
}