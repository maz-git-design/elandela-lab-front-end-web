import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { ProgressSpinner } from 'primeng/progressspinner';

interface Attendance {
  _id: string;
  reservationId: string;
  userId: string;
  status: 'present' | 'absent' | 'late' | 'left_early';
  confirmedAt: Date;
  confirmedBy?: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-attendances',
  imports: [CommonModule, FormsModule, Button, InputText, Dialog, TableModule, Tooltip, Select, DatePicker, Textarea, ProgressSpinner],
  templateUrl: './attendances.html',
  styleUrl: './attendances.scss'
})
export class Attendances implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  attendances: Attendance[] = [
    {
      _id: '1',
      reservationId: 'res1',
      userId: 'user1',
      status: 'present',
      confirmedAt: new Date('2024-01-20T14:05:00'),
      confirmedBy: 'manager1',
      comments: 'Arrivé à l\'heure',
      createdAt: new Date('2024-01-20T14:05:00'),
      updatedAt: new Date('2024-01-20T14:05:00')
    },
    {
      _id: '2',
      reservationId: 'res2',
      userId: 'user2',
      status: 'late',
      confirmedAt: new Date('2024-01-22T09:15:00'),
      confirmedBy: 'manager1',
      comments: 'Arrivé avec 15 minutes de retard',
      createdAt: new Date('2024-01-22T09:15:00'),
      updatedAt: new Date('2024-01-22T09:15:00')
    },
    {
      _id: '3',
      reservationId: 'res3',
      userId: 'user3',
      status: 'absent',
      confirmedAt: new Date('2024-01-25T10:30:00'),
      confirmedBy: 'manager1',
      comments: 'Absence non justifiée',
      createdAt: new Date('2024-01-25T10:30:00'),
      updatedAt: new Date('2024-01-25T10:30:00')
    },
    {
      _id: '4',
      reservationId: 'res2',
      userId: 'user4',
      status: 'left_early',
      confirmedAt: new Date('2024-01-22T11:30:00'),
      confirmedBy: 'manager1',
      comments: 'Parti 30 minutes avant la fin',
      createdAt: new Date('2024-01-22T11:30:00'),
      updatedAt: new Date('2024-01-22T11:30:00')
    }
  ];

  statusOptions = [
    { label: 'Présent', value: 'present' },
    { label: 'Absent', value: 'absent' },
    { label: 'En retard', value: 'late' },
    { label: 'Parti tôt', value: 'left_early' }
  ];

  reservationOptions = [
    { label: 'Réservation Lab Chimie - 20/01', value: 'res1' },
    { label: 'Réservation Lab Physique - 22/01', value: 'res2' },
    { label: 'Réservation Lab Biologie - 25/01', value: 'res3' }
  ];

  userOptions = [
    { label: 'Marie Dubois', value: 'user1' },
    { label: 'Pierre Martin', value: 'user2' },
    { label: 'Sophie Bernard', value: 'user3' },
    { label: 'Jean Moreau', value: 'user4' }
  ];

  searchTerm: string = '';
  selectedStatus: string = '';
  selectedDate: Date | null = null;
  showAddDialog: boolean = false;
  showFaceRecognitionDialog: boolean = false;
  
  // Face recognition properties
  stream: MediaStream | null = null;
  isScanning: boolean = false;
  recognitionResult: string = '';
  faceDetected: boolean = false;
  scanningInterval: any;
  
  // Mock face database
  faceDatabase = [
    { userId: 'user1', name: 'Marie Dubois', faceId: 'face_001' },
    { userId: 'user2', name: 'Pierre Martin', faceId: 'face_002' },
    { userId: 'user3', name: 'Sophie Bernard', faceId: 'face_003' },
    { userId: 'user4', name: 'Jean Moreau', faceId: 'face_004' }
  ];

  ngOnInit(): void {
    console.log('Attendances component initialized');
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  get filteredAttendances(): Attendance[] {
    return this.attendances.filter(attendance => {
      const matchesSearch = !this.searchTerm || 
        attendance.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        attendance.reservationId.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.selectedStatus || attendance.status === this.selectedStatus;
      
      const matchesDate = !this.selectedDate || 
        attendance.confirmedAt.toDateString() === this.selectedDate.toDateString();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  getStatusCount(status: string): number {
    return this.attendances.filter(a => a.status === status).length;
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'present': 'Présent',
      'absent': 'Absent',
      'late': 'En retard',
      'left_early': 'Parti tôt'
    };
    return statusMap[status] || status;
  }

  viewAttendance(attendance: Attendance): void {
    console.log('Viewing attendance:', attendance);
  }

  editAttendance(attendance: Attendance): void {
    console.log('Editing attendance:', attendance);
  }

  createAttendance(): void {
    console.log('Creating new attendance');
    this.showAddDialog = false;
  }

  // Face Recognition Methods
  async startFaceRecognition(): Promise<void> {
    this.showFaceRecognitionDialog = true;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      setTimeout(() => {
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.startScanning();
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.recognitionResult = 'Erreur d\'accès à la caméra';
    }
  }

  startScanning(): void {
    this.isScanning = true;
    this.recognitionResult = 'Recherche de visage...';
    
    this.scanningInterval = setInterval(() => {
      this.detectFace();
    }, 1000);
  }

  detectFace(): void {
    // Simulate face detection and recognition
    const randomDetection = Math.random();
    
    if (randomDetection > 0.7) {
      this.faceDetected = true;
      this.recognitionResult = 'Visage détecté, reconnaissance...';
      
      setTimeout(() => {
        this.recognizeFace();
      }, 1500);
    }
  }

  recognizeFace(): void {
    // Simulate face recognition
    const randomUser = this.faceDatabase[Math.floor(Math.random() * this.faceDatabase.length)];
    
    this.recognitionResult = `Utilisateur reconnu: ${randomUser.name}`;
    this.autoMarkAttendance(randomUser.userId, randomUser.name);
    
    setTimeout(() => {
      this.stopScanning();
    }, 2000);
  }

  autoMarkAttendance(userId: string, userName: string): void {
    const newAttendance: Attendance = {
      _id: Date.now().toString(),
      reservationId: 'res1',
      userId: userId,
      status: 'present',
      confirmedAt: new Date(),
      confirmedBy: 'face_recognition',
      comments: `Présence confirmée automatiquement par reconnaissance faciale - ${userName}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.attendances.unshift(newAttendance);
    console.log('Auto-attendance marked:', newAttendance);
  }

  stopScanning(): void {
    this.isScanning = false;
    if (this.scanningInterval) {
      clearInterval(this.scanningInterval);
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.stopScanning();
  }

  closeFaceRecognition(): void {
    this.stopCamera();
    this.showFaceRecognitionDialog = false;
    this.faceDetected = false;
    this.recognitionResult = '';
  }
}
