import { HouseRentBackBillingComponent } from './house-rent-billing/house-rent-back-billing.component';
import { HouseRentBillingComponent } from './house-rent-billing/house-rent-billing.component';
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
          import('./ground-property-charge/property-charge-list.component').then((c) => c.PropertyChargeListComponent),
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
          import('./house-rent-billing/house-rent-billing.component').then((c) => c.HouseRentBillingComponent),
      },
      {
        path: 'back-rental-billing',
        loadComponent: () =>
          import('./house-rent-billing/house-rent-back-billing.component').then((c) => c.HouseRentBackBillingComponent),
      },

    ]
  }


];

