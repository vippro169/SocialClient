
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '../../../node_modules/@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from "../../../node_modules/rxjs";
import { ErrorMessageService } from "../shared/services/error-msg.service";

@Injectable()
export class AuthService {
    private _api_path = 'http://localhost:3000/api/';

    public authError: string = null;

    constructor(private _http: HttpClient, private _router: Router, private _errorMsgService: ErrorMessageService) { }

    public signIn(email: string, password: string) {
        this.authError = null;
        const authHeaders = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }

        let request: LoginRequestModel = {
            email: email,
            password: password
        }

        this._http.post(this._api_path + 'signin', JSON.stringify(request), { headers: authHeaders })
            .subscribe(res => {
                let token = (<any>res).jwtToken;
                localStorage.setItem("jwtToken", token);
            }, error => {
                this._errorMsgService.sendErrorMsg(error.error.message);
            });
    }

    public signOut() {
        localStorage.removeItem("jwtToken");
    }
}

export interface LoginRequestModel {
    email: string;
    password: string;
}