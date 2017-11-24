import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

import { RaceModel } from '@app/models/race.model';

@Injectable()
export class RaceService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>('http://ponyracer.ninja-squad.com/api/races', {
      params: { status: 'PENDING' },
    });
  }
}
