import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PonyModel } from '@app/models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css'],
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Output() ponyClicked: EventEmitter<PonyModel> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getPonyImageUrl() {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
