import { Component, OnInit } from '@angular/core';
import { AuthGuard, AuthUserInfo } from '../../auth/auth-guard.service';
import { UserHttpService } from '../services/http-service/user.http-service';
import { ToolsService } from '../../shared/services/tools.service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _authGuard: AuthGuard,
    private _errorMsgService: ErrorMessageService,
    private _userHttpService: UserHttpService
  ) { }

  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  }

  public isChangingPassword: boolean = false;
  public isDeletingAccount: boolean = false;

  public password: string;
  public newPassword: string;
  public error: string;
  public successMsg: string;

  ngOnInit() {
  }
  public changePassword() {
    this.isChangingPassword = true;
    this.successMsg = null;
  }

  public savePassword() {
    this.error = null;
    this._userHttpService.changePassword(this.authUser.userId, this.password, this.newPassword).subscribe(res => {
      if (res) this.error = res;
      else {
        this.isChangingPassword = false;
        this.successMsg = "Password changed!"
        this.error = null;
        this.password = null;
        this.newPassword = null;
      }
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public cancelChangingPassword() {
    this.isChangingPassword = false;
    this.error = null;
    this.password = null;
    this.newPassword = null;
  }

  public deleteAccount() {
    this._userHttpService.deleteAccount(this.authUser.userId).subscribe(res => {
      localStorage.removeItem("jwtToken");
      window.location.href="signup";
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }
}
