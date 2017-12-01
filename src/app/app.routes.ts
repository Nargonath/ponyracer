import { HomeComponent } from '@app/home/home.component';
import { RacesComponent } from '@app/races/races.component';

export const ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'races', component: RacesComponent },
];
