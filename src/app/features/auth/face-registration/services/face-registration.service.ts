import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FaceRegistrationRequest,
  FaceRegistrationResponse,
} from '../models/face-registration.model';
import { HttpService } from '../../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class FaceRegistrationService {
  private readonly http = inject(HttpService);

  registerFace(
    request: FaceRegistrationRequest
  ): Observable<FaceRegistrationResponse> {
    return this.http
      .post<any>('users/face-fingerprint', {
        faceData: request.biometricId,
        userId: request.userId,
      })
      .pipe(
        map((response) => ({
          success: true,
          biometricId: response.faceId || request.biometricId,
          message: 'Face registration completed successfully',
        }))
      );
  }
}
