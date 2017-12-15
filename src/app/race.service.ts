import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { RaceModel } from '@app/models/race.model';
import { PonyWithPositionModel } from '@app/models/pony.model';
import { environment } from 'environments/environment';

@Injectable()
export class RaceService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {
      params: { status: 'PENDING' },
    });
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, {
      ponyId,
    });
  }

  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${id}`);
  }

  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return Observable.interval(1000)
      .take(101)
      .map(position => [
        {
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position,
        },
        {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position,
        },
        {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position,
        },
        {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position,
        },
        {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position,
        },
      ]);
  }
}
