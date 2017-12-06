import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';

import { UserModel } from '@app/models/user.model';

@Injectable()
export class UserService {
  userEvents: Subject<UserModel> = new Subject<UserModel>();

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
