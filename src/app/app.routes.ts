import { HomeComponent } from '@app/home/home.component';
import { RacesComponent } from '@app/races/races.component';
import { RegisterComponent } from '@app/register/register.component';
import { LoginComponent } from '@app/login/login.component';
import { BetComponent } from '@app/bet/bet.component';

export const ROUTES = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    children: [
      { path: '', component: RacesComponent },
      { path: ':raceId', component: BetComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
