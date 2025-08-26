import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SetPasswordRequest,
  SetPasswordResponse,
} from '../models/set-password.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordService {
  private readonly http = inject(HttpService);

  setPassword(request: SetPasswordRequest): Observable<SetPasswordResponse> {
    return this.http
      .post<any>('auth/set-password', {
        newPassword: request.newPassword,
        confirmPassword: request.confirmPassword,
      })
      .pipe(
        map(() => ({
          success: true,
          message: 'Password updated successfully',
        }))
      );
  }
}
