import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity, CreateActivityRequest, UpdateActivityRequest } from '../models/activity.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpService);

  getActivities(): Observable<Activity[]> {
    return this.http.get<any[]>('activities').pipe(
      map(activities => activities.map(activity => this.mapActivityFromBackend(activity)))
    );
  }

  getActivityById(id: string): Observable<Activity> {
    return this.http.get<any>(`activities/${id}`).pipe(
      map(activity => this.mapActivityFromBackend(activity))
    );
  }

  createActivity(request: CreateActivityRequest): Observable<Activity> {
    return this.http.post<any>('activities', request).pipe(
      map(activity => this.mapActivityFromBackend(activity))
    );
  }

  updateActivity(request: UpdateActivityRequest): Observable<Activity> {
    return this.http.put<any>(`activities/${request.id}`, request).pipe(
      map(activity => this.mapActivityFromBackend(activity))
    );
  }

  deleteActivity(id: string): Observable<boolean> {
    return this.http.delete<any>(`activities/${id}`).pipe(
      map(() => true)
    );
  }

  private mapActivityFromBackend(activity: any): Activity {
    return {
      id: activity._id,
      name: activity.name,
      description: activity.description,
      cohortId: activity.cohortId,
      isActive: activity.isActive !== false && !activity.isDeleted,
      createdAt: new Date(activity.createdAt),
      updatedAt: new Date(activity.updatedAt),
    };
  }
}