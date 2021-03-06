import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}
