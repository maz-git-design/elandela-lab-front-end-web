import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Select } from 'primeng/select';

interface User {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: 'M' | 'F';
  roles: string[];
  status: {
    state: 'activated' | 'suspended' | 'pending' | 'deleted';
    updatedAt: Date;
    updatedBy: string;
  };
  cohortId?: string;
  identificationNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Department {
  id: string;
  name: string;
}

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    FormsModule,
    Button,
    InputText,
    Select,
    Dialog,
    TableModule,
    Tooltip,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users: User[] = [
    {
      _id: '1',
      username: 'marie.dubois',
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@university.edu',
      phoneNumber: '+33 1 23 45 67 89',
      gender: 'F',
      roles: ['teacher'],
      status: {
        state: 'activated',
        updatedAt: new Date('2024-01-15'),
        updatedBy: 'admin'
      },
      cohortId: 'cohort1',
      identificationNumber: 'ID001',
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      username: 'pierre.martin',
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'pierre.martin@university.edu',
      phoneNumber: '+33 1 23 45 67 90',
      gender: 'M',
      roles: ['admin'],
      status: {
        state: 'activated',
        updatedAt: new Date('2024-01-15'),
        updatedBy: 'system'
      },
      identificationNumber: 'ID002',
      createdAt: new Date('2023-08-15'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  departments: Department[] = [
    { id: 'chimie', name: 'Chimie' },
    { id: 'physique', name: 'Physique' },
    { id: 'biologie', name: 'Biologie' },
    { id: 'informatique', name: 'Informatique' },
    { id: 'administration', name: 'Administration' },
  ];

  roleOptions = [
    { label: 'Administrateur', value: 'admin' },
    { label: 'Enseignant', value: 'teacher' },
    { label: 'Étudiant', value: 'student' },
    { label: 'Technicien', value: 'technician' },
  ];

  statusOptions = [
    { label: 'Actif', value: 'activated' },
    { label: 'Suspendu', value: 'suspended' },
    { label: 'En attente', value: 'pending' },
    { label: 'Supprimé', value: 'deleted' }
  ];

  searchTerm: string = '';
  selectedRole: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  showAddDialog: boolean = false;

  ngOnInit(): void {
    console.log('Users component initialized');
  }

  get filteredUsers(): User[] {
    return this.users.filter((user) => {
      const matchesSearch =
        !this.searchTerm ||
        user.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = !this.selectedRole || user.roles?.includes(this.selectedRole);
      const matchesDepartment =
        !this.selectedDepartment ||
        user.cohortId === this.selectedDepartment;
      const matchesStatus =
        !this.selectedStatus || user.status?.state === this.selectedStatus;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }

  getInitials(firstName?: string, lastName?: string): string {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  }

  getRoleLabel(roles: string[]): string {
    const roleMap: { [key: string]: string } = {
      admin: 'Administrateur',
      teacher: 'Enseignant',
      student: 'Étudiant',
      technician: 'Technicien',
    };
    return roles.map(role => roleMap[role] || role).join(', ');
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      activated: 'Actif',
      suspended: 'Suspendu',
      pending: 'En attente',
      deleted: 'Supprimé'
    };
    return statusMap[status] || status;
  }

  viewUser(user: User): void {
    console.log('Viewing user:', user);
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
  }

  deleteUser(user: User): void {
    console.log('Deleting user:', user);
  }

  createUser(): void {
    console.log('Creating new user');
    this.showAddDialog = false;
  }
}
