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
    return this.http
      .get<any[]>('users')
      .pipe(map((users) => users.map((user) => this.mapUserFromBackend(user))));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<any>(`users/${id}`)
      .pipe(map((user) => this.mapUserFromBackend(user)));
  }

  createUser(request: CreateUserRequest): Observable<User> {
    return this.http
      .post<any>('users', request)
      .pipe(map((user) => this.mapUserFromBackend(user)));
  }

  updateUser(request: UpdateUserRequest): Observable<User> {
    return this.http
      .put<any>(`users/${request.id}`, request)
      .pipe(map((user) => this.mapUserFromBackend(user)));
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<any>(`users/${id}`).pipe(map(() => true));
  }

  private mapUserFromBackend(user: any): User {
    return {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      birthday: user.birthday ? new Date(user.birthday) : undefined,
      roles: user.roles || [],
      status: user.status || { state: 'pending', updatedAt: new Date() },
      faceFingerprint: user.faceFingerprint,
      cohortId: user.cohortId,
      identificationNumber: user.identificationNumber,
      mustSetNewPassword: user.mustSetNewPassword || false,
      fromActiveDirectory: user.fromActiveDirectory || false,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }
}
