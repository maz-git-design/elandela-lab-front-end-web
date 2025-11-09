import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { useLoginViewModel } from './view-models/login.view-model';

@Component({
  selector: 'app-login',
  imports: [
    Divider,
    InputText,
    TranslateModule,
    Password,
    CommonModule,
    ReactiveFormsModule,
    Checkbox,
    IconField,
    InputIcon,
    Button,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  readonly vm = useLoginViewModel();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rememberMe: new FormControl(true),
  });

  constructor() {
    effect(() => {
      const user = this.vm.user();
      if (user) {
        console.log(user);
        if (user.mustSetNewPassword) {
          this.router.navigate(['/auth/set-password']);
        } else if (!user.faceFingerprint) {
          this.router.navigate(['/auth/face-registration']);
        } else {
          this.router.navigate(['protected/dashboard']);
        }
      }
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signin() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.vm.login({
        email: email!,
        password: password!,
        rememberMe: rememberMe!,
      });
    }
  }

  onRememberMeChange(event: any) {
    if (event.checked) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('email', this.loginForm.get('email')!.value!);
    } else {
      localStorage.setItem('rememberMe', 'false');
      localStorage.removeItem('email');
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/reset-password']);
  }
}
