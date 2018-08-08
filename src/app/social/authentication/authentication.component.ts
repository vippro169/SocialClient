import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private _authService: AuthService, private _errorMsgService: ErrorMessageService, private _router: Router) { }

  public email: string;
  public password: string;
  public validationErrors: string[] = [];
  public authError: any;
  public subscription: Subscription;

  ngOnInit() {
    this.subscription = this._errorMsgService.getErrorMsg().subscribe(msg => {
      if (this._router.url == '/') {
        this.authError = msg;
      }
    });
  }

  public signIn() {
    this.validationErrors = [];
    this._errorMsgService.clearErrorMsg();
    if (!this._hasValidEmail(this.email)) this.validationErrors.push("Invalid Email!")
    if (this._isNullOrEmpty(this.password)) this.validationErrors.push("Password is required!")
    if (this.validationErrors.length == 0) {
      this._authService.signIn(this.email, this.password);
    };
  }

  private _hasValidEmail(email: string) {
    var isEmail = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email);
    return !this._isNullOrEmpty(email) && isEmail;
  }

  private _isNullOrEmpty(value: string | null | undefined) {
    return value == null || value.trim() == '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
