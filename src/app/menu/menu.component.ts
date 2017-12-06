import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '@app/user.service';
import { UserModel } from '@app/models/user.model';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed: Boolean = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}
