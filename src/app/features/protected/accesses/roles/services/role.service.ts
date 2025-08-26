import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '../models/role.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly http = inject(HttpService);

  getRoles(): Observable<Role[]> {
    return this.http.get<any[]>('roles').pipe(
      map((roles) =>
        roles.map((role) => ({
          id: role._id,
          name: role.name,
          description: role.description,
          permissions: role.permissions || [],
          isActive: role.state === 'active',
          createdAt: new Date(role.createdAt),
          updatedAt: new Date(role.updatedAt),
        }))
      )
    );
  }

  createRole(request: CreateRoleRequest): Observable<Role> {
    return this.http.post<any>('roles', request).pipe(
      map((role) => ({
        id: role._id,
        name: role.name,
        description: role.description,
        permissions: role.permissions || [],
        isActive: role.state === 'active',
        createdAt: new Date(role.createdAt),
        updatedAt: new Date(role.updatedAt),
      }))
    );
  }

  updateRole(request: UpdateRoleRequest): Observable<Role> {
    return this.http.put<any>(`roles/${request.id}`, request).pipe(
      map((role) => ({
        id: role._id,
        name: role.name,
        description: role.description,
        permissions: role.permissions || [],
        isActive: role.state === 'active',
        createdAt: new Date(role.createdAt),
        updatedAt: new Date(role.updatedAt),
      }))
    );
  }

  deleteRole(id: string): Observable<boolean> {
    return this.http.delete<any>(`roles/${id}`).pipe(map(() => true));
  }
}
