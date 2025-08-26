import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardData } from '../models/dashboard.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpService);

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<any>('dashboard').pipe(
      map((data) => ({
        stats: {
          totalUsers: data.stats?.totalUsers || 0,
          totalLabs: data.stats?.totalLabs || 0,
          totalEquipments: data.stats?.totalEquipments || 0,
          activeReservations: data.stats?.activeReservations || 0,
        },
        recentActivities: (data.recentActivities || []).map(
          (activity: any) => ({
            id: activity._id || activity.id,
            type: activity.type,
            message: activity.message,
            timestamp: new Date(activity.timestamp),
            user: activity.user,
          })
        ),
      }))
    );
  }
}
