import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

/**
 * `/alt` is a temporary side-by-side for choosing the hero photo — same page,
 * other picture, so both can sit open in two tabs. Delete the second route (and
 * the Hero `variant` input) once the decision is made.
 */
export const routes: Routes = [
  { path: '', component: Home, data: { heroVariant: 'original' } },
  { path: 'alt', component: Home, data: { heroVariant: 'alt' } },
  { path: '**', redirectTo: '' },
];
