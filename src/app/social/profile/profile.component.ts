import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { UserHttpService } from '../services/user.http-service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private _userHttpService: UserHttpService,
    private _route: ActivatedRoute,
    private _errorMsgService: ErrorMessageService,
  ) { }

  private _routeSub: Subscription;
  public get userId(): string {
    return localStorage.getItem('userId');
  }
  public profileId: string;
  public profileName: string;

  ngOnInit() {
    this._routeSub = this._route.params.subscribe(params => {
      this.profileId = params['id'];
      this._getProfileName();
    });
  }

  private _getProfileName() {
    this._userHttpService.getUserName(this.profileId).subscribe(res => {
      this.profileName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
