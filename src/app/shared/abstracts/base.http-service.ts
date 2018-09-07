import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthGuard } from "../../auth/auth-guard.service";
import { ErrorMessageService } from "../services/error-msg.service";

export abstract class BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard, errorMsgService: ErrorMessageService) {
        this._http = http;
        this._authGuard = authGuard;
        this._errorMsgService = errorMsgService;
    }

    private _http: HttpClient;
    private _authGuard: AuthGuard;
    private _errorMsgService: ErrorMessageService;

    protected defaultHttpClientOptions: HttpClientOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    protected get(url: string, options?: HttpClientOptions): Observable<any> {
        this._errorMsgService.clearErrorMsg();
        if (!options) options = this.defaultHttpClientOptions
        return this._http.get(url, options);
    }

    protected put(url: string, data: any, options?: HttpClientOptions): Observable<any> {
        this._errorMsgService.clearErrorMsg();
        if (!options) options = this.defaultHttpClientOptions
        var body = JSON.stringify(data);
        return this._http.put(url, body, options);
    }

    protected post(url: string, data: any, options?: HttpClientOptions): Observable<any> {
        this._errorMsgService.clearErrorMsg();
        if (!options) options = this.defaultHttpClientOptions
        const body = JSON.stringify(data);
        return this._http.post(url, body, options);
    }

    protected delete(url: string, options?: HttpClientOptions): Observable<any> {
        this._errorMsgService.clearErrorMsg();
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