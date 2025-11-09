import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../core/services/user.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { StepsModule } from 'primeng/steps';
import { MessageService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ProgressBarModule,
    CardModule,
    DividerModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    StepsModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  providers: [MessageService],
})
export class Profile implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  currentUser: User | null = null;
  departments = [
    { label: 'Informatique', value: 'informatique' },
    { label: 'Biologie', value: 'biologie' },
    { label: 'Chimie', value: 'chimie' },
    { label: 'Physique', value: 'physique' },
    { label: 'Mathématiques', value: 'mathematiques' },
  ];

  // Face registration
  showFaceDialog = false;
  isCapturing = false;
  stream: MediaStream | null = null;
  faceRegistered = false;
  availableCameras: MediaDeviceInfo[] = [];
  selectedCamera: string = '';
  faceDetectionSteps: MenuItem[] = [
    { label: 'Caméra', icon: 'fas fa-camera' },
    { label: 'Position', icon: 'fas fa-crosshairs' },
    { label: 'Capture', icon: 'fas fa-user-check' },
  ];
  activeStepIndex = 0;

  // Password change
  showPasswordDialog = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.initForm();
    this.initPasswordForm();
    this.faceRegistered = !!this.currentUser?.faceFingerprint;
    this.loadAvailableCameras();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [this.currentUser?.name || '', Validators.required],
      email: [
        this.currentUser?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [this.currentUser?.phone || ''],
      department: [this.currentUser?.department || ''],
      dateOfBirth: [
        this.currentUser?.dateOfBirth
          ? new Date(this.currentUser.dateOfBirth)
          : null,
      ],
      address: [this.currentUser?.address || ''],
      studentId: [this.currentUser?.studentId || ''],
      employeeId: [this.currentUser?.employeeId || ''],
    });
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    return newPassword &&
      confirmPassword &&
      newPassword.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = { ...this.profileForm.value };
      if (formData.dateOfBirth) {
        formData.dateOfBirth = formData.dateOfBirth.toISOString().split('T')[0];
      }

      this.userService.updateProfile(formData);
      this.currentUser = this.userService.getCurrentUser();

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Profil mis à jour avec succès',
      });
    }
  }

  async loadAvailableCameras() {
    try {
      // Request permission first to get device labels
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        });

      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableCameras = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      if (this.availableCameras.length > 0) {
        this.selectedCamera = this.availableCameras[0].deviceId;
      }
    } catch (error) {
      console.error('Error loading cameras:', error);
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: "Impossible d'accéder aux caméras. Vérifiez les permissions.",
      });
    }
  }

  openFaceRegistrationDialog() {
    this.showFaceDialog = true;
    this.activeStepIndex = 0;
  }

  async startFaceCapture() {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      };

      if (this.selectedCamera) {
        constraints.video = {
          ...(typeof constraints.video === 'object' ? constraints.video : {}),
          deviceId: { exact: this.selectedCamera },
        };
      }

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Wait for video element to be available
      setTimeout(() => {
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.videoElement.nativeElement.play();
        }
      }, 100);

      this.isCapturing = true;
      this.activeStepIndex = 1;
    } catch (error: any) {
      console.error('Camera access error:', error);
      let errorMessage = "Impossible d'accéder à la caméra";

      if (error.name === 'NotAllowedError') {
        errorMessage = "Permission d'accès à la caméra refusée";
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'Aucune caméra trouvée';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Caméra déjà utilisée par une autre application';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: errorMessage,
      });
    }
  }

  captureFace() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context && video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const faceData = canvas.toDataURL('image/jpeg', 0.8);
      this.userService.updateProfile({ faceFingerprint: faceData });
      this.faceRegistered = true;
      this.activeStepIndex = 2;

      this.stopCapture();

      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Données faciales enregistrées avec succès',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail:
          "Impossible de capturer l'image. Vérifiez que la caméra fonctionne.",
      });
    }
  }

  stopCapture() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
    this.isCapturing = false;
    if (this.activeStepIndex !== 2) {
      this.activeStepIndex = 0;
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      // Simulate password change
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Mot de passe modifié avec succès',
      });
      this.showPasswordDialog = false;
      this.passwordForm.reset();
    }
  }

  get cameraOptions() {
    return this.availableCameras.map((camera) => ({
      label: camera.label || `Caméra ${camera.deviceId.slice(0, 8)}`,
      value: camera.deviceId,
    }));
  }

  get profileCompletion() {
    return this.currentUser?.profileCompletion || 0;
  }

  get isStudent() {
    return this.currentUser?.role === 'student';
  }

  get isTeacherOrAdmin() {
    return (
      this.currentUser?.role === 'teacher' || this.currentUser?.role === 'admin'
    );
  }

  get passwordFormValid() {
    return this.passwordForm.valid;
  }
}
