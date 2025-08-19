import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [CommonModule, Button, RouterModule, ChartModule, TableModule, ButtonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen w-full">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Dashboard Enseignant</h1>
        <p class="text-gray-600">Gestion de mes cours et étudiants</p>
      </div>

      <!-- Teacher Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Mes Étudiants</p>
              <p class="text-3xl font-bold text-gray-900">{{ myStudents }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Cours Actifs</p>
              <p class="text-3xl font-bold text-gray-900">{{ activeCourses }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <i class="fas fa-book text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Labs Supervisés</p>
              <p class="text-3xl font-bold text-gray-900">{{ supervisedLabs }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <i class="fas fa-flask text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Présences Aujourd'hui</p>
              <p class="text-3xl font-bold text-gray-900">{{ todayAttendance }}</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <i class="fas fa-user-check text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Course Management -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Présences Étudiants</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="doughnut" [data]="attendanceData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Performance des Cours</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="bar" [data]="performanceData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Schedule and Lab Usage -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Mes Prochains Cours</h3>
            <div class="flex gap-2">
              <p-button 
                icon="fas fa-th-large" 
                [outlined]="coursesViewMode !== 'card'" 
                size="small" 
                (onClick)="coursesViewMode = 'card'"
                pTooltip="Vue carte">
              </p-button>
              <p-button 
                icon="fas fa-table" 
                [outlined]="coursesViewMode !== 'table'" 
                size="small" 
                (onClick)="coursesViewMode = 'table'"
                pTooltip="Vue tableau">
              </p-button>
            </div>
          </div>
          <div class="p-6">
            <!-- Card View -->
            <div *ngIf="coursesViewMode === 'card'" class="space-y-4">
              <div *ngFor="let course of upcomingCourses" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ course.name }}</p>
                  <p class="text-sm text-gray-600">{{ course.time }}</p>
                  <p class="text-xs text-gray-500">{{ course.lab }}</p>
                </div>
                <div class="text-right">
                  <span class="text-sm text-blue-600">{{ course.students }} étudiants</span>
                  <p class="text-xs text-gray-500">{{ course.duration }}</p>
                </div>
              </div>
            </div>
            <!-- Table View -->
            <div *ngIf="coursesViewMode === 'table'">
              <p-table [value]="upcomingCourses" [tableStyle]="{'min-width': '100%'}">
                <ng-template pTemplate="header">
                  <tr>
                    <th>Cours</th>
                    <th>Horaire</th>
                    <th>Laboratoire</th>
                    <th>Durée</th>
                    <th>Étudiants</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-course>
                  <tr>
                    <td class="font-medium">{{ course.name }}</td>
                    <td>{{ course.time }}</td>
                    <td>{{ course.lab }}</td>
                    <td>{{ course.duration }}</td>
                    <td><span class="text-blue-600">{{ course.students }}</span></td>
                  </tr>
                </ng-template>
              </p-table>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Utilisation de mes Labs</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div *ngFor="let lab of myLabUsage" class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-700">{{ lab.name }}</span>
                  <span class="text-sm font-semibold text-gray-900">{{ lab.usage }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300" 
                       [style.width.%]="lab.usage" 
                       [style.background-color]="lab.color"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Performance and Recent Activities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Top Étudiants</h3>
            <div class="flex gap-2">
              <p-button 
                icon="fas fa-th-large" 
                [outlined]="studentsViewMode !== 'card'" 
                size="small" 
                (onClick)="studentsViewMode = 'card'"
                pTooltip="Vue carte">
              </p-button>
              <p-button 
                icon="fas fa-table" 
                [outlined]="studentsViewMode !== 'table'" 
                size="small" 
                (onClick)="studentsViewMode = 'table'"
                pTooltip="Vue tableau">
              </p-button>
            </div>
          </div>
          <div class="p-6">
            <!-- Card View -->
            <div *ngIf="studentsViewMode === 'card'" class="space-y-3">
              <div *ngFor="let student of topStudents; let i = index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    {{ i + 1 }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ student.name }}</p>
                    <p class="text-sm text-gray-600">{{ student.course }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-green-600">{{ student.score }}%</p>
                  <p class="text-xs text-gray-500">{{ student.attendance }}% présence</p>
                </div>
              </div>
            </div>
            <!-- Table View -->
            <div *ngIf="studentsViewMode === 'table'">
              <p-table [value]="topStudents" [tableStyle]="{'min-width': '100%'}">
                <ng-template pTemplate="header">
                  <tr>
                    <th>Rang</th>
                    <th>Nom</th>
                    <th>Cours</th>
                    <th>Score</th>
                    <th>Présence</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-student let-i="rowIndex">
                  <tr>
                    <td>
                      <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                        {{ i + 1 }}
                      </div>
                    </td>
                    <td class="font-medium">{{ student.name }}</td>
                    <td>{{ student.course }}</td>
                    <td><span class="font-semibold text-green-600">{{ student.score }}%</span></td>
                    <td>{{ student.attendance }}%</td>
                  </tr>
                </ng-template>
              </p-table>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Activités Récentes</h3>
            <div class="flex gap-2">
              <p-button 
                icon="fas fa-th-large" 
                [outlined]="activitiesViewMode !== 'card'" 
                size="small" 
                (onClick)="activitiesViewMode = 'card'"
                pTooltip="Vue carte">
              </p-button>
              <p-button 
                icon="fas fa-table" 
                [outlined]="activitiesViewMode !== 'table'" 
                size="small" 
                (onClick)="activitiesViewMode = 'table'"
                pTooltip="Vue tableau">
              </p-button>
            </div>
          </div>
          <div class="p-6">
            <!-- Card View -->
            <div *ngIf="activitiesViewMode === 'card'" class="space-y-4">
              <div *ngFor="let activity of recentActivities" class="flex gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" 
                     [style.background-color]="activity.color">
                  <i [class]="activity.icon"></i>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-xs text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                </div>
              </div>
            </div>
            <!-- Table View -->
            <div *ngIf="activitiesViewMode === 'table'">
              <p-table [value]="recentActivities" [tableStyle]="{'min-width': '100%'}">
                <ng-template pTemplate="header">
                  <tr>
                    <th>Type</th>
                    <th>Activité</th>
                    <th>Description</th>
                    <th>Heure</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-activity>
                  <tr>
                    <td>
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" 
                           [style.background-color]="activity.color">
                        <i [class]="activity.icon"></i>
                      </div>
                    </td>
                    <td class="font-medium">{{ activity.title }}</td>
                    <td>{{ activity.description }}</td>
                    <td class="text-gray-500">{{ activity.time }}</td>
                  </tr>
                </ng-template>
              </p-table>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actions Rapides</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <p-button 
              label="Prendre Présences" 
              icon="fas fa-check" 
              styleClass="w-full p-button-outlined"
            ></p-button>
            <p-button 
              label="Planifier Cours" 
              icon="fas fa-calendar-plus" 
              styleClass="w-full p-button-outlined"
            ></p-button>
            <p-button 
              label="Gérer Étudiants" 
              icon="fas fa-users-cog" 
              styleClass="w-full p-button-outlined"
            ></p-button>
            <p-button 
              label="Réserver Lab" 
              icon="fas fa-flask" 
              styleClass="w-full p-button-outlined"
            ></p-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TeacherDashboard implements OnInit {
  myStudents = 45;
  activeCourses = 6;
  supervisedLabs = 3;
  todayAttendance = 38;

  attendanceData: any;
  performanceData: any;
  chartOptions: any;

  // View mode toggles
  coursesViewMode: 'card' | 'table' = 'card';
  studentsViewMode: 'card' | 'table' = 'card';
  activitiesViewMode: 'card' | 'table' = 'card';

  upcomingCourses = [
    { name: 'Chimie Organique', time: 'Demain 9h00', students: 15, lab: 'Lab A', duration: '2h' },
    { name: 'Lab Physique', time: 'Demain 14h00', students: 12, lab: 'Lab B', duration: '3h' },
    { name: 'Biologie Moléculaire', time: 'Vendredi 10h00', students: 18, lab: 'Lab C', duration: '2h30' },
    { name: 'Chimie Analytique', time: 'Lundi 8h00', students: 20, lab: 'Lab A', duration: '4h' }
  ];

  myLabUsage = [
    { name: 'Lab Chimie A', usage: 85, color: '#3B82F6' },
    { name: 'Lab Physique B', usage: 72, color: '#10B981' },
    { name: 'Lab Biologie C', usage: 68, color: '#F59E0B' },
    { name: 'Lab Général D', usage: 45, color: '#8B5CF6' }
  ];

  topStudents = [
    { name: 'Marie Dubois', course: 'Chimie Organique', score: 95, attendance: 98 },
    { name: 'Jean Martin', course: 'Physique', score: 92, attendance: 95 },
    { name: 'Sophie Laurent', course: 'Biologie', score: 89, attendance: 92 },
    { name: 'Pierre Durand', course: 'Chimie Analytique', score: 87, attendance: 90 }
  ];

  recentActivities = [
    { title: 'Présences prises', description: 'Cours de Chimie Organique - 15 étudiants', time: 'Il y a 2h', icon: 'fas fa-check', color: '#10B981' },
    { title: 'Nouveau cours planifié', description: 'Lab Physique pour vendredi', time: 'Il y a 4h', icon: 'fas fa-calendar-plus', color: '#3B82F6' },
    { title: 'Évaluation créée', description: 'Test de Biologie Moléculaire', time: 'Hier', icon: 'fas fa-file-alt', color: '#F59E0B' },
    { title: 'Lab réservé', description: 'Lab A pour lundi matin', time: 'Hier', icon: 'fas fa-flask', color: '#8B5CF6' }
  ];

  ngOnInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.attendanceData = {
      labels: ['Présent', 'Absent', 'En retard'],
      datasets: [{
        data: [75, 15, 10],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B']
      }]
    };

    this.performanceData = {
      labels: ['Chimie', 'Physique', 'Biologie', 'Analytique'],
      datasets: [{
        label: 'Moyenne de classe (%)',
        data: [85, 78, 82, 79],
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 1
      }]
    };

    this.chartOptions = {
      plugins: { legend: { position: 'bottom' } },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    };
  }
}