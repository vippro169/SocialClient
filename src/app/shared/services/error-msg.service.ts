import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ErrorMessageService {
    private subject = new Subject<any>();

    public sendErrorMsg(message: string) {
        this.subject.next({ text: message });
    }

    public getErrorMsg(): Observable<any> {
        return this.subject.asObservable();
    }

    public clearErrorMsg() {
        this.subject.next();
    }
}