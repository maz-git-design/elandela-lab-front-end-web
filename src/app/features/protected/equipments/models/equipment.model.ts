export interface Equipment {
  id: string;
  name: string;
  description: string;
  serialNumber: string;
  categoryId: string;
  categoryName: string;
  labId: string;
  labName: string;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  purchaseDate: Date;
  warrantyExpiry?: Date;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export interface CreateEquipmentRequest {
  name: string;
  description: string;
  serialNumber: string;
  categoryId: string;
  labId: string;
  purchaseDate: Date;
  warrantyExpiry?: Date;
}

export interface UpdateEquipmentRequest extends CreateEquipmentRequest {
  id: string;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  isActive: boolean;
}

export interface CreateMaintenanceRequest {
  equipmentId: string;
  type: 'preventive' | 'corrective' | 'emergency';
  description: string;
  performedBy: string;
  cost?: number;
  notes?: string;
}

export interface CreateUsageRequest {
  equipmentId: string;
  userId: string;
  sessionId: string;
}