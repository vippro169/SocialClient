import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorMessageService } from '../../services/error-msg.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent implements OnInit, OnDestroy {

  constructor(private _errorMsgService: ErrorMessageService, private _router: Router) { }

  public errorMsg: any;
  public subscription: Subscription;

  ngOnInit() {
    this.subscription = this._errorMsgService.getErrorMsg().subscribe();
  }

  public close() {
    this._errorMsgService.clearErrorMsg();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
