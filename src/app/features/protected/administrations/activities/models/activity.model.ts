export interface Activity {
  id: string;
  name: string;
  description: string;
  type: 'lab' | 'lecture' | 'exam' | 'project';
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActivityRequest {
  name: string;
  description: string;
  type: 'lab' | 'lecture' | 'exam' | 'project';
  duration: number;
}

export interface UpdateActivityRequest extends CreateActivityRequest {
  id: string;
  isActive: boolean;
}