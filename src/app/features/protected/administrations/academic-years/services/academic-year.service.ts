import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AcademicYear,
  CreateAcademicYearRequest,
  UpdateAcademicYearRequest,
} from '../models/academic-year.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AcademicYearService {
  private readonly http = inject(HttpService);

  getAcademicYears(): Observable<AcademicYear[]> {
    return this.http.get<any[]>('academic-years').pipe(
      map((years) =>
        years.map((year) => ({
          id: year._id,
          name: year.name,
          startDate: new Date(year.startDate),
          endDate: new Date(year.endDate),
          isActive: year.state === 'active',
          isCurrent: year.isCurrent || false,
          createdAt: new Date(year.createdAt),
          updatedAt: new Date(year.updatedAt),
        }))
      )
    );
  }

  createAcademicYear(
    request: CreateAcademicYearRequest
  ): Observable<AcademicYear> {
    return this.http.post<any>('academic-years', request).pipe(
      map((year) => ({
        id: year._id,
        name: year.name,
        startDate: new Date(year.startDate),
        endDate: new Date(year.endDate),
        isActive: year.state === 'active',
        isCurrent: year.isCurrent || false,
        createdAt: new Date(year.createdAt),
        updatedAt: new Date(year.updatedAt),
      }))
    );
  }

  updateAcademicYear(
    request: UpdateAcademicYearRequest
  ): Observable<AcademicYear> {
    return this.http.put<any>(`academic-years/${request.id}`, request).pipe(
      map((year) => ({
        id: year._id,
        name: year.name,
        startDate: new Date(year.startDate),
        endDate: new Date(year.endDate),
        isActive: year.state === 'active',
        isCurrent: year.isCurrent || false,
        createdAt: new Date(year.createdAt),
        updatedAt: new Date(year.updatedAt),
      }))
    );
  }

  deleteAcademicYear(id: string): Observable<boolean> {
    return this.http.delete<any>(`academic-years/${id}`).pipe(map(() => true));
  }
}
