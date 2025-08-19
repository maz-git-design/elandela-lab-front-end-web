import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';

interface Suggestion {
  alternativeStartTime: Date;
  alternativeEndTime: Date;
  alternativeLabId: string;
  alternativeEquipmentIds: string[];
}

interface HistoryEntry {
  status: string;
  changedAt: Date;
  changedBy: string;
  comment?: string;
}

interface Comment {
  commenterId: string;
  commentText: string;
  createdAt: Date;
}

interface Reservation {
  _id?: string;
  activities: string[];
  userId: string;
  labId: string;
  equipmentIds: string[];
  requestedAt: Date;
  desiredStartTime: Date;
  desiredEndTime: Date;
  status: 'pending' | 'approved' | 'rejected' | 'suggested' | 'cancelled';
  managerId?: string;
  managerDecisionAt?: Date;
  managerComments?: string;
  suggestion?: Suggestion;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  history: HistoryEntry[];
  notificationIds: string[];
  comments: Comment[];
  reservationType: 'individual' | 'group' | 'lecturerUse';
  groupMembers: string[];
  requesterRole: 'student' | 'lecturer' | 'staff';
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

@Component({
  selector: 'app-reservations',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Select, MultiSelect, DatePicker, Textarea],
  templateUrl: './reservations.html',
  styleUrl: './reservations.scss'
})
export class Reservations implements OnInit {
  reservations: Reservation[] = [
    {
      _id: '1',
      activities: ['activity1'],
      userId: 'user1',
      labId: 'lab1',
      equipmentIds: ['eq1', 'eq2'],
      requestedAt: new Date('2024-01-10T09:00:00'),
      desiredStartTime: new Date('2024-01-20T14:00:00'),
      desiredEndTime: new Date('2024-01-20T16:00:00'),
      status: 'pending',
      priority: 'normal',
      history: [],
      notificationIds: [],
      comments: [],
      reservationType: 'individual',
      groupMembers: [],
      requesterRole: 'student',
      createdAt: new Date('2024-01-10T09:00:00'),
      updatedAt: new Date('2024-01-10T09:00:00')
    },
    {
      _id: '2',
      activities: ['activity2'],
      userId: 'user2',
      labId: 'lab2',
      equipmentIds: ['eq3'],
      requestedAt: new Date('2024-01-11T10:30:00'),
      desiredStartTime: new Date('2024-01-22T09:00:00'),
      desiredEndTime: new Date('2024-01-22T12:00:00'),
      status: 'approved',
      managerId: 'manager1',
      managerDecisionAt: new Date('2024-01-12T08:00:00'),
      priority: 'high',
      history: [],
      notificationIds: [],
      comments: [],
      reservationType: 'group',
      groupMembers: ['user3', 'user4'],
      requesterRole: 'lecturer',
      createdAt: new Date('2024-01-11T10:30:00'),
      updatedAt: new Date('2024-01-12T08:00:00')
    },
    {
      _id: '3',
      activities: ['activity3'],
      userId: 'user5',
      labId: 'lab1',
      equipmentIds: [],
      requestedAt: new Date('2024-01-12T15:00:00'),
      desiredStartTime: new Date('2024-01-25T10:00:00'),
      desiredEndTime: new Date('2024-01-25T11:30:00'),
      status: 'rejected',
      managerId: 'manager1',
      managerDecisionAt: new Date('2024-01-13T09:00:00'),
      managerComments: 'Laboratoire non disponible',
      priority: 'urgent',
      history: [],
      notificationIds: [],
      comments: [],
      reservationType: 'lecturerUse',
      groupMembers: [],
      requesterRole: 'lecturer',
      createdAt: new Date('2024-01-12T15:00:00'),
      updatedAt: new Date('2024-01-13T09:00:00')
    }
  ];

  statusOptions = [
    { label: 'En attente', value: 'pending' },
    { label: 'Approuvée', value: 'approved' },
    { label: 'Rejetée', value: 'rejected' },
    { label: 'Suggérée', value: 'suggested' },
    { label: 'Annulée', value: 'cancelled' }
  ];

  priorityOptions = [
    { label: 'Faible', value: 'low' },
    { label: 'Normale', value: 'normal' },
    { label: 'Haute', value: 'high' },
    { label: 'Urgente', value: 'urgent' }
  ];

  typeOptions = [
    { label: 'Individuelle', value: 'individual' },
    { label: 'Groupe', value: 'group' },
    { label: 'Enseignant', value: 'lecturerUse' }
  ];

