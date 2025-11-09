import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lab, LabSchedule, CreateLabRequest, UpdateLabRequest, CreateScheduleRequest } from '../models/lab.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LabService {
  private readonly http = inject(HttpService);

  getLabs(): Observable<Lab[]> {
    return this.http.get<any[]>('labs').pipe(
      map(labs => labs.map(lab => this.mapLabFromBackend(lab)))
    );
  }

  getLabById(id: string): Observable<Lab> {
    return this.http.get<any>(`labs/${id}`).pipe(
      map(lab => this.mapLabFromBackend(lab))
    );
  }

  createLab(request: CreateLabRequest): Observable<Lab> {
    return this.http.post<any>('labs', request).pipe(
      map(lab => this.mapLabFromBackend(lab))
    );
  }

  updateLab(request: UpdateLabRequest): Observable<Lab> {
    return this.http.put<any>(`labs/${request.id}`, request).pipe(
      map(lab => this.mapLabFromBackend(lab))
    );
  }

  deleteLab(id: string): Observable<boolean> {
    return this.http.delete<any>(`labs/${id}`).pipe(
      map(() => true)
    );
  }

  getSchedules(): Observable<LabSchedule[]> {
    return this.http.get<any[]>('labs/schedules').pipe(
      map(schedules => schedules.map(schedule => this.mapScheduleFromBackend(schedule)))
    );
  }

  createSchedule(request: CreateScheduleRequest): Observable<LabSchedule> {
    return this.http.post<any>('labs/schedules', request).pipe(
      map(schedule => this.mapScheduleFromBackend(schedule))
    );
  }

  private mapLabFromBackend(lab: any): Lab {
    return {
      id: lab._id,
      name: lab.name,
      code: lab.code,
      description: lab.description,
      departmentId: lab.departmentId,
      equipmentList: lab.equipmentList || [],
      location: lab.location || { building: '', roomNumber: '', floor: 0 },
      capacities: lab.capacities || { users: 0, equipment: 0 },
      openingHours: lab.openingHours || [],
      timetable: lab.timetable || [],
      safetyRequirements: lab.safetyRequirements || [],
      accessRestrictions: lab.accessRestrictions || { allowedRoles: [], minLevel: 0 },
      managers: lab.managers || { students: [], lecturers: [], admins: [] },
      status: lab.status || 'available',
      createdAt: new Date(lab.createdAt),
      updatedAt: new Date(lab.updatedAt),
    };
  }

  private mapScheduleFromBackend(schedule: any): LabSchedule {
    return {
      id: schedule._id,
      labId: schedule.labId,
      labName: schedule.labName || '',
      activityId: schedule.activityId,
      activityName: schedule.activityName || '',
      instructorId: schedule.instructorId,
      instructorName: schedule.instructorName || '',
      cohortId: schedule.cohortId,
      cohortName: schedule.cohortName || '',
      startTime: new Date(schedule.startTime),
      endTime: new Date(schedule.endTime),
      status: schedule.status || 'scheduled',
      attendanceCount: schedule.attendanceCount || 0,
      expectedCount: schedule.expectedCount || 0,
      createdAt: new Date(schedule.createdAt),
      updatedAt: new Date(schedule.updatedAt),
    };
  }
}