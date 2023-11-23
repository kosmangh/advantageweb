import { Routes } from '@angular/router';

export const USER_ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-accounts.component').then((c) => c.UserAccountsComponent),
    children: [
      {
        path: 'departments',
        loadComponent: () =>
          import('./department-list/department-list.component').then((c) => c.DepartmentListComponent),
      },
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./audit-logs/audit-logs.component').then((c) => c.AuditLogsComponent),
      },
    
      {
        path: 'users',
        loadComponent: () =>
          import('./staffs/staff-list.component').then((c) => c.StaffListComponent),
      },
    ]
  }

];



