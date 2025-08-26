import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth').then((c) => c.Auth),
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./login/login').then((c) => c.Login),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./reset-password/reset-password').then(
            (c) => c.ResetPassword
          ),
      },

      {
        path: 'set-password',
        loadComponent: () =>
          import('./set-password/set-password').then((c) => c.SetPassword),
      },
      {
        path: 'face-registration',
        loadComponent: () =>
          import('./face-registration/face-registration').then(
            (c) => c.FaceRegistration
          ),
      },
      {
        path: 'login/verify',
        loadComponent: () => import('./otp/otp').then((c) => c.Otp),
      },
      { path: '**', redirectTo: '/auth/login' },
    ],
  },
];
