import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Textarea } from 'primeng/textarea';

interface PermissionsByModule {
  moduleId: string;
  permissions: string[];
}

interface Role {
  _id: string;
  name: string;
  description?: string;
  permissionsByModule: PermissionsByModule[];
  createdAt: Date;
  updatedAt: Date;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
}

interface Permission {
  _id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-roles',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Textarea],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class Roles implements OnInit {
  roles: Role[] = [
    {
      _id: '1',
      name: 'Administrateur',
      description: 'Accès complet au système',
      permissionsByModule: [
        { moduleId: 'mod1', permissions: ['perm1', 'perm2', 'perm3'] },
        { moduleId: 'mod2', permissions: ['perm4', 'perm5'] },
        { moduleId: 'mod3', permissions: ['perm6'] }
      ],
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Enseignant',
      description: 'Accès aux laboratoires et étudiants',
      permissionsByModule: [
        { moduleId: 'mod1', permissions: ['perm1'] },
        { moduleId: 'mod2', permissions: ['perm4'] }
      ],
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '3',
      name: 'Étudiant',
      description: 'Accès limité aux ressources',
      permissionsByModule: [
        { moduleId: 'mod1', permissions: ['perm1'] }
      ],
      createdAt: new Date('2023-10-01'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  availableModules: Module[] = [
    { _id: 'mod1', name: 'Gestion des utilisateurs', description: 'Module pour gérer les utilisateurs' },
    { _id: 'mod2', name: 'Gestion des laboratoires', description: 'Module pour gérer les laboratoires' },
    { _id: 'mod3', name: 'Gestion des équipements', description: 'Module pour gérer les équipements' },
    { _id: 'mod4', name: 'Gestion des réservations', description: 'Module pour gérer les réservations' }
  ];

  availablePermissions: Permission[] = [
    { _id: 'perm1', name: 'Lire', description: 'Permission de lecture' },
    { _id: 'perm2', name: 'Créer', description: 'Permission de création' },
    { _id: 'perm3', name: 'Modifier', description: 'Permission de modification' },
    { _id: 'perm4', name: 'Supprimer', description: 'Permission de suppression' },
    { _id: 'perm5', name: 'Gérer', description: 'Permission de gestion complète' },
    { _id: 'perm6', name: 'Approuver', description: 'Permission d\'approbation' }
  ];

  selectedModulePermissions: { [moduleId: string]: string[] } = {};

  searchTerm: string = '';
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Roles component initialized');
  }

  get filteredRoles(): Role[] {
    return this.roles.filter(role => {
      const matchesSearch = !this.searchTerm || 
        role.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }

  getInitials(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  getModuleName(moduleId: string): string {
    const module = this.availableModules.find(m => m._id === moduleId);
    return module?.name || moduleId;
  }

  isModuleSelected(moduleId: string): boolean {
    return !!this.selectedModulePermissions[moduleId];
  }

  isPermissionSelected(moduleId: string, permissionId: string): boolean {
    return this.selectedModulePermissions[moduleId]?.includes(permissionId) || false;
  }

  toggleModule(moduleId: string): void {
    if (this.selectedModulePermissions[moduleId]) {
      delete this.selectedModulePermissions[moduleId];
    } else {
      this.selectedModulePermissions[moduleId] = [];
    }
  }

  togglePermission(moduleId: string, permissionId: string, event: any): void {
    if (!this.selectedModulePermissions[moduleId]) {
      this.selectedModulePermissions[moduleId] = [];
    }
    
    if (event.target.checked) {
      if (!this.selectedModulePermissions[moduleId].includes(permissionId)) {
        this.selectedModulePermissions[moduleId].push(permissionId);
      }
    } else {
      this.selectedModulePermissions[moduleId] = this.selectedModulePermissions[moduleId].filter(id => id !== permissionId);
    }
  }

  viewRole(role: Role): void {
    console.log('Viewing role:', role);
  }

  editRole(role: Role): void {
    console.log('Editing role:', role);
  }

  deleteRole(role: Role): void {
    console.log('Deleting role:', role);
  }

  createRole(): void {
    const permissionsByModule = Object.keys(this.selectedModulePermissions)
      .filter(moduleId => this.selectedModulePermissions[moduleId].length > 0)
      .map(moduleId => ({
        moduleId,
        permissions: this.selectedModulePermissions[moduleId]
      }));
    
    console.log('Creating new role with permissions:', permissionsByModule);
    this.selectedModulePermissions = {};
    this.showAddDialog = false;
  }
}
