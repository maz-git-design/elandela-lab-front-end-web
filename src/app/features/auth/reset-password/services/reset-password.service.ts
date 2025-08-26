import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../models/reset-password.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private readonly http = inject(HttpService);

  resetPassword(
    request: ResetPasswordRequest
  ): Observable<ResetPasswordResponse> {
    return this.http
      .post<any>('auth/reset-password', {
        email: request.email,
      })
      .pipe(
        map((response) => ({
          success: true,
          message:
            response.message ||
            'Password reset instructions sent to your email',
        }))
      );
  }
}
