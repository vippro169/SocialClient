import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { UserHttpService } from '../services/http-service/user.http-service';

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

  public profilePath: string;
  private userInfo: UserModel = new UserModel();

  ngOnInit() {
    this._routeSub = this._route.parent.params.subscribe(params => {
      this.profilePath = params['path'];
      this.profilePath = this.profilePath.toLowerCase();
      this._getBasicInfo();
    });
  }

  private _getBasicInfo() {
    this._userHttpService.getUserInfo(this.profilePath).subscribe(res => {
      this.userInfo = res;
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
