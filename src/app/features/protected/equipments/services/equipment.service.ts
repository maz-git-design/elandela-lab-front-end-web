import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  Equipment,
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
} from '../models/equipment.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly http = inject(HttpService);

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<any[]>('equipments').pipe(
      map((equipments) =>
        equipments.map((equipment) => ({
          id: equipment._id,
          name: equipment.name,
          description: equipment.description,
          serialNumber: equipment.serialNumber,
          categoryId: equipment.category,
          categoryName: equipment.categoryName || 'Unknown',
          labId: equipment.lab,
          labName: equipment.labName || 'Unknown',
          status: equipment.status || 'available',
          condition: equipment.condition || 'good',
          purchaseDate: new Date(equipment.purchaseDate),
          warrantyExpiry: equipment.warrantyExpiry
            ? new Date(equipment.warrantyExpiry)
            : undefined,
          lastMaintenanceDate: equipment.lastMaintenanceDate
            ? new Date(equipment.lastMaintenanceDate)
            : undefined,
          nextMaintenanceDate: equipment.nextMaintenanceDate
            ? new Date(equipment.nextMaintenanceDate)
            : undefined,
          isActive: equipment.state === 'active',
          createdAt: new Date(equipment.createdAt),
          updatedAt: new Date(equipment.updatedAt),
        }))
      )
    );
  }

  createEquipment(request: CreateEquipmentRequest): Observable<Equipment> {
    return this.http
      .post<any>('equipments', {
        name: request.name,
        description: request.description,
        serialNumber: request.serialNumber,
        category: request.categoryId,
        lab: request.labId,
        purchaseDate: request.purchaseDate,
        warrantyExpiry: request.warrantyExpiry,
      })
      .pipe(
        map((equipment) => ({
          id: equipment._id,
          name: equipment.name,
          description: equipment.description,
          serialNumber: equipment.serialNumber,
          categoryId: equipment.category,
          categoryName: equipment.categoryName || 'Unknown',
          labId: equipment.lab,
          labName: equipment.labName || 'Unknown',
          status: equipment.status || 'available',
          condition: equipment.condition || 'good',
          purchaseDate: new Date(equipment.purchaseDate),
          warrantyExpiry: equipment.warrantyExpiry
            ? new Date(equipment.warrantyExpiry)
            : undefined,
          lastMaintenanceDate: equipment.lastMaintenanceDate
            ? new Date(equipment.lastMaintenanceDate)
            : undefined,
          nextMaintenanceDate: equipment.nextMaintenanceDate
            ? new Date(equipment.nextMaintenanceDate)
            : undefined,
          isActive: equipment.state === 'active',
          createdAt: new Date(equipment.createdAt),
          updatedAt: new Date(equipment.updatedAt),
        }))
      );
  }

  updateEquipment(request: UpdateEquipmentRequest): Observable<Equipment> {
    return this.http.put<any>(`equipments/${request.id}`, request).pipe(
      map((equipment) => ({
        id: equipment._id,
        name: equipment.name,
        description: equipment.description,
        serialNumber: equipment.serialNumber,
        categoryId: equipment.category,
        categoryName: equipment.categoryName || 'Unknown',
        labId: equipment.lab,
        labName: equipment.labName || 'Unknown',
        status: equipment.status || 'available',
        condition: equipment.condition || 'good',
        purchaseDate: new Date(equipment.purchaseDate),
        warrantyExpiry: equipment.warrantyExpiry
          ? new Date(equipment.warrantyExpiry)
          : undefined,
        lastMaintenanceDate: equipment.lastMaintenanceDate
          ? new Date(equipment.lastMaintenanceDate)
          : undefined,
        nextMaintenanceDate: equipment.nextMaintenanceDate
          ? new Date(equipment.nextMaintenanceDate)
          : undefined,
        isActive: equipment.state === 'active',
        createdAt: new Date(equipment.createdAt),
        updatedAt: new Date(equipment.updatedAt),
      }))
    );
  }

  deleteEquipment(id: string): Observable<boolean> {
    return this.http.delete<any>(`equipments/${id}`).pipe(map(() => true));
  }
}
