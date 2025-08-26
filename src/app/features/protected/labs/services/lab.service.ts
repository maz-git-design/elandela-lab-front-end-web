import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  Lab,
  LabSchedule,
  CreateLabRequest,
  UpdateLabRequest,
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from '../models/lab.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LabService {
  private readonly http = inject(HttpService);

  private mockSchedules: LabSchedule[] = [
    {
      id: '1',
      labId: '1',
      labName: 'Computer Lab A',
      activityId: '1',
      activityName: 'Programming Lab',
      instructorId: '1',
      instructorName: 'Dr. Smith',
      cohortId: '1',
      cohortName: 'CS-2024-A',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'scheduled',
      attendanceCount: 0,
      expectedCount: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getLabs(): Observable<Lab[]> {
    return this.http.get<any[]>('labs').pipe(
      map((labs) =>
        labs.map((lab) => ({
          id: lab._id,
          name: lab.name,
          description: lab.description,
          location: lab.location,
          capacity: lab.capacity,
          currentOccupancy: lab.currentOccupancy || 0,
          departmentId: lab.department,
          departmentName: lab.departmentName || 'Unknown',
          status: lab.status || 'available',
          equipmentCount: lab.equipmentCount || 0,
          isActive: lab.state === 'active',
          createdAt: new Date(lab.createdAt),
          updatedAt: new Date(lab.updatedAt),
        }))
      )
    );
  }

  createLab(request: CreateLabRequest): Observable<Lab> {
    return this.http
      .post<any>('labs', {
        name: request.name,
        description: request.description,
        location: request.location,
        capacity: request.capacity,
        department: request.departmentId,
      })
      .pipe(
        map((lab) => ({
          id: lab._id,
          name: lab.name,
          description: lab.description,
          location: lab.location,
          capacity: lab.capacity,
          currentOccupancy: lab.currentOccupancy || 0,
          departmentId: lab.department,
          departmentName: lab.departmentName || 'Unknown',
          status: lab.status || 'available',
          equipmentCount: lab.equipmentCount || 0,
          isActive: lab.state === 'active',
          createdAt: new Date(lab.createdAt),
          updatedAt: new Date(lab.updatedAt),
        }))
      );
  }

  updateLab(request: UpdateLabRequest): Observable<Lab> {
    return this.http.put<any>(`labs/${request.id}`, request).pipe(
      map((lab) => ({
        id: lab._id,
        name: lab.name,
        description: lab.description,
        location: lab.location,
        capacity: lab.capacity,
        currentOccupancy: lab.currentOccupancy || 0,
        departmentId: lab.department,
        departmentName: lab.departmentName || 'Unknown',
        status: lab.status || 'available',
        equipmentCount: lab.equipmentCount || 0,
        isActive: lab.state === 'active',
        createdAt: new Date(lab.createdAt),
        updatedAt: new Date(lab.updatedAt),
      }))
    );
  }

  deleteLab(id: string): Observable<boolean> {
    return this.http.delete<any>(`labs/${id}`).pipe(map(() => true));
  }

  getSchedules(): Observable<LabSchedule[]> {
    return of(this.mockSchedules).pipe(delay(500));
  }

  createSchedule(request: CreateScheduleRequest): Observable<LabSchedule> {
    const schedule: LabSchedule = {
      id: Date.now().toString(),
      ...request,
      labName: 'Lab Name',
      activityName: 'Activity Name',
      instructorName: 'Instructor Name',
      cohortName: 'Cohort Name',
      status: 'scheduled',
      attendanceCount: 0,
      expectedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mockSchedules.push(schedule);
    return of(schedule).pipe(delay(500));
  }
}
