import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
    Button,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    const rememberMe = localStorage.getItem('rememberMe');

    this.loginForm.patchValue({
      email,
      rememberMe: rememberMe === 'true',
    });
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rememberMe: new FormControl(true),
  });
  loading: boolean = false;
  captcha: string = '';
  _email: string = '';
  _password: string = '';

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async signin() {}

  private goToOTPPage(): void {
    this.router.navigate(['/auth/otp']);
  }

  checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  resolved(captchaResponse: any): void {
    this.loading = true;
    this.captcha = captchaResponse;
    this.signin();
  }

  onRememberMeChange(event: any) {
    if (event.checked) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('email', this.loginForm.get('email')!.value);
    } else {
      localStorage.setItem('rememberMe', 'false');
      localStorage.removeItem('email');
    }
  }
}
