import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ErrorMessageService } from '../../services/error-msg.service';
import { ToolsService } from '../../services/tools.service';
import { AuthGuard } from '../../../auth/auth-guard.service';
import { Router, NavigationEnd } from '../../../../../node_modules/@angular/router';
import { UserHttpService } from '../../../social/services/user.http-service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private _authGuard: AuthGuard,
    private _authService: AuthService,
    private _errorMsgService: ErrorMessageService,
    private _tools: ToolsService,
    private _router: Router,
    private _userHttpService: UserHttpService
  ) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this._authGuard.isAuthenticated();
      }
    });
  }

  ngOnInit() {
    this._userHttpService.getUserName(this.userId).subscribe(res => {
      this.userName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public isAuthenticated: boolean = this._authGuard.isAuthenticated();

  public email: string;
  public password: string;
  public validationErrors: string[] = [];
  public invalidSignin: boolean;

  public get userId(): string {
    return localStorage.getItem('userId')
  }
  public userName: string;

  public signIn() {
    this._authService.signOut();
    this.validationErrors = [];
    this.invalidSignin = false;
    this._errorMsgService.clearErrorMsg();
    if (this._tools.isNullOrEmpty(this.email)) this.validationErrors.push("*Email is required!")
    else if (!this._tools.isEmail(this.email)) this.validationErrors.push("*Invalid Email!")
    if (this._tools.isNullOrEmpty(this.password)) this.validationErrors.push("*Password is required!")
    if (this.validationErrors.length == 0) {
      this._authService.signIn(this.email, this.password).subscribe(res => {
        let token = (<any>res).jwtToken;
        if (token == "Unauthorized") this.invalidSignin = true;
        else {
          localStorage.setItem("jwtToken", token);
          let userId = (<any>res).id;
          localStorage.setItem("userId", userId);
          this.isAuthenticated = true;
          this._router.navigateByUrl("profile/" + userId);
        }
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    };
  }

  public signOut() {
    this._authService.signOut();
    this.isAuthenticated = false;
    this._router.navigateByUrl('signup');
  }

  public routeProfile() {
    this._router.navigateByUrl('profile/' + this.userId);
  }
}
