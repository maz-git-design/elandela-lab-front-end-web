import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Attendance,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '../models/attendance.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpService);

  getAttendances(): Observable<Attendance[]> {
    return this.http
      .get<any[]>('attendances')
      .pipe(
        map((attendances) =>
          attendances.map((attendance) =>
            this.mapAttendanceFromBackend(attendance)
          )
        )
      );
  }

  getAttendanceById(id: string): Observable<Attendance> {
    return this.http
      .get<any>(`attendances/${id}`)
      .pipe(map((attendance) => this.mapAttendanceFromBackend(attendance)));
  }

  getAttendancesBySession(sessionId: string): Observable<Attendance[]> {
    return this.http
      .get<any[]>(`attendances/session/${sessionId}`)
      .pipe(
        map((attendances) =>
          attendances.map((attendance) =>
            this.mapAttendanceFromBackend(attendance)
          )
        )
      );
  }

  createAttendance(request: CreateAttendanceRequest): Observable<Attendance> {
    return this.http
      .post<any>('attendances', request)
      .pipe(map((attendance) => this.mapAttendanceFromBackend(attendance)));
  }

  updateAttendance(request: UpdateAttendanceRequest): Observable<Attendance> {
    return this.http
      .put<any>(`attendances/${request.id}`, request)
      .pipe(map((attendance) => this.mapAttendanceFromBackend(attendance)));
  }

  deleteAttendance(id: string): Observable<boolean> {
    return this.http.delete<any>(`attendances/${id}`).pipe(map(() => true));
  }

  private mapAttendanceFromBackend(attendance: Attendance): Attendance {
    return {
      id: attendance.id,
      userId: attendance.userId,
      userName: attendance.userName || '',
      sessionId: attendance.sessionId,
      sessionName: attendance.sessionName || '',
      labId: attendance.labId,
      labName: attendance.labName || '',
      checkIn: attendance.checkIn ? new Date(attendance.checkIn) : undefined,
      checkOut: attendance.checkOut ? new Date(attendance.checkOut) : undefined,
      duration: attendance.duration || 0,
      status: attendance.status || 'present',
      //method: attendance.method || 'manual',
      //notes: attendance.notes,
    };
  }
}
