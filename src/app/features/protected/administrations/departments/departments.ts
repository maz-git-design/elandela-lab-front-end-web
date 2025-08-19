import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Textarea } from 'primeng/textarea';

interface Department {
  _id: string;
  name: string;
  adId?: string;
  headOfDepartment?: string;
  deputyChef?: string;
  cohorts?: string[];
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-departments',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Textarea],
  templateUrl: './departments.html',
  styleUrl: './departments.scss'
})
export class Departments implements OnInit {
  departments: Department[] = [
    {
      _id: '1',
      name: 'Informatique',
      description: 'Département des sciences informatiques',
      headOfDepartment: 'Prof. Martin Dupont',
      contactEmail: 'info@university.edu',
      contactPhone: '+33 1 23 45 67 89',
      cohorts: ['cohort1', 'cohort2'],
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Chimie',
      description: 'Département de chimie',
      headOfDepartment: 'Prof. Marie Curie',
      contactEmail: 'chimie@university.edu',
      contactPhone: '+33 1 23 45 67 90',
      cohorts: ['cohort3'],
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10')
    }
  ];

  searchTerm: string = '';
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Departments component initialized');
  }

  get filteredDepartments(): Department[] {
    return this.departments.filter(department => {
      const matchesSearch = !this.searchTerm || 
        department.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        department.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }

  viewDepartment(department: Department): void {
    console.log('Viewing department:', department);
  }

  editDepartment(department: Department): void {
    console.log('Editing department:', department);
  }

  deleteDepartment(department: Department): void {
    console.log('Deleting department:', department);
  }

  createDepartment(): void {
    console.log('Creating new department');
    this.showAddDialog = false;
  }
}
