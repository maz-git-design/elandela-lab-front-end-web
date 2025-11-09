export interface Module {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  path?: string;
  availableActions: ('Create' | 'Update' | 'List' | '*')[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateModuleRequest {
  name: string;
  description?: string;
  parentId?: string;
  path?: string;
  availableActions: ('Create' | 'Update' | 'List' | '*')[];
}

export interface UpdateModuleRequest {
  id: string;
  name?: string;
  description?: string;
  parentId?: string;
  path?: string;
  availableActions?: ('Create' | 'Update' | 'List' | '*')[];
}