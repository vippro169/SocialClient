import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorMessageService } from '../../services/error-msg.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent implements OnInit, OnDestroy {

  constructor(private _errorMsgService: ErrorMessageService, private _router: Router) { }

  public isClosed = true;
  public errorMsg: any;
  public subscription: Subscription;

  ngOnInit() {
    this.subscription = this._errorMsgService.getErrorMsg().subscribe(msg => {
      if (this._router.url != '/') {
        this.errorMsg = msg;
        if (this.errorMsg) this.isClosed = false;
      }
    });
  }

  public close() {
    this._errorMsgService.clearErrorMsg();
    this.isClosed = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
