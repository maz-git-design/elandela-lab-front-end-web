import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Cohort,
  CreateCohortRequest,
  UpdateCohortRequest,
} from '../models/cohort.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CohortService {
  private readonly http = inject(HttpService);

  getCohorts(): Observable<Cohort[]> {
    return this.http.get<any[]>('cohorts').pipe(
      map((cohorts) =>
        cohorts.map((cohort) => ({
          id: cohort._id,
          name: cohort.name,
          description: cohort.description,
          academicYearId: cohort.academicYear,
          departmentId: cohort.department,
          capacity: cohort.capacity,
          currentEnrollment: cohort.currentEnrollment || 0,
          isActive: cohort.state === 'active',
          createdAt: new Date(cohort.createdAt),
          updatedAt: new Date(cohort.updatedAt),
        }))
      )
    );
  }

  createCohort(request: CreateCohortRequest): Observable<Cohort> {
    return this.http.post<any>('cohorts', request).pipe(
      map((cohort) => ({
        id: cohort._id,
        name: cohort.name,
        description: cohort.description,
        academicYearId: cohort.academicYear,
        departmentId: cohort.department,
        capacity: cohort.capacity,
        currentEnrollment: cohort.currentEnrollment || 0,
        isActive: cohort.state === 'active',
        createdAt: new Date(cohort.createdAt),
        updatedAt: new Date(cohort.updatedAt),
      }))
    );
  }

  updateCohort(request: UpdateCohortRequest): Observable<Cohort> {
    return this.http.put<any>(`cohorts/${request.id}`, request).pipe(
      map((cohort) => ({
        id: cohort._id,
        name: cohort.name,
        description: cohort.description,
        academicYearId: cohort.academicYear,
        departmentId: cohort.department,
        capacity: cohort.capacity,
        currentEnrollment: cohort.currentEnrollment || 0,
        isActive: cohort.state === 'active',
        createdAt: new Date(cohort.createdAt),
        updatedAt: new Date(cohort.updatedAt),
      }))
    );
  }

  deleteCohort(id: string): Observable<boolean> {
    return this.http.delete<any>(`cohorts/${id}`).pipe(map(() => true));
  }
}
