export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePermissionRequest {
  name: string;
  description: string;
  module: string;
  action: string;
}

export interface UpdatePermissionRequest extends CreatePermissionRequest {
  id: string;
  isActive: boolean;
}