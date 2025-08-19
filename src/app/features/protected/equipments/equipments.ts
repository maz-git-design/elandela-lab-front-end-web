import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';

import { Tooltip } from 'primeng/tooltip';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { TableModule } from 'primeng/table';

interface Equipment {
  _id: string;
  name: string;
  code: string;
  serialNumber?: string;
  imagePath?: string;
  categoryId: string;
  model?: string;
  specs?: { name: string; description: string }[];
  currentStatus: {
    state: string;
    updatedAt: Date;
    updatedBy: string;
  };
  currentLabId?: string;
  description?: string;
  deliveryDate?: Date;
  entryDate?: Date;
  accessories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EquipmentStats {
  total: number;
  available: number;
  maintenance: number;
  outOfOrder: number;
}

@Component({
  selector: 'app-equipments',
  imports: [
    CommonModule,
    FormsModule,
    Button,
    InputText,
    Select,
    Dialog,
    TableModule,
    Tooltip,
    DatePicker,
    Textarea,
  ],
  templateUrl: './equipments.html',
  styleUrl: './equipments.scss',
})
export class Equipments implements OnInit {
  equipments: Equipment[] = [
    {
      _id: '1',
      name: 'Microscope Optique',
      code: 'EQ-MS-001',
      serialNumber: 'MS-2024-001',
      model: 'Olympus CX23',
      categoryId: 'cat1',
      currentStatus: {
        state: 'available',
        updatedAt: new Date('2024-01-10'),
        updatedBy: 'user1',
      },
      currentLabId: 'lab1',
      description: 'Microscope optique haute résolution',
      entryDate: new Date('2023-09-15'),
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      _id: '2',
      name: 'Centrifugeuse',
      code: 'EQ-CF-002',
      serialNumber: 'CF-2024-002',
      model: 'Eppendorf 5424R',
      categoryId: 'cat2',
      currentStatus: {
        state: 'in-use',
        updatedAt: new Date('2023-12-15'),
        updatedBy: 'user2',
      },
      currentLabId: 'lab2',
      entryDate: new Date('2023-08-20'),
      createdAt: new Date('2023-08-20'),
      updatedAt: new Date('2023-12-15'),
    },
    {
      _id: '3',
      name: 'Spectromètre',
      code: 'EQ-SP-003',
      serialNumber: 'SP-2024-003',
      model: 'Thermo Fisher Scientific',
      categoryId: 'cat3',
      currentStatus: {
        state: 'maintenance',
        updatedAt: new Date('2024-01-05'),
        updatedBy: 'user3',
      },
      currentLabId: 'lab2',
      entryDate: new Date('2023-10-05'),
      createdAt: new Date('2023-10-05'),
      updatedAt: new Date('2024-01-05'),
    },
  ];

  categoryOptions = [
    { label: 'Optique', value: 'Optique' },
    { label: 'Laboratoire', value: 'Laboratoire' },
    { label: 'Analyse', value: 'Analyse' },
    { label: 'Électronique', value: 'Électronique' },
    { label: 'Fabrication', value: 'Fabrication' },
    { label: 'Informatique', value: 'Informatique' },
  ];

  labOptions = [
    { label: 'Lab Biologie', value: 'Lab Biologie' },
    { label: 'Lab Chimie', value: 'Lab Chimie' },
    { label: 'Lab Physique', value: 'Lab Physique' },
    { label: 'Lab Informatique', value: 'Lab Informatique' },
    { label: 'Lab Électronique', value: 'Lab Électronique' },
  ];

  statusOptions = [
    { label: 'Disponible', value: 'available' },
    { label: "En cours d'utilisation", value: 'in-use' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Hors service', value: 'out-of-order' },
  ];

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedLab: string = '';
  selectedStatus: string = '';
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Equipments component initialized');
  }

  get equipmentStats(): EquipmentStats {
    return {
      total: this.equipments.length,
      available: this.equipments.filter(
        (e) => e.currentStatus.state === 'available'
      ).length,
      maintenance: this.equipments.filter(
        (e) => e.currentStatus.state === 'maintenance'
      ).length,
      outOfOrder: this.equipments.filter(
        (e) => e.currentStatus.state === 'out-of-order'
      ).length,
    };
  }

  get filteredEquipments(): Equipment[] {
    return this.equipments.filter((equipment) => {
      const matchesSearch =
        !this.searchTerm ||
        equipment.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        equipment.model
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        equipment.serialNumber
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        !this.selectedCategory ||
        equipment.categoryId === this.selectedCategory;
      const matchesLab =
        !this.selectedLab || equipment.currentLabId === this.selectedLab;
      const matchesStatus =
        !this.selectedStatus ||
        equipment.currentStatus?.state === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesLab && matchesStatus;
    });
  }

  getEquipmentIcon(categoryId: string): string {
    const iconMap: { [key: string]: string } = {
      cat1: 'fas fa-microscope',
      cat2: 'fas fa-flask',
      cat3: 'fas fa-chart-line',
      Électronique: 'fas fa-microchip',
      Fabrication: 'fas fa-cube',
      Informatique: 'fas fa-desktop',
    };
    return iconMap[categoryId] || 'fas fa-cog';
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      available: 'Disponible',
      'in-use': "En cours d'utilisation",
      maintenance: 'Maintenance',
      'out-of-order': 'Hors service',
    };
    return statusMap[status] || status;
  }

  viewEquipment(equipment: Equipment): void {
    console.log('Viewing equipment:', equipment);
  }

  editEquipment(equipment: Equipment): void {
    console.log('Editing equipment:', equipment);
  }

  scheduleMaintenanceEquipment(equipment: Equipment): void {
    console.log('Scheduling maintenance for equipment:', equipment);
  }

  createEquipment(): void {
    console.log('Creating new equipment');
    this.showAddDialog = false;
  }
}
