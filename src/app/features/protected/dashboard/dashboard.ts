import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, Button, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  stats: DashboardStats = {
    totalLabs: 12,
    activeUsers: 156,
    totalEquipments: 89,
    todayAttendance: 45
  };

  recentActivities: RecentActivity[] = [
    {
      title: 'Nouveau laboratoire créé',
      description: 'Lab de Chimie Organique ajouté',
      time: 'Il y a 2h',
      icon: 'fas fa-flask'
    },
    {
      title: 'Utilisateur connecté',
      description: 'Marie Dubois s\'est connectée',
      time: 'Il y a 3h',
      icon: 'fas fa-user'
    },
    {
      title: 'Équipement mis à jour',
      description: 'Microscope #MS-001 maintenance terminée',
      time: 'Il y a 5h',
      icon: 'fas fa-wrench'
    },
    {
      title: 'Réservation confirmée',
      description: 'Lab de Physique réservé pour demain',
      time: 'Il y a 1j',
      icon: 'fas fa-calendar-check'
    }
  ];

  labUsage: LabUsage[] = [
    { name: 'Lab Chimie', usage: 85, color: '#3B82F6' },
    { name: 'Lab Physique', usage: 72, color: '#10B981' },
    { name: 'Lab Biologie', usage: 68, color: '#F59E0B' },
    { name: 'Lab Informatique', usage: 91, color: '#EF4444' },
    { name: 'Lab Électronique', usage: 45, color: '#8B5CF6' }
  ];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    console.log('Loading dashboard data...');
  }
}
