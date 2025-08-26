import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Password } from 'primeng/password';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { useSetPasswordViewModel } from './view-models/set-password.view-model';

@Component({
  selector: 'app-set-password',
  imports: [
    Divider,
    TranslateModule,
    Password,
    CommonModule,
    ReactiveFormsModule,
    IconField,
    InputIcon,
    Button,
    FormsModule,
  ],
  templateUrl: './set-password.html',
  styleUrl: './set-password.scss',
})
export class SetPassword {
  private readonly router = inject(Router);
  readonly vm = useSetPasswordViewModel();

  passwordMatchValidator = (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };

  setPasswordForm = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    this.passwordMatchValidator
  );

  constructor() {
    effect(() => {
      if (this.vm.success()) {
        const currentUser = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        );
        if (!currentUser.faceData) {
          this.router.navigate(['/auth/face-registration']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  get oldPassword() {
    return this.setPasswordForm.get('oldPassword');
  }

  get password() {
    return this.setPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.setPasswordForm.get('confirmPassword');
  }

  setPassword() {
    if (this.setPasswordForm.valid) {
      const { oldPassword, password, confirmPassword } =
        this.setPasswordForm.value;
      this.vm.setPassword({
        oldPassword: oldPassword!,
        newPassword: password!,
        confirmPassword: confirmPassword!,
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
