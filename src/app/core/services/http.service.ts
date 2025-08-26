import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000';

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { 
      params: httpParams,
      withCredentials: true 
    });
  }

  post<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { 
      withCredentials: true 
    });
  }

  put<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { 
      withCredentials: true 
    });
  }

  patch<T>(endpoint: string, data?: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, { 
      withCredentials: true 
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { 
      withCredentials: true 
    });
  }
}