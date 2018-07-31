import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SelectedComponent } from './selected/selected.component';
import { CoinsComponent } from './coins/coins.component';

export const routes: Routes = [
  { path: '', redirectTo: '/coins', pathMatch: 'full' },
  { path: 'coins', component: CoinsComponent },
  { path: 'coins/:page', component: SelectedComponent },
  { path: '**', redirectTo: '/coins', pathMatch: 'full' } // Wrong url redirect
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
