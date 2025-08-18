import { Routes } from '@angular/router';

export const publicRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public').then((c) => c.Public),
    children: [
      { path: '', redirectTo: '/public', pathMatch: 'full' },
      //   {
      //     path: 'dashboard',
      //     loadComponent: () =>
      //       import('./dashboard/dashboard').then((c) => c.Dashboard),
      //   },
    ],
  },
];
