import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Permission,
  CreatePermissionRequest,
  UpdatePermissionRequest,
} from '../models/permission.model';
import { HttpService } from '../../../../../core/services/http.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly http = inject(HttpService);

  getPermissions(): Observable<Permission[]> {
    return this.http.get<any[]>('permissions').pipe(
      map((permissions) =>
        permissions.map((permission) => ({
          id: permission._id,
          name: permission.name,
          description: permission.description,
          module: permission.module,
          action: permission.action,
          isActive: permission.state === 'active',
          createdAt: new Date(permission.createdAt),
          updatedAt: new Date(permission.updatedAt),
        }))
      )
    );
  }

  createPermission(request: CreatePermissionRequest): Observable<Permission> {
    return this.http.post<any>('permissions', request).pipe(
      map((permission) => ({
        id: permission._id,
        name: permission.name,
        description: permission.description,
        module: permission.module,
        action: permission.action,
        isActive: permission.state === 'active',
        createdAt: new Date(permission.createdAt),
        updatedAt: new Date(permission.updatedAt),
      }))
    );
  }

  updatePermission(request: UpdatePermissionRequest): Observable<Permission> {
    return this.http.put<any>(`permissions/${request.id}`, request).pipe(
      map((permission) => ({
        id: permission._id,
        name: permission.name,
        description: permission.description,
        module: permission.module,
        action: permission.action,
        isActive: permission.state === 'active',
        createdAt: new Date(permission.createdAt),
        updatedAt: new Date(permission.updatedAt),
      }))
    );
  }

  deletePermission(id: string): Observable<boolean> {
    return this.http.delete<any>(`permissions/${id}`).pipe(map(() => true));
  }
}
