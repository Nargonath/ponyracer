import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from '@app/models/user.model';

@Injectable()
export class UserService {
  userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {}

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`http://ponyracer.ninja-squad.com/api/users`, {
      login,
      password,
      birthYear,
    });
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`http://ponyracer.ninja-squad.com/api/users/authentication`, credentials)
      .do<UserModel>(user => this.userEvents.next(user));
  }
}