  requesterRoleOptions = [
    { label: 'Étudiant', value: 'student' },
    { label: 'Enseignant', value: 'lecturer' },
    { label: 'Personnel', value: 'staff' }
  ];

  labOptions = [
    { label: 'Lab Chimie', value: 'lab1' },
    { label: 'Lab Physique', value: 'lab2' },
    { label: 'Lab Biologie', value: 'lab3' },
    { label: 'Lab Informatique', value: 'lab4' }
  ];

  activityOptions = [
    { label: 'Expérience Chimie', value: 'activity1' },
    { label: 'Analyse Physique', value: 'activity2' },
    { label: 'Recherche Biologie', value: 'activity3' },
    { label: 'Programmation', value: 'activity4' }
  ];

  equipmentOptions = [
    { label: 'Microscope', value: 'eq1' },
    { label: 'Centrifugeuse', value: 'eq2' },
    { label: 'Spectromètre', value: 'eq3' },
    { label: 'Ordinateur', value: 'eq4' }
  ];

  userOptions = [
    { label: 'Jean Dupont', value: 'user1' },
    { label: 'Marie Martin', value: 'user2' },
    { label: 'Pierre Durand', value: 'user3' },
    { label: 'Sophie Bernard', value: 'user4' }
  ];

  searchTerm: string = '';
  selectedStatus: string = '';
  selectedPriority: string = '';
  selectedType: string = '';
  showAddDialog: boolean = false;

  newReservation: Partial<Reservation> = {
    activities: [],
    equipmentIds: [],
    priority: 'normal',
    reservationType: 'individual',
    requesterRole: 'student',
    groupMembers: [],
    history: [],
    notificationIds: [],
    comments: []
  };
  
  motivation: string = '';

  ngOnInit(): void {
    console.log('Reservations component initialized');
  }

  get filteredReservations(): Reservation[] {
    return this.reservations.filter(reservation => {
      const matchesSearch = !this.searchTerm || 
        reservation.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reservation.labId.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.selectedStatus || reservation.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || reservation.priority === this.selectedPriority;
      const matchesType = !this.selectedType || reservation.reservationType === this.selectedType;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }

  getStatusCount(status: string): number {
    return this.reservations.filter(r => r.status === status).length;
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'approved': 'Approuvée',
      'rejected': 'Rejetée',
      'suggested': 'Suggérée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }

  getPriorityLabel(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'low': 'Faible',
      'normal': 'Normale',
      'high': 'Haute',
      'urgent': 'Urgente'
    };
    return priorityMap[priority] || priority;
  }

  getTypeLabel(type: string): string {
    const typeMap: { [key: string]: string } = {
      'individual': 'Individuelle',
      'group': 'Groupe',
      'lecturerUse': 'Enseignant'
    };
    return typeMap[type] || type;
  }

  getTypeIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'individual': 'fas fa-user',
      'group': 'fas fa-users',
      'lecturerUse': 'fas fa-chalkboard-teacher'
    };
    return iconMap[type] || 'fas fa-calendar';
  }

  viewReservation(reservation: Reservation): void {
    console.log('Viewing reservation:', reservation);
  }

  approveReservation(reservation: Reservation): void {
    reservation.status = 'approved';
    reservation.managerDecisionAt = new Date();
    console.log('Approving reservation:', reservation);
  }

  rejectReservation(reservation: Reservation): void {
    reservation.status = 'rejected';
    reservation.managerDecisionAt = new Date();
    console.log('Rejecting reservation:', reservation);
  }

  editReservation(reservation: Reservation): void {
    console.log('Editing reservation:', reservation);
  }

  createReservation(): void {
    if (this.motivation.trim()) {
      this.newReservation.comments = [{
        commenterId: 'current-user-id',
        commentText: this.motivation,
        createdAt: new Date()
      }];
    }
    
    this.newReservation.requestedAt = new Date();
    this.newReservation.createdAt = new Date();
    this.newReservation.updatedAt = new Date();
    
    console.log('Creating new reservation:', this.newReservation);
    this.showAddDialog = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newReservation = {
      activities: [],
      equipmentIds: [],
      priority: 'normal',
      reservationType: 'individual',
      requesterRole: 'student',
      groupMembers: [],
      history: [],
      notificationIds: [],
      comments: []
    };
    this.motivation = '';
  }
}
