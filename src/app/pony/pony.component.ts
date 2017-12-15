import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PonyModel } from '@app/models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css'],
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() ponyClicked: EventEmitter<PonyModel> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getPonyImageUrl() {
    const runningPart = this.isRunning ? '-running' : '';
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${runningPart}.gif`;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
