import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../services/user.http-service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { UserModel, UserData } from '../../models/user';
import { formatDate } from '@angular/common';
import { ToolsService } from '../../shared/services/tools.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  constructor(
    private _userHttpService: UserHttpService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _errorMsgService: ErrorMessageService,
    private _tools: ToolsService
  ) { }

  private _routeSub: Subscription;
  public get userId(): string {
    return localStorage.getItem('userId');
  }
  public profileId: string;
  public userInfo: UserModel = new UserModel();
  public isEditing: boolean = true;
  public isSaving: boolean = false;

  public genders: string[] = ['Male', 'Female', 'Other'];
  public privacy: string[] = ['Only me', 'Friends', 'Public'];
  public days: number[] = [];
  public months: number[] = []
  public years: number[] = [];
  public yearMin: number = 1900;
  public yearMax: number;

  public id: string;
  public name: string;
  public gender: string;
  public birthDay: number;
  public birthMonth: number;
  public birthYear: number;
  public email: string;
  public emailPrivacy: string;
  public birthDatePrivacy: string;
  public birthYearPrivacy: string;

  public nameError: string;
  public dateError: string;

  ngOnInit() {
    this.yearMax = +formatDate(Date.now(), 'yyyy', 'en-US');

    for (var i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (var i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    for (var i = this.yearMin; i <= this.yearMax; i++) {
      this.years.push(i);
    }

    this._routeSub = this._route.parent.params.subscribe(params => {
      this.profileId = params['id'];
      if (this.profileId != this.userId) this._router.navigate(['../'], { relativeTo: this._route });
      else this._getBasicInfo();
    });
  }

  private _getBasicInfo() {
    this._userHttpService.getUserInfo(this.profileId).subscribe(res => {
      this.userInfo = res;
      this._setInfoInput();
    }, error => {
      this._errorMsgService.sendErrorMsg(error.error.message);
    });
  }

  private _setInfoInput() {
    this.name = this.userInfo.name;
    this.gender = this.userInfo.gender;
    this.birthDay = +formatDate(this.userInfo.birthday, 'dd', 'en-US');
    this.birthMonth = +formatDate(this.userInfo.birthday, 'MM', 'en-US');
    this.birthYear = +formatDate(this.userInfo.birthday, 'yyyy', 'en-US');
    this.emailPrivacy = this.userInfo.emailPrivacy;
    this.birthDatePrivacy = this.userInfo.birthDatePrivacy;
    this.birthYearPrivacy = this.userInfo.birthYearPrivacy;
  }

  private _setErrorNull() {
    this.nameError = null;
    this.dateError = null;
  }

  private _isInputValid(): boolean {
    var isValid = true;
    if (this._tools.isNullOrEmpty(this.name)) {
      isValid = false;
      this.nameError = "*Name is required!"
    }

    if (!this._tools.isValidDate(+this.birthDay, +this.birthMonth, +this.birthYear)) {
      isValid = false;
      this.dateError = "*Invalid Birthday";
    }
    return isValid;
  }

  public edit() {
    this._setInfoInput();
    this._setErrorNull();
    this.isEditing = true;
  }

  public cancel() {
    this.isEditing = false;
    this._setInfoInput();
    this._setErrorNull();
  }

  public save() {
    this._setErrorNull();
    if (this._isInputValid()) {
      var birthday = new Date(+this.birthYear, +this.birthMonth - 1, +this.birthDay + 1);
      let userData: UserData = {
        id: this.userInfo.id,
        name: this.name,
        gender: this.gender,
        birthday: birthday,
        emailPrivacy: this.emailPrivacy,
        birthDatePrivacy: this.birthDatePrivacy,
        birthYearPrivacy: this.birthYearPrivacy
      };
      var userEdit = new UserModel(userData);
      console.log(userEdit);
      this._userHttpService.editUser(userEdit).subscribe(res => {
        window.location.reload();
      }, error => {
        this._errorMsgService.sendErrorMsg(error.error.message);
      });
    }
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
