import { BackRentalBillingComponent } from './back-rental-billing/back-rental-billing.component';
import { RentalBillingComponent } from './rental-billing/rental-billing.component';
import { Region } from './../@models/settings/region';
import { Routes } from '@angular/router';

export const ESTATE_BILLING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./estate-billing.component').then((c) => c.EstateBillingComponent),
    children: [
      {
        path: 'charges',
        loadComponent: () =>
          import('./property-charge/property-charge-list.component').then((c) => c.PropertyChargeListComponent),
      },
      {
        path: 'penalties',
        loadComponent: () =>
          import('./penalties/penalties.component').then((c) => c.PenaltiesComponent),
      },
      {
        path: 'ground-rent-billing',
        loadComponent: () =>
          import('./ground-rent-billing/ground-rent-billing.component').then((c) => c.GroundRentBillingComponent),
      },
      {
        path: 'rental-billing',
        loadComponent: () =>
          import('./rental-billing/rental-billing.component').then((c) => c.RentalBillingComponent),
      },
      {
        path: 'back-rental-billing',
        loadComponent: () =>
          import('./back-rental-billing/back-rental-billing.component').then((c) => c.BackRentalBillingComponent),
      },

    ]
  }


];

