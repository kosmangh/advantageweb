import { Routes } from '@angular/router';

export const LEDGER_REPORTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ledger-reports.component').then((c) => c.LedgerReportsComponent),
    children: [
      {
        path: 'ledger-categories',
        loadComponent: () =>
          import('./ledger-categories/ledger-categories.component').then((c) => c.LedgerCategoriesComponent),
      },
      {
        path: 'ledger-payments',
        loadComponent: () =>
          import('./ledger-payments/ledger-payments.component').then((c) => c.LedgerPaymentsComponent),
      },
      {
        path: 'ledger-summaries',
        loadComponent: () =>
          import('./ledger-summaries/ledger-summaries.component').then((c) => c.LedgerSummariesComponent),
      },
    ]
  }


];

