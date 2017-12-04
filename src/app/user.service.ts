import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserModel } from '@app/models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`http://ponyracer.ninja-squad.com/api/users`, {
      login,
      password,
      birthYear,
    });
  }
}
