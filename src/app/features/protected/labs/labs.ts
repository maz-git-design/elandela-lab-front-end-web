import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Lab {
  _id: string;
  name: string;
  code: string;
  description?: string;
  departmentId: string;
  equipmentList: string[];
  location: {
    building: string;
    roomNumber: string;
    floor: number;
  };
  capacities: {
    users: number;
    equipment: number;
  };
  openingHours: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Department {
  id: string;
  name: string;
}

@Component({
  selector: 'app-labs',
  imports: [CommonModule, FormsModule, Button, InputText, Select, Dialog, Textarea, TableModule, ButtonModule],
  templateUrl: './labs.html',
  styleUrl: './labs.scss'
})
export class Labs implements OnInit {
  labs: Lab[] = [
    {
      _id: '1',
      name: 'Laboratoire de Chimie Organique',
      code: 'LAB-CHM-001',
      description: 'Laboratoire spécialisé en chimie organique',
      departmentId: 'dept1',
      equipmentList: ['eq1', 'eq2', 'eq3'],
      location: {
        building: 'Bâtiment A',
        roomNumber: '201',
        floor: 2
      },
      capacities: {
        users: 25,
        equipment: 15
      },
      openingHours: [
        { day: 'Lundi', openTime: '08:00', closeTime: '18:00' }
      ],
      status: 'active',
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '2',
      name: 'Laboratoire de Physique Quantique',
      code: 'LAB-PHY-002',
      description: 'Laboratoire de recherche en physique quantique',
      departmentId: 'dept2',
      equipmentList: ['eq4', 'eq5'],
      location: {
        building: 'Bâtiment B',
        roomNumber: '305',
        floor: 3
      },
      capacities: {
        users: 20,
        equipment: 12
      },
      openingHours: [
        { day: 'Lundi', openTime: '09:00', closeTime: '17:00' }
      ],
      status: 'active',
      createdAt: new Date('2023-08-15'),
      updatedAt: new Date('2024-01-08')
    }
  ];

  departments: Department[] = [
    { id: 'chimie', name: 'Chimie' },
    { id: 'physique', name: 'Physique' },
    { id: 'biologie', name: 'Biologie' },
    { id: 'informatique', name: 'Informatique' },
    { id: 'genie-electrique', name: 'Génie Électrique' }
  ];

  statusOptions = [
    { label: 'Actif', value: 'active' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Réservé', value: 'reserved' }
  ];

  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  showAddDialog: boolean = false;
  viewMode: 'card' | 'table' = 'card';

  ngOnInit(): void {
    console.log('Labs component initialized');
  }

  get filteredLabs(): Lab[] {
    return this.labs.filter(lab => {
      const matchesSearch = !this.searchTerm || 
        lab.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || 
        lab.departmentId === this.selectedDepartment;
      const matchesStatus = !this.selectedStatus || 
        lab.status === this.selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Actif',
      'maintenance': 'Maintenance',
      'reserved': 'Réservé'
    };
    return statusMap[status] || status;
  }

  viewLab(lab: Lab): void {
    console.log('Viewing lab:', lab);
  }

  editLab(lab: Lab): void {
    console.log('Editing lab:', lab);
  }

  createLab(): void {
    console.log('Creating new lab');
    this.showAddDialog = false;
  }
}
