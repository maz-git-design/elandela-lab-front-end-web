export interface Department {
  id: string;
  name: string;
  adId?: string;
  headOfDepartment?: string;
  deputyChef?: string;
  cohorts: string[];
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDepartmentRequest {
  name: string;
  adId?: string;
  headOfDepartment?: string;
  deputyChef?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  id: string;
  name?: string;
  adId?: string;
  headOfDepartment?: string;
  deputyChef?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
}