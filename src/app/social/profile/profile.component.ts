import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { AuthGuard, AuthUserInfo } from '../../auth/auth-guard.service';
import { FriendRequestModel } from '../../models/friendrequest.model';
import { UserHttpService } from '../services/http-service/user.http-service';
import { FriendHttpService } from '../services/http-service/friend.http-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private _authGuard: AuthGuard,
    private _userHttpService: UserHttpService,
    private _friendHttpService: FriendHttpService,
    private _route: ActivatedRoute,
    private _errorMsgService: ErrorMessageService,
  ) { }

  private _routeSub: Subscription;
  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  }

  public profilePath: string;
  public profileName: string;
  public profileId: string;

  public isFriend: boolean;
  public friendRequest: FriendRequestModel;

  ngOnInit() {
    this._routeSub = this._route.params.subscribe(params => {
      this.profilePath = params['path'];
      this.profilePath = this.profilePath.toLowerCase();
      this._getProfileName();
      this._getProfileId();
    });
  }

  private _getProfileName() {
    this._userHttpService.getUserName(this.profilePath).subscribe(res => {
      this.profileName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _getProfileId() {
    this._userHttpService.getUserId(this.profilePath).subscribe(res => {
      this.profileId = res;
      this._checkFriendship();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _checkFriendship() {
    this._friendHttpService.checkFriendship(this.profileId).subscribe(res => {
      this.isFriend = res;
      if (!this.isFriend) this._getFriendRequest();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _getFriendRequest() {
    this._friendHttpService.getFriendRequest(this.profileId).subscribe(res => {
      this.friendRequest = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _confirmFriendRequest(confirmed: boolean) {
    this.friendRequest.confirmed = confirmed;
    this._friendHttpService.confirmFriendRequest(this.friendRequest).subscribe(res => {
      if (confirmed == true) this.isFriend = true;
      this.friendRequest = null;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    })
  }

  public addFriend() {
    this._friendHttpService.createFriendRequest(this.authUser.userId, this.profileId).subscribe(res => {
      this._getFriendRequest();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public cancelFriendRequest() {
    this._friendHttpService.cancelFriendRequest(this.friendRequest.id).subscribe(res => {
      this.friendRequest = null;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public acceptFriendRequest() {
    this._confirmFriendRequest(true);
  }

  public denyFriendRequest() {
    this._confirmFriendRequest(false);
  }

  public unfriend() {
    this._friendHttpService.unfriend(this.profileId).subscribe(res => {
      this.isFriend = false;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
