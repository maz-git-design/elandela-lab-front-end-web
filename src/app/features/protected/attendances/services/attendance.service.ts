import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
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
    return this.http.get<any[]>('attendances').pipe(
      map((attendances) =>
        attendances.map((attendance) => ({
          id: attendance._id,
          userId: attendance.user,
          userName: attendance.userName || 'Unknown',
          userEmail: attendance.userEmail || 'unknown@email.com',
          sessionId: attendance.session,
          sessionName: attendance.sessionName || 'Unknown Session',
          labId: attendance.lab,
          labName: attendance.labName || 'Unknown Lab',
          checkInTime: new Date(attendance.checkInTime),
          checkOutTime: attendance.checkOutTime
            ? new Date(attendance.checkOutTime)
            : undefined,
          status: attendance.status || 'present',
          duration: attendance.duration,
          faceVerified: attendance.faceVerified || false,
          createdAt: new Date(attendance.createdAt),
          updatedAt: new Date(attendance.updatedAt),
        }))
      )
    );
  }

  createAttendance(request: CreateAttendanceRequest): Observable<Attendance> {
    return this.http
      .post<any>('attendances', {
        user: request.userId,
        session: request.sessionId,
        faceData: request.faceData,
        checkInTime: new Date(),
      })
      .pipe(
        map((attendance) => ({
          id: attendance._id,
          userId: attendance.user,
          userName: attendance.userName || 'Unknown',
          userEmail: attendance.userEmail || 'unknown@email.com',
          sessionId: attendance.session,
          sessionName: attendance.sessionName || 'Unknown Session',
          labId: attendance.lab,
          labName: attendance.labName || 'Unknown Lab',
          checkInTime: new Date(attendance.checkInTime),
          checkOutTime: attendance.checkOutTime
            ? new Date(attendance.checkOutTime)
            : undefined,
          status: attendance.status || 'present',
          duration: attendance.duration,
          faceVerified: attendance.faceVerified || false,
          createdAt: new Date(attendance.createdAt),
          updatedAt: new Date(attendance.updatedAt),
        }))
      );
  }

  updateAttendance(request: UpdateAttendanceRequest): Observable<Attendance> {
    return this.http.put<any>(`attendances/${request.id}`, request).pipe(
      map((attendance) => ({
        id: attendance._id,
        userId: attendance.user,
        userName: attendance.userName || 'Unknown',
        userEmail: attendance.userEmail || 'unknown@email.com',
        sessionId: attendance.session,
        sessionName: attendance.sessionName || 'Unknown Session',
        labId: attendance.lab,
        labName: attendance.labName || 'Unknown Lab',
        checkInTime: new Date(attendance.checkInTime),
        checkOutTime: attendance.checkOutTime
          ? new Date(attendance.checkOutTime)
          : undefined,
        status: attendance.status || 'present',
        duration: attendance.duration,
        faceVerified: attendance.faceVerified || false,
        createdAt: new Date(attendance.createdAt),
        updatedAt: new Date(attendance.updatedAt),
      }))
    );
  }

  deleteAttendance(id: string): Observable<boolean> {
    return this.http.delete<any>(`attendances/${id}`).pipe(map(() => true));
  }
}
