import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import * as UserActions from './state/user.actions';
import { getMaskUsername, State } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUsername$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.maskUsername$ = this.store
        .select(getMaskUsername);
  }

  cancel() {
    this.router.navigate(['welcome']);
  }

  checkChanged() {
    this.store.dispatch(UserActions.maskUsername());
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName: any = loginForm.form.value.userName;
      const password: any = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
