import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

interface Activity {
  _id: string;
  name: string;
  description?: string;
  cohortId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-activities',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Select, Textarea],
  templateUrl: './activities.html',
  styleUrl: './activities.scss'
})
export class Activities implements OnInit {
  activities: Activity[] = [
    {
      _id: '1',
      name: 'TP Chimie Organique',
      description: 'Travaux pratiques de chimie organique',
      cohortId: 'cohort1',
      isActive: true,
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    },
    {
      _id: '2',
      name: 'Projet Informatique',
      description: 'Projet de développement logiciel',
      cohortId: 'cohort2',
      isActive: true,
      createdAt: new Date('2024-09-15'),
      updatedAt: new Date('2024-09-15')
    },
    {
      _id: '3',
      name: 'Stage en entreprise',
      description: 'Stage de fin d\'année',
      cohortId: 'cohort1',
      isActive: false,
      createdAt: new Date('2024-10-01'),
      updatedAt: new Date('2024-10-01')
    }
  ];

  cohortOptions = [
    { label: 'L3 Informatique 2024', value: 'cohort1' },
    { label: 'M1 Chimie 2024', value: 'cohort2' },
    { label: 'L2 Physique 2024', value: 'cohort3' }
  ];

  statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  searchTerm: string = '';
  selectedCohort: string = '';
  selectedStatus: boolean | null = null;
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Activities component initialized');
  }

  get filteredActivities(): Activity[] {
    return this.activities.filter(activity => {
      const matchesSearch = !this.searchTerm || 
        activity.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCohort = !this.selectedCohort || activity.cohortId === this.selectedCohort;
      const matchesStatus = this.selectedStatus === null || activity.isActive === this.selectedStatus;
      
      return matchesSearch && matchesCohort && matchesStatus;
    });
  }

  viewActivity(activity: Activity): void {
    console.log('Viewing activity:', activity);
  }

  editActivity(activity: Activity): void {
    console.log('Editing activity:', activity);
  }

  toggleActivityStatus(activity: Activity): void {
    activity.isActive = !activity.isActive;
    console.log('Toggling activity status:', activity);
  }

  deleteActivity(activity: Activity): void {
    console.log('Deleting activity:', activity);
  }

  createActivity(): void {
    console.log('Creating new activity');
    this.showAddDialog = false;
  }
}
