import { USER_ACCOUNTS_ROUTES } from './user-accounts/user-accounts.routing';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'reset',
    loadComponent: () =>
      import('./password-reset/password-reset.component').then((c) => c.PasswordResetComponent)
  },


  {
    path: '',
    loadComponent: () =>
      import('./@shared/layout/main-content/main-content.component').then((c) => c.MainContentComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.routing').then((m) => m.ESTATE_SETUP_ROUTES),
      },
      {
        path: 'occupancy',
        loadChildren: () =>
          import('./occupancy/occupancy.routing').then((m) => m.OCCUPANCY_ROUTES),
      },
      {
        path: 'estate-billing',
        loadChildren: () =>
          import('./estate-billing/estate-billing.routing').then((m) => m.ESTATE_BILLING_ROUTES),
      },
      {
        path: 'estate-bill-payment',
        loadChildren: () =>
          import('./estate-bill-payment/estate-billing-payment.routing').then((m) => m.ESTATE_BILL_PAYMENT_ROUTES),
      },
      {
        path: 'general-reports',
        loadChildren: () =>
          import('./general-reports/general-reports.routing').then((m) => m.GENERAL_REPORTS_ROUTES),
      },
      {
        path: 'user-accounts',
        loadChildren: () =>
        import('./user-accounts/user-accounts.routing').then((c) => c.USER_ACCOUNTS_ROUTES)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.routing').then((m) => m.NOTIFICATIONS_SETUP_ROUTES),
      }
    ]

  },

  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
  },

];

