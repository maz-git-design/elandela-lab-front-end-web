export interface Module {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  isActive: boolean;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

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

export interface CreateModuleRequest {
  name: string;
  description: string;
  path: string;
  icon: string;
}

export interface UpdateModuleRequest extends CreateModuleRequest {
  id: string;
  isActive: boolean;
}