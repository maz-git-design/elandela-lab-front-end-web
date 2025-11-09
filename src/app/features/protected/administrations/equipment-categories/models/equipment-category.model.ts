export interface EquipmentCategory {
  id: string;
  name: string;
  description?: string;
  imagePath?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEquipmentCategoryRequest {
  name: string;
  description?: string;
  imagePath?: string;
}

export interface UpdateEquipmentCategoryRequest {
  id: string;
  name?: string;
  description?: string;
  imagePath?: string;
}