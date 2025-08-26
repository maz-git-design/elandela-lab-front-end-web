import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  phone?: string;
  department?: string;
  studentId?: string;
  employeeId?: string;
  avatar?: string;
  faceData?: string;
  profileCompletion?: number;
  dateOfBirth?: string;
  isFirstLogin?: boolean;
  address?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Simulate getting user from localStorage or token
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateProfile(updates: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      updatedUser.profileCompletion =
        this.calculateProfileCompletion(updatedUser);
      this.setCurrentUser(updatedUser);
    }
  }

  private calculateProfileCompletion(user: User): number {
    const fields = [
      'name',
      'email',
      'phone',
      'department',
      'dateOfBirth',
      'address',
    ];
    const roleSpecificFields =
      user.role === 'student' ? ['studentId'] : ['employeeId'];
    const allFields = [...fields, ...roleSpecificFields, 'faceData'];

    const completedFields = allFields.filter(
      (field) => user[field as keyof User]
    );
    return Math.round((completedFields.length / allFields.length) * 100);
  }

  // Mock login for testing
  mockLogin(role: 'admin' | 'teacher' | 'student'): void {
    const mockUser: User = {
      id: '1',
      name:
        role === 'admin'
          ? 'Admin User'
          : role === 'teacher'
          ? 'Teacher User'
          : 'Student User',
      email: `${role}@elandela.com`,
      role: role,
      profileCompletion: 30,
    };
    this.setCurrentUser(mockUser);
  }
}
