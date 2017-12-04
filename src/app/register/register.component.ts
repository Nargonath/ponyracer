import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@app/user.service';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  registrationFailed: boolean;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { matchingError: true };
  }

  static validYear(control: FormControl) {
    const year = control.value;
    const currentYear = new Date().getFullYear();

    return year === null || year === '' || year < 1900 || year >= currentYear + 1
      ? { invalidYear: true }
      : null;
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    console.log('router = ', this.router);
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.confirmPasswordCtrl = fb.control('', [Validators.required]);
    this.birthYearCtrl = fb.control('', [Validators.required, RegisterComponent.validYear]);

    this.passwordForm = fb.group(
      {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      },
      { validator: [RegisterComponent.passwordMatch] }
    );

    this.userForm = fb.group({
      login: this.loginCtrl,
      birthYear: this.birthYearCtrl,
      passwordForm: this.passwordForm,
    });
  }

  ngOnInit() {
    this.registrationFailed = false;
  }

  register() {
    this.userService
      .register(this.loginCtrl.value, this.passwordCtrl.value, this.birthYearCtrl.value)
      .subscribe(() => {
        this.registrationFailed = false;
        this.router.navigate(['/']);
      }, () => (this.registrationFailed = true));
  }
}
