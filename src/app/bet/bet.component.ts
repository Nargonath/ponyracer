import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RaceModel } from '@app/models/race.model';
import { PonyModel } from '@app/models/pony.model';
import { RaceService } from '@app/race.service';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css'],
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(Number(id)).subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony: PonyModel) {
    this.raceService.bet(this.raceModel.id, pony.id).subscribe(updatedRace => {
      this.betFailed = false;
      this.raceModel.betPonyId = updatedRace.betPonyId;
    }, () => (this.betFailed = true));
  }

  isPonySelected(pony) {
    return pony.id === this.raceModel.betPonyId;
  }
}
