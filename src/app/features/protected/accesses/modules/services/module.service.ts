import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Module, CreateModuleRequest, UpdateModuleRequest } from '../models/module.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly http = inject(HttpService);

  getModules(): Observable<Module[]> {
    return this.http.get<any[]>('modules').pipe(
      map(modules => modules.map(module => this.mapModuleFromBackend(module)))
    );
  }

  getModuleById(id: string): Observable<Module> {
    return this.http.get<any>(`modules/${id}`).pipe(
      map(module => this.mapModuleFromBackend(module))
    );
  }

  createModule(request: CreateModuleRequest): Observable<Module> {
    return this.http.post<any>('modules', request).pipe(
      map(module => this.mapModuleFromBackend(module))
    );
  }

  updateModule(request: UpdateModuleRequest): Observable<Module> {
    return this.http.put<any>(`modules/${request.id}`, request).pipe(
      map(module => this.mapModuleFromBackend(module))
    );
  }

  deleteModule(id: string): Observable<boolean> {
    return this.http.delete<any>(`modules/${id}`).pipe(
      map(() => true)
    );
  }

  private mapModuleFromBackend(module: any): Module {
    return {
      id: module._id,
      name: module.name,
      description: module.description,
      parentId: module.parentId,
      path: module.path,
      availableActions: module.availableActions || [],
      isActive: !module.isDeleted,
      createdAt: new Date(module.createdAt),
      updatedAt: new Date(module.updatedAt),
    };
  }
}