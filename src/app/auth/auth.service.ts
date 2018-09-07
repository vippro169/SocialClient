
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

const api_path = 'http://localhost:3000/api/user/';

@Injectable()
export class AuthService {

    private _authHeaders = {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }

    constructor(private _http: HttpClient, private _router: Router) { }

    public signUp(name: string, gender: string, birthday: Date, email: string, password: string, path: string): Observable<any> {
        let request: SignUpRequestModel = {
            name: name,
            gender: gender,
            birthday: birthday,
            email: email,
            password: password,
            path: path
        }

        return this._http.post(api_path + 'signup', JSON.stringify(request), { headers: this._authHeaders });
    }

    public signIn(email: string, password: string): Observable<string> {
        let request: SignInRequestModel = {
            email: email,
            password: password
        }

        return this._http.post(api_path + 'signin', JSON.stringify(request), { headers: this._authHeaders }).pipe(map(data => <string>data));
    }

    public signOut() {
        localStorage.removeItem("jwtToken");
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
    path: string;
}