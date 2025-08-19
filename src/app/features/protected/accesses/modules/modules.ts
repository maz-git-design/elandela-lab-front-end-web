import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { Tooltip } from 'primeng/tooltip';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Module {
  _id: string;
  name: string;
  description?: string;
  parentId?: string;
  path?: string;
  availableActions: string[];
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-modules',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, Tooltip, Textarea, Select, TableModule, ButtonModule],
  templateUrl: './modules.html',
  styleUrl: './modules.scss'
})
export class Modules implements OnInit {
  modules: Module[] = [
    {
      _id: '1',
      name: 'Gestion des utilisateurs',
      description: 'Module pour gérer les utilisateurs',
      path: '/users',
      availableActions: ['Create', 'Update', 'Delete', 'List'],
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Profil utilisateur',
      description: 'Sous-module pour le profil',
      parentId: '1',
      path: '/users/profile',
      availableActions: ['Update', 'List'],
      createdAt: new Date('2023-09-05'),
      updatedAt: new Date('2024-01-12')
    },
    {
      _id: '3',
      name: 'Gestion des laboratoires',
      description: 'Module pour gérer les laboratoires',
      path: '/labs',
      availableActions: ['Create', 'Update', 'List'],
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '4',
      name: 'Réservations',
      description: 'Sous-module pour les réservations',
      parentId: '3',
      path: '/labs/reservations',
      availableActions: ['Create', 'Update', 'Delete', 'List'],
      createdAt: new Date('2023-09-20'),
      updatedAt: new Date('2024-01-08')
    },
    {
      _id: '5',
      name: 'Gestion des équipements',
      description: 'Module pour gérer les équipements',
      path: '/equipments',
      availableActions: ['Create', 'Update', 'Delete', 'List'],
      createdAt: new Date('2023-10-01'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  availableActionsList = ['Create', 'Update', 'Delete', 'List', '*'];
  searchTerm: string = '';
  showAddDialog: boolean = false;
  viewMode: 'card' | 'table' = 'card';

  ngOnInit(): void {
    console.log('Modules component initialized');
  }

  get filteredModules(): Module[] {
    return this.modules.filter(module => {
      const matchesSearch = !this.searchTerm || 
        module.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        module.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Only return parent modules (no parentId)
      return matchesSearch && !module.parentId;
    });
  }

  get parentModuleOptions(): Module[] {
    return this.modules.filter(module => !module.parentId);
  }

  getChildModules(parentId: string): Module[] {
    return this.modules.filter(module => module.parentId === parentId);
  }

  viewModule(module: Module): void {
    console.log('Viewing module:', module);
  }

  editModule(module: Module): void {
    console.log('Editing module:', module);
  }

  deleteModule(module: Module): void {
    console.log('Deleting module:', module);
  }

  createModule(): void {
    console.log('Creating new module');
    this.showAddDialog = false;
  }
}
