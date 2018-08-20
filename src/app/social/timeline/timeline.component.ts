import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserHttpService } from '../services/user.http-service';
import { UserModel } from '../../models/user';
import { pipe } from '../../../../node_modules/@angular/core/src/render3/pipe';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { formatDate } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  constructor(
    private _userHttpService: UserHttpService,
    private _route: ActivatedRoute,
    private _errorMsgService: ErrorMessageService
  ) { }

  private _routeSub: Subscription;

  public profileId: string;
  private userInfo: UserModel = new UserModel();

  ngOnInit() {
    this._routeSub = this._route.parent.params.subscribe(params => {
      this.profileId = params['id'];
      this._getBasicInfo();
    });
  }

  private _getBasicInfo() {
    this._userHttpService.getUserInfo(this.profileId).subscribe(res => {
      this.userInfo = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
