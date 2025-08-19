import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, Button, RouterModule, ChartModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen w-full">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Mon Dashboard Étudiant</h1>
        <p class="text-gray-600">Mes réservations et activités</p>
      </div>

      <!-- Student Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Mes Réservations</p>
              <p class="text-3xl font-bold text-gray-900">{{ myReservations }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <i class="fas fa-calendar text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Heures de Lab</p>
              <p class="text-3xl font-bold text-gray-900">{{ labHours }}h</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <i class="fas fa-clock text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Prochaine Session</p>
              <p class="text-lg font-bold text-gray-900">{{ nextSession }}</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <i class="fas fa-flask text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- My Reservations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Mes Prochaines Réservations</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div *ngFor="let reservation of upcomingReservations" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ reservation.lab }}</p>
                  <p class="text-sm text-gray-600">{{ reservation.date }} - {{ reservation.time }}</p>
                </div>
                <span class="px-2 py-1 text-xs rounded-full" [ngClass]="{
                  'bg-green-100 text-green-800': reservation.status === 'confirmé',
                  'bg-yellow-100 text-yellow-800': reservation.status === 'en attente'
                }">{{ reservation.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Mes Cours</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div *ngFor="let course of myCourses" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ course.name }}</p>
                  <p class="text-sm text-gray-600">{{ course.teacher }}</p>
                </div>
                <span class="text-sm text-blue-600">{{ course.progress }}%</span>
              </div>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p-button 
              label="Réserver un Lab" 
              icon="fas fa-plus" 
              styleClass="w-full p-button-outlined"
            ></p-button>
            <p-button 
              label="Mes Réservations" 
              icon="fas fa-list" 
              styleClass="w-full p-button-outlined"
            ></p-button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudentDashboard implements OnInit {
  myReservations = 3;
  labHours = 24;
  nextSession = 'Demain 14h';

  upcomingReservations = [
    { lab: 'Lab Chimie', date: 'Demain', time: '14h00-16h00', status: 'confirmé' },
    { lab: 'Lab Physique', date: 'Vendredi', time: '10h00-12h00', status: 'confirmé' },
    { lab: 'Lab Biologie', date: 'Lundi', time: '09h00-11h00', status: 'en attente' }
  ];

  myCourses = [
    { name: 'Chimie Organique', teacher: 'Dr. Martin', progress: 75 },
    { name: 'Physique Quantique', teacher: 'Prof. Dubois', progress: 60 },
    { name: 'Biologie Moléculaire', teacher: 'Dr. Leroy', progress: 85 }
  ];

  ngOnInit(): void {}
}