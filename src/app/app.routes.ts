import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((routes) => routes.authRoutes),
    //canActivateChild: [UnauthGuard]
  },
  {
    path: 'protected',
    loadChildren: () =>
      import('./features/protected/proctected.routes').then(
        (routes) => routes.protectedRoutes
      ),
    //canActivateChild: [AuthGuard]
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./features/public/public.routes').then(
        (routes) => routes.publicRoutes
      ),
  },
  { path: '**', redirectTo: '/auth/login' },
];
