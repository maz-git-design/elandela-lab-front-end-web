import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UserProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UpdateAvatarRequest,
  ProfileStats,
} from '../models/profile.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpService);

  getProfile(): Observable<UserProfile> {
    return this.http.get<any>('auth/profile').pipe(
      map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.roles?.[0] || 'student',
        department: user.department,
        cohort: user.cohort,
        studentId: user.studentId,
        employeeId: user.employeeId,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
        address: user.address,
        emergencyContact: user.emergencyContact,
        emergencyPhone: user.emergencyPhone,
        isActive: user.state === 'active',
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }))
    );
  }

  updateProfile(request: UpdateProfileRequest): Observable<UserProfile> {
    return this.http.patch<any>('auth/profile', request).pipe(
      map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.roles?.[0] || 'student',
        department: user.department,
        cohort: user.cohort,
        studentId: user.studentId,
        employeeId: user.employeeId,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
        address: user.address,
        emergencyContact: user.emergencyContact,
        emergencyPhone: user.emergencyPhone,
        isActive: user.state === 'active',
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }))
    );
  }

  changePassword(request: ChangePasswordRequest): Observable<boolean> {
    return this.http
      .post<any>('auth/change-password', {
        currentPassword: request.currentPassword,
        newPassword: request.newPassword,
      })
      .pipe(map(() => true));
  }

  updateAvatar(request: UpdateAvatarRequest): Observable<UserProfile> {
    return this.http.patch<any>('auth/avatar', request).pipe(
      map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.roles?.[0] || 'student',
        department: user.department,
        cohort: user.cohort,
        studentId: user.studentId,
        employeeId: user.employeeId,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
        address: user.address,
        emergencyContact: user.emergencyContact,
        emergencyPhone: user.emergencyPhone,
        isActive: user.state === 'active',
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }))
    );
  }

  getProfileStats(): Observable<ProfileStats> {
    return this.http.get<any>('auth/profile/stats').pipe(
      map((stats) => ({
        totalSessions: stats.totalSessions || 0,
        attendanceRate: stats.attendanceRate || 0,
        equipmentUsage: stats.equipmentUsage || 0,
        lastActivity: stats.lastActivity
          ? new Date(stats.lastActivity)
          : new Date(),
      }))
    );
  }

  deactivateAccount(): Observable<boolean> {
    return this.http.patch<any>('auth/deactivate', {}).pipe(map(() => true));
  }

  exportData(): Observable<Blob> {
    return this.http.get<any>('auth/export-data').pipe(
      map((data) => {
        const jsonData = JSON.stringify(data, null, 2);
        return new Blob([jsonData], { type: 'application/json' });
      })
    );
  }
}
