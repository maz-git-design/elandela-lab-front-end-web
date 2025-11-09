export interface Role {
  id: string;
  name: string;
  description?: string;
  permissionsByModule: {
    moduleId: string;
    permissions: string[];
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissionsByModule?: {
    moduleId: string;
    permissions: string[];
  }[];
}

export interface UpdateRoleRequest {
  id: string;
  name?: string;
  description?: string;
  permissionsByModule?: {
    moduleId: string;
    permissions: string[];
  }[];
}