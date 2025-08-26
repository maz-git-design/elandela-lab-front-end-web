import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
} from '../models/activity.model';
import { HttpService } from '../../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpService);

  getActivities(): Observable<Activity[]> {
    return this.http.get<any[]>('activities').pipe(
      map((activities) =>
        activities.map((activity) => ({
          id: activity._id,
          name: activity.name,
          description: activity.description,
          type: activity.type,
          duration: activity.duration,
          isActive: activity.state === 'active',
          createdAt: new Date(activity.createdAt),
          updatedAt: new Date(activity.updatedAt),
        }))
      )
    );
  }

  createActivity(request: CreateActivityRequest): Observable<Activity> {
    return this.http.post<any>('activities', request).pipe(
      map((activity) => ({
        id: activity._id,
        name: activity.name,
        description: activity.description,
        type: activity.type,
        duration: activity.duration,
        isActive: activity.state === 'active',
        createdAt: new Date(activity.createdAt),
        updatedAt: new Date(activity.updatedAt),
      }))
    );
  }

  updateActivity(request: UpdateActivityRequest): Observable<Activity> {
    return this.http.put<any>(`activities/${request.id}`, request).pipe(
      map((activity) => ({
        id: activity._id,
        name: activity.name,
        description: activity.description,
        type: activity.type,
        duration: activity.duration,
        isActive: activity.state === 'active',
        createdAt: new Date(activity.createdAt),
        updatedAt: new Date(activity.updatedAt),
      }))
    );
  }

  deleteActivity(id: string): Observable<boolean> {
    return this.http.delete<any>(`activities/${id}`).pipe(map(() => true));
  }
}
