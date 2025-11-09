export interface AcademicYear {
  id: string;
  startingYear: number;
  endingYear: number;
  status?: string;
  isActive: boolean;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAcademicYearRequest {
  startingYear: number;
  endingYear: number;
  status?: string;
}

export interface UpdateAcademicYearRequest {
  id: string;
  startingYear?: number;
  endingYear?: number;
  status?: string;
}