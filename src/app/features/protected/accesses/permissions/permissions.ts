import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Textarea } from 'primeng/textarea';

interface Permission {
  _id: string;
  name: string;
  description?: string;
  actions: string[];
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-permissions',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Textarea],
  templateUrl: './permissions.html',
  styleUrl: './permissions.scss'
})
export class Permissions implements OnInit {
  permissions: Permission[] = [
    {
      _id: '1',
      name: 'Gestion des utilisateurs',
      description: 'Permet de gérer les utilisateurs du système',
      actions: ['Create', 'Update', 'Delete', 'List'],
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Gestion des laboratoires',
      description: 'Permet de gérer les laboratoires',
      actions: ['Create', 'Update', 'List'],
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '3',
      name: 'Gestion des équipements',
      description: 'Permet de gérer les équipements',
      actions: ['Create', 'Update', 'Delete', 'List'],
      createdAt: new Date('2023-10-01'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  searchTerm: string = '';
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Permissions component initialized');
  }

  get filteredPermissions(): Permission[] {
    return this.permissions.filter(permission => {
      const matchesSearch = !this.searchTerm || 
        permission.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        permission.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }

  viewPermission(permission: Permission): void {
    console.log('Viewing permission:', permission);
  }

  editPermission(permission: Permission): void {
    console.log('Editing permission:', permission);
  }

  deletePermission(permission: Permission): void {
    console.log('Deleting permission:', permission);
  }

  createPermission(): void {
    console.log('Creating new permission');
    this.showAddDialog = false;
  }
}
