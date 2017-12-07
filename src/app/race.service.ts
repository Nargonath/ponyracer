import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

import { RaceModel } from '@app/models/race.model';
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
}
