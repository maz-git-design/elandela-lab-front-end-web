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
      {
        path: 'users',
        loadComponent: () => import('./users/users').then((c) => c.Users),
      },
      {
        path: 'labs',
        loadComponent: () => import('./labs/labs').then((c) => c.Labs),
      },
      {
        path: 'equipments',
        loadComponent: () =>
          import('./equipments/equipments').then((c) => c.Equipments),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./reservations/reservations').then((c) => c.Reservations),
      },
      {
        path: 'attendances',
        loadComponent: () =>
          import('./attendances/attendances').then((c) => c.Attendances),
      },
      {
        path: 'administrations',
        loadComponent: () =>
          import('./administrations/administrations').then(
            (c) => c.Administrations
          ),
        children: [
          {
            path: '',
            redirectTo: '/protected/administrations/activities',
            pathMatch: 'full',
          },
          {
            path: 'activities',
            loadComponent: () =>
              import('./administrations/activities/activities').then(
                (c) => c.Activities
              ),
          },
          {
            path: 'cohorts',
            loadComponent: () =>
              import('./administrations/cohorts/cohorts').then(
                (c) => c.Cohorts
              ),
          },
          {
            path: 'departments',
            loadComponent: () =>
              import('./administrations/departments/departments').then(
                (c) => c.Departments
              ),
          },
          {
            path: 'academic-years',
            loadComponent: () =>
              import('./administrations/academic-years/academic-years').then(
                (c) => c.AcademicYears
              ),
          },
          {
            path: 'equipment-categories',
            loadComponent: () =>
              import(
                './administrations/equipment-categories/equipment-categories'
              ).then((c) => c.EquipmentCategories),
          },
        ],
      },
      {
        path: 'accesses',
        loadComponent: () =>
          import('./accesses/accesses').then((c) => c.Accesses),
        children: [
          {
            path: '',
            redirectTo: '/protected/accesses/modules',
            pathMatch: 'full',
          },
          {
            path: 'modules',
            loadComponent: () =>
              import('./accesses/modules/modules').then((c) => c.Modules),
          },
          {
            path: 'roles',
            loadComponent: () =>
              import('./accesses/roles/roles').then((c) => c.Roles),
          },
          {
            path: 'permissions',
            loadComponent: () =>
              import('./accesses/permissions/permissions').then(
                (c) => c.Permissions
              ),
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((c) => c.Profile),
      },
    ],
  },
];
