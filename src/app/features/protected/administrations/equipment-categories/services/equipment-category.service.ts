import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EquipmentCategory, CreateEquipmentCategoryRequest, UpdateEquipmentCategoryRequest } from '../models/equipment-category.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentCategoryService {
  private readonly http = inject(HttpService);

  getEquipmentCategories(): Observable<EquipmentCategory[]> {
    return this.http.get<any[]>('equipment-categories').pipe(
      map(categories => categories.map(category => this.mapEquipmentCategoryFromBackend(category)))
    );
  }

  getEquipmentCategoryById(id: string): Observable<EquipmentCategory> {
    return this.http.get<any>(`equipment-categories/${id}`).pipe(
      map(category => this.mapEquipmentCategoryFromBackend(category))
    );
  }

  createEquipmentCategory(request: CreateEquipmentCategoryRequest): Observable<EquipmentCategory> {
    return this.http.post<any>('equipment-categories', request).pipe(
      map(category => this.mapEquipmentCategoryFromBackend(category))
    );
  }

  updateEquipmentCategory(request: UpdateEquipmentCategoryRequest): Observable<EquipmentCategory> {
    return this.http.put<any>(`equipment-categories/${request.id}`, request).pipe(
      map(category => this.mapEquipmentCategoryFromBackend(category))
    );
  }

  deleteEquipmentCategory(id: string): Observable<boolean> {
    return this.http.delete<any>(`equipment-categories/${id}`).pipe(
      map(() => true)
    );
  }

  private mapEquipmentCategoryFromBackend(category: any): EquipmentCategory {
    return {
      id: category._id,
      name: category.name,
      description: category.description,
      imagePath: category.imagePath,
      isActive: !category.isDeleted,
      createdAt: new Date(category.createdAt),
      updatedAt: new Date(category.updatedAt),
    };
  }
}