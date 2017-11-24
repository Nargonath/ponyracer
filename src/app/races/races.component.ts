import { Component, OnInit, Injectable } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '@app/race.service';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css'],
})
export class RacesComponent implements OnInit {
  races: Array<RaceModel> = [];

  constructor(public service: RaceService) {}

  ngOnInit() {
    this.service
      .list()
      .subscribe(races => (this.races = races), console.error, () => console.log('done'));
  }
}
