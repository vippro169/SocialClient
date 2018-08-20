
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

const api_path = 'http://localhost:3000/api/user/';

@Injectable()
export class AuthService {

    private _authHeaders = {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }

    constructor(private _http: HttpClient, private _router: Router) { }

    public signUp(name: string, gender: string, birthday: Date, email: string, password: string): Observable<any> {
        let request: SignUpRequestModel = {
            name: name,
            gender: gender,
            birthday: birthday,
            email: email,
            password: password
        }

        return this._http.post(api_path + 'signup', JSON.stringify(request), { headers: this._authHeaders });
    }

    public signIn(email: string, password: string): Observable<any> {


        let request: SignInRequestModel = {
            email: email,
            password: password
        }

        return this._http.post(api_path + 'signin', JSON.stringify(request), { headers: this._authHeaders });
    }

    public signOut() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
    }
}

export interface SignInRequestModel {
    email: string;
    password: string;
}

export interface SignUpRequestModel {
    name: string;
    gender: string;
    birthday: Date;
    email: string;
    password: string;
}