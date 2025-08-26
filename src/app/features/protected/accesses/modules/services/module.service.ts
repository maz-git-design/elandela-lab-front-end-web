import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Module,
  CreateModuleRequest,
  UpdateModuleRequest,
} from '../models/module.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly http = inject(HttpService);

  getModules(): Observable<Module[]> {
    return this.http.get<any[]>('modules').pipe(
      map((modules) =>
        modules.map((module) => ({
          id: module._id,
          name: module.name,
          description: module.description,
          path: module.path,
          icon: module.icon,
          isActive: module.state === 'active',
          permissions: [],
          createdAt: new Date(module.createdAt),
          updatedAt: new Date(module.updatedAt),
        }))
      )
    );
  }

  createModule(request: CreateModuleRequest): Observable<Module> {
    return this.http.post<any>('modules', request).pipe(
      map((module) => ({
        id: module._id,
        name: module.name,
        description: module.description,
        path: module.path,
        icon: module.icon,
        isActive: module.state === 'active',
        permissions: [],
        createdAt: new Date(module.createdAt),
        updatedAt: new Date(module.updatedAt),
      }))
    );
  }

  updateModule(request: UpdateModuleRequest): Observable<Module> {
    return this.http.put<any>(`modules/${request.id}`, request).pipe(
      map((module) => ({
        id: module._id,
        name: module.name,
        description: module.description,
        path: module.path,
        icon: module.icon,
        isActive: module.state === 'active',
        permissions: [],
        createdAt: new Date(module.createdAt),
        updatedAt: new Date(module.updatedAt),
      }))
    );
  }

  deleteModule(id: string): Observable<boolean> {
    return this.http.delete<any>(`modules/${id}`).pipe(map(() => true));
  }
}
