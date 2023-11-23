import { Routes } from '@angular/router';

export const ESTATE_SETUP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./settings.component').then((c) => c.SettingsComponent),
    children: [
      {
        path: 'zones',
        loadComponent: () =>
          import('./zones/zones.component').then((c) => c.ZonesComponent),
      },
      {
        path: 'regions',
        loadComponent: () =>
          import('./regions/regions.component').then((c) => c.RegionsComponent),
      },
      {
        path: 'estates',
        loadComponent: () =>
          import('./estates/estate-list.component').then((c) => c.EstateListComponent),
      },
      {
        path: 'estate-blocks',
        loadComponent: () =>
          import('./estate-blocks/estate-blocks.component').then((c) => c.EstateBlocksComponent
          ),
      },
      {
        path: 'estate-properties',
        loadComponent: () =>
          import('./estate-properties/estate-properties.component').then((c) => c.EstatePropertiesComponent
          ),
      },
    ]
  }

];



