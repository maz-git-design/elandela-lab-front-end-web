import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role, CreateRoleRequest, UpdateRoleRequest } from '../models/role.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly http = inject(HttpService);

  getRoles(): Observable<Role[]> {
    return this.http.get<any[]>('roles').pipe(
      map(roles => roles.map(role => this.mapRoleFromBackend(role)))
    );
  }

  getRoleById(id: string): Observable<Role> {
    return this.http.get<any>(`roles/${id}`).pipe(
      map(role => this.mapRoleFromBackend(role))
    );
  }

  createRole(request: CreateRoleRequest): Observable<Role> {
    return this.http.post<any>('roles', request).pipe(
      map(role => this.mapRoleFromBackend(role))
    );
  }

  updateRole(request: UpdateRoleRequest): Observable<Role> {
    return this.http.put<any>(`roles/${request.id}`, request).pipe(
      map(role => this.mapRoleFromBackend(role))
    );
  }

  deleteRole(id: string): Observable<boolean> {
    return this.http.delete<any>(`roles/${id}`).pipe(
      map(() => true)
    );
  }

  private mapRoleFromBackend(role: any): Role {
    return {
      id: role._id,
      name: role.name,
      description: role.description,
      permissionsByModule: role.permissionsByModule || [],
      isActive: !role.isDeleted,
      createdAt: new Date(role.createdAt),
      updatedAt: new Date(role.updatedAt),
    };
  }
}