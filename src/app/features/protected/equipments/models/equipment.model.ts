export interface Equipment {
  id: string;
  name: string;
  code: string;
  serialNumber?: string;
  imagePath?: string;
  categoryId: string;
  model?: string;
  specs: {
    name: string;
    description: string;
  }[];
  usageStatus: {
    state: string;
    updatedAt: Date;
    updatedBy: string;
    isExpirable: boolean;
    expireDate?: Date;
  }[];
  currentStatus: {
    state: string;
    updatedAt: Date;
    updatedBy: string;
  };
  labs: {
    labId: string;
    createdAt: Date;
  }[];
  currentLabId?: string;
  description?: string;
  deliveryDate?: Date;
  entryDate?: Date;
  swapHistory: {
    initiatedBy: string;
    swapStatus: string;
    approvedBy?: string;
    swappingDate: Date;
  }[];
  accessories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEquipmentRequest {
  name: string;
  code: string;
  serialNumber?: string;
  imagePath?: string;
  categoryId: string;
  model?: string;
  specs?: {
    name: string;
    description: string;
  }[];
  currentLabId?: string;
  description?: string;
  deliveryDate?: Date;
  entryDate?: Date;
  accessories?: string[];
}

export interface UpdateEquipmentRequest {
  id: string;
  name?: string;
  code?: string;
  serialNumber?: string;
  imagePath?: string;
  categoryId?: string;
  model?: string;
  specs?: {
    name: string;
    description: string;
  }[];
  currentLabId?: string;
  description?: string;
  deliveryDate?: Date;
  entryDate?: Date;
  accessories?: string[];
}

export interface EquipmentMaintenance {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  description: string;
  performedBy: string;
  performedDate: Date;
  cost?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMaintenanceRequest {
  equipmentId: string;
  type: 'preventive' | 'corrective' | 'emergency';
  description: string;
  performedBy: string;
  cost?: number;
  notes?: string;
}

export interface EquipmentUsage {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userId: string;
  userName: string;
  sessionId: string;
  sessionName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUsageRequest {
  equipmentId: string;
  userId: string;
  sessionId: string;
}