import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '../models/user.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpService);

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>('users').pipe(
      map((users) =>
        users.map((user) => ({
          id: user._id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.roles?.[0] || 'student',
          department: user.department,
          isActive: user.state === 'active',
          createdAt: new Date(user.createdAt),
        }))
      )
    );
  }

  createUser(request: CreateUserRequest): Observable<User> {
    return this.http
      .post<any>('users', {
        firstName: request.name.split(' ')[0],
        lastName: request.name.split(' ').slice(1).join(' '),
        email: request.email,
        roles: [request.role],
        department: request.department,
      })
      .pipe(
        map((user) => ({
          id: user._id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.roles?.[0] || 'student',
          department: user.department,
          isActive: user.state === 'active',
          createdAt: new Date(user.createdAt),
        }))
      );
  }

  updateUser(request: UpdateUserRequest): Observable<User> {
    return this.http
      .put<any>(`users/${request.id}`, {
        firstName: request.name?.split(' ')[0],
        lastName: request.name?.split(' ').slice(1).join(' '),
        email: request.email,
        roles: request.role ? [request.role] : undefined,
        department: request.department,
        state: request.isActive ? 'active' : 'inactive',
      })
      .pipe(
        map((user) => ({
          id: user._id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.roles?.[0] || 'student',
          department: user.department,
          isActive: user.state === 'active',
          createdAt: new Date(user.createdAt),
        }))
      );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<any>(`users/${id}`).pipe(map(() => true));
  }
}
