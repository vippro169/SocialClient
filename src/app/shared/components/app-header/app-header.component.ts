import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ErrorMessageService } from '../../services/error-msg.service';
import { ToolsService } from '../../services/tools.service';
import { AuthGuard, AuthUserInfo } from '../../../auth/auth-guard.service';
import { Router, NavigationEnd } from '../../../../../node_modules/@angular/router';
import { UserHttpService } from 'src/app/social/services/http-service/user.http-service';
import { FriendHttpService } from '../../../social/services/http-service/friend.http-service';
import { FriendRequestModel } from '../../../models/friendrequest.model';
import { Subject, Observable, interval, timer, Subscription } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';

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
    private _location: Location,
    private _tools: ToolsService,
    private _router: Router,
    private _userHttpService: UserHttpService,
    private _friendHttpService: FriendHttpService
  ) {
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthenticated = this._authGuard.isAuthenticated();
      }
    });
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this._getUserName();
      this._getListFriendRequest();
    }
    this.searchResult = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((keyword: string) => this._userHttpService.search(keyword))
    );
    this.searchResult.subscribe(res => {
      this.searchUsers = res;
    });
  }

  public isAuthenticated: boolean = this._authGuard.isAuthenticated();

  private _reapeatSub: Subscription;

  public email: string;
  public password: string;
  public validationErrors: string[] = [];
  public invalidSignin: boolean;

  public isCollapsed = true;
  public friendRequestsInfo: FriendRequestInfo[] = [];


  public isSearchCollapsed = true;
  public keyword: string;
  public searchTerms = new Subject<string>();
  public searchResult: Observable<UserModel[]>;
  public searchUsers: UserModel[] = [];


  public get authUser(): AuthUserInfo {
    return this._authGuard.getAuthenticatedUser();
  };

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
        var token = res;
        if (token == "Unauthorized") this.invalidSignin = true;
        else {
          localStorage.setItem("jwtToken", token);
          this.isAuthenticated = true;
          this.isCollapsed = true;
          this._getUserName();
          this._setNullInput();
          this._getListFriendRequest();
          this._router.navigateByUrl("/home");
        }
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    };
  }

  public signOut() {
    this._reapeatSub.unsubscribe();
    this._authService.signOut();
    this.isAuthenticated = false;
    this.userName = null;
    window.location.href = "/signup";
  }

  public routeProfile() {
    window.location.href = 'profile/' + this.authUser.userPath;
  }

  public acceptFriendRequest(friendRequest: FriendRequestModel) {
    this._confirmFriendRequest(friendRequest, true);
  }

  public denyFriendRequest(friendRequest: FriendRequestModel) {
    this._confirmFriendRequest(friendRequest, false);
  }

  public searchInputClick() {
    if (this.isSearchCollapsed) this.search();
    else this.isSearchCollapsed = true;
  }

  public search() {
    if (this._tools.isNullOrEmpty(this.keyword)) this.isSearchCollapsed = true;
    else {
      var keyword = this._location.normalize(this.keyword);
      this.searchTerms.next(keyword);
      this.isSearchCollapsed = false;
    };
  }

  public closeSearchBox() {
    this.isSearchCollapsed = true;
  }

  private _getUserName() {
    this._userHttpService.getUserName(this.authUser.userPath).subscribe(res => {
      this.userName = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _setNullInput() {
    this.email = null;
    this.password = null;
    this.keyword = null;
    this.searchUsers = [];
  }

  private _getListFriendRequest() {
    this._reapeatSub = timer(0, 5000).subscribe(x => {
      this._friendHttpService.getListFriendRequest(this.authUser.userId).subscribe(res => {
        this.friendRequestsInfo = [];
        var friendRequests: FriendRequestModel[] = res;
        if (friendRequests.length > 0) {
          friendRequests.forEach(x => {
            this._userHttpService.getUserNameById(x.senderId).subscribe(res => {
              var name = res;
              this._userHttpService.getUserPath(x.senderId).subscribe(res => {
                var path = res;
                let requestInfo: FriendRequestInfo = {
                  friendRequest: x,
                  senderName: name,
                  senderPath: path
                }
                this.friendRequestsInfo.push(requestInfo);
              }, error => {
                this._errorMsgService.sendErrorMsg(error.error.message);
              });
            }, error => {
              this._errorMsgService.sendErrorMsg(error.error.message);
            });
          })
        }
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    });

  }

  private _confirmFriendRequest(friendRequest: FriendRequestModel, confirmed: boolean) {
    friendRequest.confirmed = confirmed;
    this._friendHttpService.confirmFriendRequest(friendRequest).subscribe(res => {
      this._getListFriendRequest();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }
}

export interface FriendRequestInfo {
  friendRequest: FriendRequestModel;
  senderName: string;
  senderPath: string;
}
