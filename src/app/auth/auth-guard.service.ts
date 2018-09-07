import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private _jwtHelper: JwtHelperService, private _router: Router) {
    }

    public get jwtToken() {
        return localStorage.getItem("jwtToken");
    }

    canActivate() {
        if (this.isAuthenticated()) return true;
        localStorage.removeItem('jwtToken');
        this._router.navigate(["signup"]);
        return false;
    }

    canActivateChild() {
        if (this.isAuthenticated()) return true;
        localStorage.removeItem('jwtToken');
        this._router.navigate(["signup"]);
        return false;
    }

    public isAuthenticated() {
        if (this.jwtToken && !this._jwtHelper.isTokenExpired(this.jwtToken)) {
            return true;
        }
        return false;
    }

    public getAuthenticatedUser() {
        if (this.isAuthenticated()) {
            var decodedToken = this._jwtHelper.decodeToken(this.jwtToken);
            var authUser: AuthUserInfo = {
                userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
                userPath: decodedToken["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
            }
            return authUser;
        }
        else this._router.navigateByUrl("/signup");
    }
}

export interface AuthUserInfo {
    userId: string;
    userPath: string;
}