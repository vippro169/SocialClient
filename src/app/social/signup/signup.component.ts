import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ErrorMessageService } from '../../shared/services/error-msg.service';
import { formatDate } from '@angular/common';
import { ToolsService } from '../../shared/services/tools.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _errorMsgService: ErrorMessageService,
    private _tools: ToolsService) { }

  public genders: string[] = ['Male', 'Female', 'Other'];
  public days: number[] = [];
  public months: number[] = []
  public years: number[] = [];
  public yearMin: number = 1900;
  public yearMax: number;
  public isSigningUp: boolean = false;


  public name: string;
  public gender: string = "Male";
  public birthDay: number;
  public birthMonth: number;
  public birthYear: number;
  public email: string;
  public password: string;
  public policyChecked: boolean = false;

  public nameError: string;
  public dateError: string;
  public emailError: string;
  public passwordError: string;
  public policyError: string;

  ngOnInit() {
    this.yearMax = Number(formatDate(Date.now(), 'yyyy', 'en-US', '+7'));

    for (var i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    this.birthDay = 0;

    for (var i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.birthMonth = 0;

    for (var i = this.yearMin; i <= this.yearMax; i++) {
      this.years.push(i);
    }
    this.birthYear = 0;
  }

  public signUp() {
    this._setNullError();
    if (this._isSignUpValid()) {
      this.isSigningUp = true;
      var birthday = new Date(+this.birthYear, +this.birthMonth-1, +this.birthDay+1);
      this._authService.signUp(this.name, this.gender, birthday, this.email, this.password)
        .subscribe(res => {
          if (res != null) this.emailError = <string>res;
          this.isSigningUp = false;
        }, error => {
          this._errorMsgService.sendErrorMsg(error.error.message);
          this.isSigningUp = false;
        });
    }
  }

  private _isSignUpValid(): boolean {
    var isValid = true;
    if (this._tools.isNullOrEmpty(this.name)) {
      isValid = false;
      this.nameError = "*Name is required!"
    }

    if (!this._tools.isValidDate(+this.birthDay, +this.birthMonth, +this.birthYear)) {
      isValid = false;
      this.dateError = "*Invalid Birthday";
    }

    if (this._tools.isNullOrEmpty(this.email)) {
      isValid = false;
      this.emailError = "*Email is required!";
    }
    else if (!this._tools.isEmail(this.email)) {
      isValid = false;
      this.emailError = "*Invalid Email!"
    };

    if (this._tools.isNullOrEmpty(this.password)) {
      isValid = false;
      this.passwordError = "*Password is required!";
    }

    if (!this.policyChecked) {
      isValid = false;
      this.policyError = "*You have to agree with the Privacy Policy!"
    }
    return isValid;
  }

  private _setNullError() {
    this.nameError = null;
    this.dateError = null;
    this.emailError = null;
    this.passwordError = null;
    this.policyError = null;
  }
}


