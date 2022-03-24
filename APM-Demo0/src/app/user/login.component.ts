import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { getMaskUsername, State } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.store
        .select(getMaskUsername)
        .subscribe((maskUsername: boolean) => {
          this.maskUserName = maskUsername;
        });
  }

  cancel() {
    this.router.navigate(['welcome']);
  }

  checkChanged() {
    this.store.dispatch({type: '[User] Mask username'});
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
