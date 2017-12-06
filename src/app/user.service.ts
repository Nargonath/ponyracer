import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from '@app/models/user.model';
import { environment } from 'environments/environment';
import { JwtInterceptorService } from '@app/jwt-interceptor.service';

@Injectable()
export class UserService {
  userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private jwtService: JwtInterceptorService) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, {
      login,
      password,
      birthYear,
    });
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials)
      .do<UserModel>(user => this.storeLoggedInUser(user));
  }

  retrieveUser() {
    const serializedUser = window.localStorage.getItem('rememberMe');

    if (!serializedUser) {
      return null;
    }

    const user = JSON.parse(serializedUser);
    this.jwtService.setJwtToken(user.token);
    return this.userEvents.next(user);
  }

  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.jwtService.setJwtToken(user.token);
    this.userEvents.next(user);
  }

  logout() {
    window.localStorage.removeItem('rememberMe');
    this.jwtService.removeJwtToken();
    this.userEvents.next(null);
  }
}
