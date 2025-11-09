import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipment, CreateEquipmentRequest, UpdateEquipmentRequest } from '../models/equipment.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly http = inject(HttpService);

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<any[]>('equipments').pipe(
      map(equipments => equipments.map(equipment => this.mapEquipmentFromBackend(equipment)))
    );
  }

  getEquipmentById(id: string): Observable<Equipment> {
    return this.http.get<any>(`equipments/${id}`).pipe(
      map(equipment => this.mapEquipmentFromBackend(equipment))
    );
  }

  createEquipment(request: CreateEquipmentRequest): Observable<Equipment> {
    return this.http.post<any>('equipments', request).pipe(
      map(equipment => this.mapEquipmentFromBackend(equipment))
    );
  }

  updateEquipment(request: UpdateEquipmentRequest): Observable<Equipment> {
    return this.http.put<any>(`equipments/${request.id}`, request).pipe(
      map(equipment => this.mapEquipmentFromBackend(equipment))
    );
  }

  deleteEquipment(id: string): Observable<boolean> {
    return this.http.delete<any>(`equipments/${id}`).pipe(
      map(() => true)
    );
  }

  private mapEquipmentFromBackend(equipment: any): Equipment {
    return {
      id: equipment._id,
      name: equipment.name,
      code: equipment.code,
      serialNumber: equipment.serialNumber,
      imagePath: equipment.imagePath,
      categoryId: equipment.categoryId,
      model: equipment.model,
      specs: equipment.specs || [],
      usageStatus: equipment.usageStatus || [],
      currentStatus: equipment.currentStatus || { state: 'available', updatedAt: new Date(), updatedBy: '' },
      labs: equipment.labs || [],
      currentLabId: equipment.currentLabId,
      description: equipment.description,
      deliveryDate: equipment.deliveryDate ? new Date(equipment.deliveryDate) : undefined,
      entryDate: equipment.entryDate ? new Date(equipment.entryDate) : undefined,
      swapHistory: equipment.swapHistory || [],
      accessories: equipment.accessories || [],
      createdAt: new Date(equipment.createdAt),
      updatedAt: new Date(equipment.updatedAt),
    };
  }
}