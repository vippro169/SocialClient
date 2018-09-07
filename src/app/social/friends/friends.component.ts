import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGuard, AuthUserInfo } from '../../auth/auth-guard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { FriendHttpService } from '../services/http-service/friend.http-service';
import { Subscription } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {

  constructor(
    private _authGuard: AuthGuard,
    private _router: Router,
    private _route: ActivatedRoute,
    private _errorMsgService: ErrorMessageService,
    private _friendHttpService: FriendHttpService,
  ) { }

  private _routeSub: Subscription;
  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  }
  public profilePath: string;

  public friends: UserModel[] = [];

  ngOnInit() {
    this._routeSub = this._route.parent.params.subscribe(params => {
      this.profilePath = params['path'];
      this.profilePath = this.profilePath.toLowerCase();
      if (this.profilePath != this.authUser.userPath) this._router.navigate(['../'], { relativeTo: this._route });
      else this._getListFriends();
    });
  }

  private _getListFriends() {
    this.friends = [];
    this._friendHttpService.getListFriend(this.authUser.userId).subscribe(res => {
      this.friends = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  public unfriend(friendId: string) {
    this._friendHttpService.unfriend(friendId).subscribe(res => {
      this._getListFriends();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
