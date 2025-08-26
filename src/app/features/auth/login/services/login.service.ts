import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpService);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<any>('auth/login', {
        username: request.email,
        password: request.password,
      })
      .pipe(
        map((user) => ({
          success: true,
          user: {
            id: user._id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.roles?.[0] || 'student',
            isFirstLogin: user.isFirstLogin || false,
            faceData: user.faceFingerprint,
            profileCompletion: 75,
          },
        }))
      );
  }
}
