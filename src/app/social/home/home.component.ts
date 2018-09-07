import { Component, OnInit } from '@angular/core';
import { AuthGuard, AuthUserInfo } from '../../auth/auth-guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _authGuard: AuthGuard
  ) { }

  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  }

  ngOnInit(): void {
  }
}
