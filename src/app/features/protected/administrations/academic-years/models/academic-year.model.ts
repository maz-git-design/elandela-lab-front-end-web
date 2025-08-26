export interface AcademicYear {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAcademicYearRequest {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateAcademicYearRequest extends CreateAcademicYearRequest {
  id: string;
  isActive: boolean;
  isCurrent: boolean;
}