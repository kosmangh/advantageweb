import { LedgerSummariesComponent } from './ledger-reports/ledger-summaries/ledger-summaries.component';
import { GroundRentDemandNoticeComponent } from './ground-rent-demand-notice/ground-rent-demand-notice.component';
import { GeneralReportsComponent } from './general-reports.component';
import { Routes } from '@angular/router';

export const GENERAL_REPORTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./general-reports.component').then((c) => c.GeneralReportsComponent),
    children: [
      {
        path: 'bill-reports',
        loadComponent: () =>
          import('./bills-report/bills-report.component').then((c) => c.BillsReportComponent),
      },
      {
        path: 'ground-rent-demand-notice',
        loadComponent: () =>
          import('./ground-rent-demand-notice/ground-rent-demand-notice.component').then((c) => c.GroundRentDemandNoticeComponent),
      },
      {
        path: 'ledger-reports',
        loadChildren: () =>
          import('./ledger-reports/ledger-reports.routing').then((m) => m.LEDGER_REPORTS_ROUTES),
      },
      {
        path: 'ledger-payments',
        loadComponent: () =>
          import('./ledger-reports/ledger-payments/ledger-payments.component').then((c) => c.LedgerPaymentsComponent),
      },
      {
        path: 'ledger-summaries',
        loadComponent: () =>
          import('./ledger-reports/ledger-summaries/ledger-summaries.component').then((c) => c.LedgerSummariesComponent),
      },
      {
        path: 'property-usage',
        loadComponent: () =>
          import('./property-usage/property-usage.component').then((c) => c.PropertyUsageComponent),
      },

    ]
  }


];

