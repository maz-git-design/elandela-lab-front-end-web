import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ElementRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { useFaceRegistrationViewModel } from './view-models/face-registration.view-model';

@Component({
  selector: 'app-face-registration',
  imports: [
    Divider,
    TranslateModule,
    CommonModule,
    Button,
    FormsModule,
  ],
  templateUrl: './face-registration.html',
  styleUrl: './face-registration.scss',
})
export class FaceRegistration {
  private readonly router = inject(Router);
  readonly vm = useFaceRegistrationViewModel();

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  stream: MediaStream | null = null;
  previousFrameData: ImageData | null = null;
  detectionInterval: any;

  constructor() {
    effect(() => {
      if (this.vm.success()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  async startFaceCapture() {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      setTimeout(() => {
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.videoElement.nativeElement.play();
          this.startMovementDetection();
        }
      }, 100);
      
      this.vm.startCapture();
    } catch (error) {
      console.error('Camera access failed:', error);
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

      const stepData = this.generateStepBiometricData(canvas, this.vm.currentStep());
      this.vm.captureStep(stepData);
      this.stopCapture();
    }
  }

  stopCapture() {
    this.stopMovementDetection();
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
    this.vm.stopCapture();
    this.resetDetectionState();
  }

  startMovementDetection() {
    this.detectionInterval = setInterval(() => {
      this.detectMovementAndPosition();
    }, 200);
  }

  stopMovementDetection() {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
  }

  resetDetectionState() {
    this.previousFrameData = null;
  }

  detectMovementAndPosition() {
    const video = this.videoElement?.nativeElement;
    const canvas = this.canvasElement?.nativeElement;
    
    if (!video || !canvas || video.videoWidth === 0) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const currentFrameData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    if (this.previousFrameData) {
      const movement = this.calculateMovement(this.previousFrameData, currentFrameData);
      const isMovementDetected = movement > 1000;
      const isPositionCorrect = this.validatePosition(currentFrameData);
      
      this.vm.updateDetection(isMovementDetected, isPositionCorrect);
    }
    
    this.previousFrameData = currentFrameData;
  }

  calculateMovement(prev: ImageData, current: ImageData): number {
    let diff = 0;
    for (let i = 0; i < prev.data.length; i += 16) {
      diff += Math.abs(prev.data[i] - current.data[i]);
    }
    return diff;
  }

  validatePosition(frameData: ImageData): boolean {
    const centerRegion = this.analyzeCenterRegion(frameData);
    const threshold = 50 + (this.vm.currentStep() * 10);
    return centerRegion > threshold;
  }

  analyzeCenterRegion(frameData: ImageData): number {
    const { width, height, data } = frameData;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;
    
    let intensity = 0;
    let pixelCount = 0;
    
    for (let y = centerY - radius; y < centerY + radius; y++) {
      for (let x = centerX - radius; x < centerX + radius; x++) {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const index = (y * width + x) * 4;
          intensity += (data[index] + data[index + 1] + data[index + 2]) / 3;
          pixelCount++;
        }
      }
    }
    
    return pixelCount > 0 ? intensity / pixelCount : 0;
  }

  generateStepBiometricData(canvas: HTMLCanvasElement, step: number): string {
    const imageData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
    if (imageData) {
      let hash = 0;
      const data = imageData.data;
      const stepOffset = step * 1000;
      for (let i = stepOffset; i < data.length; i += 32) {
        hash = ((hash << 3) - hash + data[i] + data[i+1] + data[i+2] + step) & 0xffffffff;
      }
      return Math.abs(hash).toString().padStart(10, '0').slice(0, 10);
    }
    return (Date.now() + step).toString().slice(-10);
  }

  registerFaceData() {
    if (this.vm.allStepsCompleted()) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.vm.registerFace({
        biometricSteps: this.vm.capturedSteps(),
        biometricId: this.vm.finalBiometricId(),
        userId: currentUser.id || ''
      });
    }
  }
}