import { Routes } from '@angular/router';

export const ESTATE_BILL_PAYMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./estate-bill-payment.component').then((c) => c.EstateBillPaymentComponent),
    children: [
      {
        path: 'bill-payment',
        loadComponent: () =>
          import('./bill-payment/bill-payment.component').then((c) => c.BillPaymentComponent),
      },
      {
        path: 'payment-reversal',
        loadComponent: () =>
          import('./payment-reversal/payment-reversal.component').then((c) => c.PaymentReversalComponent),
      },
      {
        path: 'payment-records',
        loadComponent: () =>
          import('./payment-records/payment-records.component').then((c) => c.PaymentRecordsComponent),
      },
      {
        path: 'property-ledger',
        loadComponent: () =>
          import('./property-ledger/property-ledger.component').then((c) => c.PropertyLedgerComponent),
      },
      {
        path: 'demand-notice',
        loadComponent: () =>
          import('./demand-notice/demand-notice.component').then((c) => c.DemandNoticeComponent),
      },
    ]
  }


];

