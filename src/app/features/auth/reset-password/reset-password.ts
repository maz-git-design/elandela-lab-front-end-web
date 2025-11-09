import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { Divider } from 'primeng/divider';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IconField,
    InputIcon,
    Divider,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  token: string = '';

  get email() {
    return this.resetForm.get('email');
  }

  get password() {
    return this.resetForm.get('password');
  }

  constructor(
    readonly fb: FormBuilder,
    readonly authService: AuthService,
    readonly messageService: MessageService,
    readonly router: Router,
    readonly route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'] || '';
    // if (!this.token) {
    //   this.router.navigate(['/auth/login']);
    // }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
