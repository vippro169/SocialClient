import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class Base_httpService {
    constructor(_http: HttpClient) {
        this._http = _http;
    }
    
    private _http: HttpClient;

    protected defaultHttpClientOptions: HttpClientOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    };

    protected get(url: string, options?: HttpClientOptions): Observable<any> {
        
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