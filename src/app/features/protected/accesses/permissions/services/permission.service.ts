import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission, CreatePermissionRequest, UpdatePermissionRequest } from '../models/permission.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly http = inject(HttpService);

  getPermissions(): Observable<Permission[]> {
    return this.http.get<any[]>('permissions').pipe(
      map(permissions => permissions.map(permission => this.mapPermissionFromBackend(permission)))
    );
  }

  getPermissionById(id: string): Observable<Permission> {
    return this.http.get<any>(`permissions/${id}`).pipe(
      map(permission => this.mapPermissionFromBackend(permission))
    );
  }

  createPermission(request: CreatePermissionRequest): Observable<Permission> {
    return this.http.post<any>('permissions', request).pipe(
      map(permission => this.mapPermissionFromBackend(permission))
    );
  }

  updatePermission(request: UpdatePermissionRequest): Observable<Permission> {
    return this.http.put<any>(`permissions/${request.id}`, request).pipe(
      map(permission => this.mapPermissionFromBackend(permission))
    );
  }

  deletePermission(id: string): Observable<boolean> {
    return this.http.delete<any>(`permissions/${id}`).pipe(
      map(() => true)
    );
  }

  private mapPermissionFromBackend(permission: any): Permission {
    return {
      id: permission._id,
      name: permission.name,
      description: permission.description,
      actions: permission.actions || [],
      isActive: !permission.isDeleted,
      createdAt: new Date(permission.createdAt),
      updatedAt: new Date(permission.updatedAt),
    };
  }
}