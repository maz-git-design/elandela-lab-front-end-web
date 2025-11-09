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
    canActivateChild: [() => import('./core/guards/protected.guard').then(g => g.ProtectedGuard)]
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
