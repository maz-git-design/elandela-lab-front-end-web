import { Routes } from '@angular/router';

export const protectedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./protected').then((c) => c.Protected),
    children: [
      { path: '', redirectTo: '/protected/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard').then((c) => c.Dashboard),
      },
    ],
  },
];
