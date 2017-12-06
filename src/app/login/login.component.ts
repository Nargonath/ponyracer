import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@app/user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: { login: string; password: string };
  authenticationFailed: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.credentials = { login: '', password: '' };
  }

  authenticate() {
    this.userService.authenticate(this.credentials).subscribe(() => {
      this.authenticationFailed = false;
      this.router.navigate(['/']);
    }, () => (this.authenticationFailed = true));
  }

  ngOnInit() {}
}
