import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  forgotPassword(email: string): Observable<any> {
    // Simulate API call
    return of({ success: true });
  }

  resetPassword(token: string, password: string): Observable<any> {
    // Simulate API call
    return of({ success: true });
  }

  setPassword(password: string): Observable<any> {
    // Simulate API call
    return of({ success: true });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}