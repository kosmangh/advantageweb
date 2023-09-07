import { Routes } from '@angular/router';

export const OCCUPANCY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./occupancy.component').then((c) => c.OccupancyComponent),
    children: [
      {
        path: 'occupants',
        loadComponent: () =>
          import('./occupants/occupants.component').then((c) => c.OccupantsComponent),
      },
      {
        path: 'occupant-properties',
        loadComponent: () =>
          import('./occupant-properties/occupant-properties.component').then((c) => c.OccupantPropertyComponent),
      },
      {
        path: 're-assignments',
        loadComponent: () =>
          import('./re-assignment/re-assignment.component').then((c) => c.ReAssignmentComponent),
      },
      
    ]
  }
  
  
];

