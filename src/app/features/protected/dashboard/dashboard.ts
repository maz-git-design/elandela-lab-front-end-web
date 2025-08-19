import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../../../core/services/user.service';
import { AdminDashboard } from './admin-dashboard';
import { TeacherDashboard } from './teacher-dashboard';
import { StudentDashboard } from './student-dashboard';

interface DashboardStats {
  totalLabs: number;
  activeUsers: number;
  totalEquipments: number;
  todayAttendance: number;
}

interface RecentActivity {
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface LabUsage {
  name: string;
  usage: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Button, RouterModule, ChartModule, AdminDashboard, TeacherDashboard, StudentDashboard],
  template: `
    <div class="w-full">
      <!-- Role Selection for Testing -->
      <div class="p-4 bg-blue-50 border-b border-blue-200" *ngIf="!currentUser">
        <p class="text-sm text-blue-800 mb-2">Sélectionnez un rôle pour tester:</p>
        <div class="flex gap-2">
          <p-button label="Admin" size="small" (onClick)="setRole('admin')"></p-button>
          <p-button label="Enseignant" size="small" (onClick)="setRole('teacher')"></p-button>
          <p-button label="Étudiant" size="small" (onClick)="setRole('student')"></p-button>
        </div>
      </div>

      <!-- Role-specific Dashboard -->
      <app-admin-dashboard *ngIf="userRole === 'admin'"></app-admin-dashboard>
      <app-teacher-dashboard *ngIf="userRole === 'teacher'"></app-teacher-dashboard>
      <app-student-dashboard *ngIf="userRole === 'student'"></app-student-dashboard>
      
      <!-- Default message if no role -->
      <div class="p-8 text-center" *ngIf="!userRole">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Bienvenue sur Elandela Lab</h2>
        <p class="text-gray-600">Veuillez vous connecter pour accéder à votre dashboard.</p>
      </div>
    </div>
  `,
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  currentUser: any = null;
  userRole: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }

  setRole(role: 'admin' | 'teacher' | 'student'): void {
    this.userService.mockLogin(role);
  }
}
