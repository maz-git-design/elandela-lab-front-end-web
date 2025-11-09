import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcademicYear, CreateAcademicYearRequest, UpdateAcademicYearRequest } from '../models/academic-year.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AcademicYearService {
  private readonly http = inject(HttpService);

  getAcademicYears(): Observable<AcademicYear[]> {
    return this.http.get<any[]>('academic-years').pipe(
      map(years => years.map(year => this.mapAcademicYearFromBackend(year)))
    );
  }

  getAcademicYearById(id: string): Observable<AcademicYear> {
    return this.http.get<any>(`academic-years/${id}`).pipe(
      map(year => this.mapAcademicYearFromBackend(year))
    );
  }

  createAcademicYear(request: CreateAcademicYearRequest): Observable<AcademicYear> {
    return this.http.post<any>('academic-years', request).pipe(
      map(year => this.mapAcademicYearFromBackend(year))
    );
  }

  updateAcademicYear(request: UpdateAcademicYearRequest): Observable<AcademicYear> {
    return this.http.put<any>(`academic-years/${request.id}`, request).pipe(
      map(year => this.mapAcademicYearFromBackend(year))
    );
  }

  deleteAcademicYear(id: string): Observable<boolean> {
    return this.http.delete<any>(`academic-years/${id}`).pipe(
      map(() => true)
    );
  }

  private mapAcademicYearFromBackend(year: any): AcademicYear {
    const currentYear = new Date().getFullYear();
    return {
      id: year._id,
      startingYear: year.startingYear,
      endingYear: year.endingYear,
      status: year.status,
      isActive: !year.isDeleted,
      isCurrent: year.startingYear <= currentYear && year.endingYear >= currentYear,
      createdAt: new Date(year.createdAt),
      updatedAt: new Date(year.updatedAt),
    };
  }
}