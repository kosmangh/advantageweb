import { Routes } from '@angular/router';

export const NOTIFICATIONS_SETUP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./notifications.component').then((c) => c.NotificationsComponent),
    children: [
      {
        path: 'sms-blast',
        loadComponent: () =>
          import('./sms-blast/sms-blast.component').then((c) => c.SmsBlastComponent),
      },
      {
        path: 'bill-sms-blast',
        loadComponent: () =>
          import('./bills-sms-blast/bills-sms-blast.component').then((c) => c.BillsSmsBlastComponent),
      },
    ]
  }

];



