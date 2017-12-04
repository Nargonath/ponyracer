import { HomeComponent } from '@app/home/home.component';
import { RacesComponent } from '@app/races/races.component';
import { RegisterComponent } from '@app/register/register.component';

export const ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'races', component: RacesComponent },
  { path: 'register', component: RegisterComponent },
];
