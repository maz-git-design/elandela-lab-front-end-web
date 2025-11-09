export interface Activity {
  id: string;
  name: string;
  description?: string;
  cohortId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActivityRequest {
  name: string;
  description?: string;
  cohortId: string;
  isActive?: boolean;
}

export interface UpdateActivityRequest {
  id: string;
  name?: string;
  description?: string;
  cohortId?: string;
  isActive?: boolean;
}