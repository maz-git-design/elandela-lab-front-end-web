import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, Button, RouterModule, ChartModule, TableModule, ButtonModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen w-full">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
        <p class="text-gray-600">Vue d'ensemble complète du système</p>
      </div>

      <!-- Admin Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Laboratoires</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalLabs }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="fas fa-flask text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
              <p class="text-3xl font-bold text-gray-900">{{ activeUsers }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <i class="fas fa-users text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Équipements</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalEquipments }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <i class="fas fa-desktop text-purple-600 text-xl"></i>
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

      <!-- Charts Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Tendances Réservations</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="line" [data]="reservationChartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Répartition Présences</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="doughnut" [data]="attendanceChartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Statut Équipements</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="pie" [data]="equipmentChartData" [options]="chartOptions"></p-chart>
            </div>
          </div>
        </div>
      </div>

      <!-- Lab Usage and Recent Activities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Utilisation des Laboratoires</h3>
            <div class="flex gap-2">
              <p-button 
                icon="fas fa-th-large" 
                [outlined]="labUsageViewMode !== 'card'" 
                size="small" 
                (onClick)="labUsageViewMode = 'card'"
                pTooltip="Vue carte">
              </p-button>
              <p-button 
                icon="fas fa-table" 
                [outlined]="labUsageViewMode !== 'table'" 
                size="small" 
                (onClick)="labUsageViewMode = 'table'"
                pTooltip="Vue tableau">
              </p-button>
            </div>
          </div>
          <div class="p-6">
            <!-- Card View -->
            <div *ngIf="labUsageViewMode === 'card'" class="space-y-4">
              <div *ngFor="let lab of labUsage" class="space-y-2">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full" [style.background-color]="lab.color"></div>
                    <span class="text-sm font-medium text-gray-700">{{ lab.name }}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-semibold text-gray-900">{{ lab.usage }}%</span>
                    <p class="text-xs text-gray-500">{{ lab.capacity }} places</p>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full transition-all duration-300" 
                       [style.width.%]="lab.usage" 
                       [style.background-color]="lab.color"></div>
                </div>
              </div>
            </div>
            <!-- Table View -->
            <div *ngIf="labUsageViewMode === 'table'">
              <p-table [value]="labUsage" [tableStyle]="{'min-width': '100%'}">
                <ng-template pTemplate="header">
                  <tr>
                    <th>Laboratoire</th>
                    <th>Utilisation</th>
                    <th>Capacité</th>
                    <th>Statut</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-lab>
                  <tr>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full" [style.background-color]="lab.color"></div>
                        <span class="font-medium">{{ lab.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="w-20 bg-gray-200 rounded-full h-2">
                          <div class="h-2 rounded-full" [style.width.%]="lab.usage" [style.background-color]="lab.color"></div>
                        </div>
                        <span class="font-semibold">{{ lab.usage }}%</span>
                      </div>
                    </td>
                    <td>{{ lab.capacity }} places</td>
                    <td>
                      <span class="px-2 py-1 rounded-full text-xs" 
                            [class]="lab.usage > 80 ? 'bg-red-100 text-red-800' : lab.usage > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'">
                        {{ lab.usage > 80 ? 'Plein' : lab.usage > 60 ? 'Occupé' : 'Disponible' }}
                      </span>
                    </td>
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
            <div *ngIf="activitiesViewMode === 'card'" class="space-y-4 max-h-96 overflow-y-auto">
              <div *ngFor="let activity of recentActivities" class="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" 
                     [style.background-color]="activity.color">
                  <i [class]="activity.icon"></i>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                      <p class="text-xs text-gray-600">{{ activity.description }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ activity.user }} - {{ activity.time }}</p>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full" 
                          [class]="activity.statusClass">{{ activity.status }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Table View -->
            <div *ngIf="activitiesViewMode === 'table'">
              <p-table [value]="recentActivities" [tableStyle]="{'min-width': '100%'}" [scrollable]="true" scrollHeight="400px">
                <ng-template pTemplate="header">
                  <tr>
                    <th>Type</th>
                    <th>Activité</th>
                    <th>Description</th>
                    <th>Utilisateur</th>
                    <th>Heure</th>
                    <th>Statut</th>
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
                    <td>{{ activity.user }}</td>
                    <td class="text-gray-500">{{ activity.time }}</td>
                    <td>
                      <span class="text-xs px-2 py-1 rounded-full" [class]="activity.statusClass">
                        {{ activity.status }}
                      </span>
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </div>
          </div>
        </div>
      </div>

      <!-- System Performance and User Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Performance Système</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div *ngFor="let metric of systemMetrics" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" 
                       [style.background-color]="metric.color">
                    <i [class]="metric.icon"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-700">{{ metric.name }}</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-semibold" [style.color]="metric.color">{{ metric.value }}</span>
                  <p class="text-xs text-gray-500">{{ metric.status }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Analytiques Utilisateurs</h3>
          </div>
          <div class="p-6">
            <div class="h-80">
              <p-chart type="bar" [data]="userAnalyticsData" [options]="chartOptions"></p-chart>
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p-button 
              label="Nouveau Laboratoire" 
              icon="fas fa-plus" 
              styleClass="w-full p-button-outlined"
              routerLink="/protected/labs"
            ></p-button>
            <p-button 
              label="Ajouter Utilisateur" 
              icon="fas fa-user-plus" 
              styleClass="w-full p-button-outlined"
              routerLink="/protected/users"
            ></p-button>
            <p-button 
              label="Gérer Équipements" 
              icon="fas fa-cog" 
              styleClass="w-full p-button-outlined"
              routerLink="/protected/equipments"
            ></p-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboard implements OnInit {
  totalLabs = 12;
  activeUsers = 156;
  totalEquipments = 89;
  todayAttendance = 45;

  reservationChartData: any;
  attendanceChartData: any;
  equipmentChartData: any;
  userAnalyticsData: any;
  chartOptions: any;

  // View mode toggles
  labUsageViewMode: 'card' | 'table' = 'card';
  activitiesViewMode: 'card' | 'table' = 'card';

  labUsage = [
    { name: 'Lab Chimie A', usage: 92, capacity: 25, color: '#EF4444' },
    { name: 'Lab Physique B', usage: 78, capacity: 30, color: '#F59E0B' },
    { name: 'Lab Biologie C', usage: 85, capacity: 20, color: '#10B981' },
    { name: 'Lab Informatique D', usage: 65, capacity: 35, color: '#3B82F6' },
    { name: 'Lab Général E', usage: 45, capacity: 40, color: '#8B5CF6' },
    { name: 'Lab Recherche F', usage: 38, capacity: 15, color: '#EC4899' }
  ];

  recentActivities = [
    { 
      title: 'Nouveau laboratoire créé', 
      description: 'Lab Chimie Avancée ajouté au système', 
      user: 'Admin Principal', 
      time: 'Il y a 30min', 
      icon: 'fas fa-plus', 
      color: '#10B981',
      status: 'Complété',
      statusClass: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Maintenance équipement', 
      description: 'Microscope Lab B en maintenance', 
      user: 'Technicien Martin', 
      time: 'Il y a 1h', 
      icon: 'fas fa-wrench', 
      color: '#F59E0B',
      status: 'En cours',
      statusClass: 'bg-yellow-100 text-yellow-800'
    },
    { 
      title: 'Nouvel utilisateur', 
      description: 'Sophie Dubois inscrite comme étudiante', 
      user: 'Secrétariat', 
      time: 'Il y a 2h', 
      icon: 'fas fa-user-plus', 
      color: '#3B82F6',
      status: 'Actif',
      statusClass: 'bg-blue-100 text-blue-800'
    },
    { 
      title: 'Réservation annulée', 
      description: 'Cours de physique reporté', 
      user: 'Prof. Laurent', 
      time: 'Il y a 3h', 
      icon: 'fas fa-times', 
      color: '#EF4444',
      status: 'Annulé',
      statusClass: 'bg-red-100 text-red-800'
    },
    { 
      title: 'Rapport généré', 
      description: 'Rapport mensuel d\'utilisation', 
      user: 'Système', 
      time: 'Il y a 4h', 
      icon: 'fas fa-chart-bar', 
      color: '#8B5CF6',
      status: 'Disponible',
      statusClass: 'bg-purple-100 text-purple-800'
    },
    { 
      title: 'Équipement ajouté', 
      description: 'Nouveau spectromètre installé', 
      user: 'Technicien Paul', 
      time: 'Hier', 
      icon: 'fas fa-desktop', 
      color: '#10B981',
      status: 'Opérationnel',
      statusClass: 'bg-green-100 text-green-800'
    }
  ];

  systemMetrics = [
    { name: 'Utilisation CPU', value: '45%', status: 'Normal', icon: 'fas fa-microchip', color: '#10B981' },
    { name: 'Mémoire', value: '68%', status: 'Modéré', icon: 'fas fa-memory', color: '#F59E0B' },
    { name: 'Stockage', value: '23%', status: 'Faible', icon: 'fas fa-hdd', color: '#10B981' },
    { name: 'Réseau', value: '156 Mbps', status: 'Rapide', icon: 'fas fa-wifi', color: '#3B82F6' }
  ];

  ngOnInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.reservationChartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      datasets: [{
        label: 'Réservations',
        data: [65, 59, 80, 81, 56, 85],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.4
      }]
    };

    this.attendanceChartData = {
      labels: ['Présent', 'Absent', 'En retard'],
      datasets: [{
        data: [75, 15, 10],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B']
      }]
    };

    this.equipmentChartData = {
      labels: ['Disponible', 'En maintenance', 'En panne', 'Réservé'],
      datasets: [{
        data: [45, 12, 8, 24],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6']
      }]
    };

    this.userAnalyticsData = {
      labels: ['Étudiants', 'Enseignants', 'Admins', 'Techniciens'],
      datasets: [{
        label: 'Utilisateurs Actifs',
        data: [120, 25, 8, 12],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
        borderColor: ['#1D4ED8', '#059669', '#D97706', '#7C3AED'],
        borderWidth: 1
      }]
    };

    this.chartOptions = {
      plugins: { legend: { position: 'bottom' } },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }
}