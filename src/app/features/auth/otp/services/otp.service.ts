import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OtpRequest, OtpResponse } from '../models/otp.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  private readonly http = inject(HttpService);

  verifyOtp(request: OtpRequest): Observable<OtpResponse> {
    return this.http
      .post<any>('auth/verify-otp', {
        email: request.email,
        code: request.code,
      })
      .pipe(
        map((response) => ({
          success: response.success || true,
          message: response.message || 'OTP verified successfully',
        }))
      );
  }
}
