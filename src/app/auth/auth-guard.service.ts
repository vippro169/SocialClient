import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private _jwtHelper: JwtHelperService, private _router: Router) {
    }

    canActivate() {
        if (this.isAuthenticated()) return true;
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        this._router.navigate(["signup"]);
        return false;
    }

    canActivateChild () {
        if (this.isAuthenticated()) return true;
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        this._router.navigate(["signup"]);
        return false;
    }

    public isAuthenticated() {
        var token = localStorage.getItem("jwtToken");
        if (token && !this._jwtHelper.isTokenExpired(token)) {
            return true;
        }
        return false;
    }
}