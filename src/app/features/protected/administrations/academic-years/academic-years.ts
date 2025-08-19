import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

interface AcademicYear {
  _id: string;
  startingYear: number;
  endingYear: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-academic-years',
  imports: [CommonModule, FormsModule, Button, Dialog, InputText, Select],
  templateUrl: './academic-years.html',
  styleUrl: './academic-years.scss'
})
export class AcademicYears implements OnInit {
  academicYears: AcademicYear[] = [
    {
      _id: '1',
      startingYear: 2023,
      endingYear: 2024,
      status: 'completed',
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2024-06-30')
    },
    {
      _id: '2',
      startingYear: 2024,
      endingYear: 2025,
      status: 'active',
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-08-01')
    },
    {
      _id: '3',
      startingYear: 2025,
      endingYear: 2026,
      status: 'upcoming',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01')
    }
  ];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'À venir', value: 'upcoming' },
    { label: 'Terminée', value: 'completed' }
  ];

  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Academic Years component initialized');
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Active',
      'upcoming': 'À venir',
      'completed': 'Terminée'
    };
    return statusMap[status] || status;
  }

  viewAcademicYear(year: AcademicYear): void {
    console.log('Viewing academic year:', year);
  }

  editAcademicYear(year: AcademicYear): void {
    console.log('Editing academic year:', year);
  }

  createAcademicYear(): void {
    console.log('Creating new academic year');
    this.showAddDialog = false;
  }
}
