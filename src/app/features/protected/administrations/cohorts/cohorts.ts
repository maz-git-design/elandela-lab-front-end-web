import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Cohort {
  _id: string;
  name: string;
  academicYear: string;
  description?: string;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-cohorts',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, Select, Textarea, TableModule, ButtonModule],
  templateUrl: './cohorts.html',
  styleUrl: './cohorts.scss'
})
export class Cohorts implements OnInit {
  cohorts: Cohort[] = [
    {
      _id: '1',
      name: 'L3 Informatique 2024',
      description: 'Licence 3 en informatique',
      academicYear: '2024-2025',
      departmentId: 'dept1',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    },
    {
      _id: '2',
      name: 'M1 Chimie 2024',
      description: 'Master 1 en chimie',
      academicYear: '2024-2025',
      departmentId: 'dept2',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    },
    {
      _id: '3',
      name: 'L2 Physique 2024',
      description: 'Licence 2 en physique',
      academicYear: '2024-2025',
      departmentId: 'dept3',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01')
    }
  ];

  departmentOptions = [
    { label: 'Informatique', value: 'dept1' },
    { label: 'Chimie', value: 'dept2' },
    { label: 'Physique', value: 'dept3' },
    { label: 'Biologie', value: 'dept4' }
  ];

  academicYearOptions = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
    { label: '2025-2026', value: '2025-2026' }
  ];

  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedAcademicYear: string = '';
  showAddDialog: boolean = false;
  viewMode: 'card' | 'table' = 'card';

  ngOnInit(): void {
    console.log('Cohorts component initialized');
  }

  get filteredCohorts(): Cohort[] {
    return this.cohorts.filter(cohort => {
      const matchesSearch = !this.searchTerm || 
        cohort.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cohort.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = !this.selectedDepartment || cohort.departmentId === this.selectedDepartment;
      const matchesAcademicYear = !this.selectedAcademicYear || cohort.academicYear === this.selectedAcademicYear;
      
      return matchesSearch && matchesDepartment && matchesAcademicYear;
    });
  }

  viewCohort(cohort: Cohort): void {
    console.log('Viewing cohort:', cohort);
  }

  editCohort(cohort: Cohort): void {
    console.log('Editing cohort:', cohort);
  }

  createCohort(): void {
    console.log('Creating new cohort');
    this.showAddDialog = false;
  }
}
