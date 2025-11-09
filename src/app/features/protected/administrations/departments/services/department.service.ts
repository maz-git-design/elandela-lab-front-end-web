import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from '../models/department.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly http = inject(HttpService);

  getDepartments(): Observable<Department[]> {
    return this.http.get<any[]>('departments').pipe(
      map(departments => departments.map(department => this.mapDepartmentFromBackend(department)))
    );
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.http.get<any>(`departments/${id}`).pipe(
      map(department => this.mapDepartmentFromBackend(department))
    );
  }

  createDepartment(request: CreateDepartmentRequest): Observable<Department> {
    return this.http.post<any>('departments', request).pipe(
      map(department => this.mapDepartmentFromBackend(department))
    );
  }

  updateDepartment(request: UpdateDepartmentRequest): Observable<Department> {
    return this.http.put<any>(`departments/${request.id}`, request).pipe(
      map(department => this.mapDepartmentFromBackend(department))
    );
  }

  deleteDepartment(id: string): Observable<boolean> {
    return this.http.delete<any>(`departments/${id}`).pipe(
      map(() => true)
    );
  }

  private mapDepartmentFromBackend(department: any): Department {
    return {
      id: department._id,
      name: department.name,
      adId: department.adId,
      headOfDepartment: department.headOfDepartment,
      deputyChef: department.deputyChef,
      cohorts: department.cohorts || [],
      contactEmail: department.contactEmail,
      contactPhone: department.contactPhone,
      description: department.description,
      isActive: !department.isDeleted,
      createdAt: new Date(department.createdAt),
      updatedAt: new Date(department.updatedAt),
    };
  }
}