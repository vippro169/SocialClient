import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthGuard } from "../../auth/auth-guard.service";

export abstract class BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard) {
        this._http = http;
        this._authGuard = authGuard;
    }

    private _http: HttpClient;
    private _authGuard: AuthGuard;

    protected defaultHttpClientOptions: HttpClientOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    protected get(url: string, options?: HttpClientOptions): Observable<any> {
        if (!options) options = this.defaultHttpClientOptions
        return this._http.get(url, options);
    }

    protected put(url: string, data: any, options?: HttpClientOptions): Observable<any> {
        if (!options) options = this.defaultHttpClientOptions
        var body = JSON.stringify(data);
        return this._http.put(url, body, options);
    }

    protected post(url: string, data: any, options?: HttpClientOptions): Observable<any> {
        if (!options) options = this.defaultHttpClientOptions
        const body = JSON.stringify(data);
        return this._http.post(url, body, options);
    }

    protected delete(url: string, options: HttpClientOptions): Observable<any> {
        if (!options) options = this.defaultHttpClientOptions
        return this._http.delete(url, options);
    }
}

export interface HttpClientOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
};