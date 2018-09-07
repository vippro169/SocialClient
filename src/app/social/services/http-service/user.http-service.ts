import { BaseHttpService } from "src/app/shared/abstracts/base.http-service";
import { HttpClient } from "@angular/common/http";
import { AuthGuard } from "src/app/auth/auth-guard.service";
import { Injectable } from "@angular/core";
import { ErrorMessageService } from "src/app/shared/services/error-msg.service";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/models/user.model";

const api_path = 'http://localhost:3000/api/user/';

@Injectable()
export class UserHttpService extends BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard, errorMsgService: ErrorMessageService) {
        super(http, authGuard, errorMsgService);
    }

    public getUserInfo(userId: string) {
        return this.get(api_path + 'get-info/' + userId).pipe(map(data => new UserModel(data)));
    }

    public getUserName(userPath: string) {
        return this.get(api_path + 'get-name/' + userPath).pipe(map(data => <string>data));
    }

    public getUserPath(userId: string) {
        return this.get(api_path + 'get-path/' + userId).pipe(map(data => <string>data));
    }

    public getUserNameById(userId: string) {
        return this.get(api_path + 'get-name-by-id/' + userId).pipe(map(data => <string>data));
    }

    public getUserId(userPath: string) {
        return this.get(api_path + 'get-id/' + userPath).pipe(map(data => <string>data));
    }


    public editUser(userEdit: UserModel) {
        let editRequest: EditUserRequestModel = {
            id: userEdit.id,
            name: userEdit.name,
            gender: userEdit.gender,
            birthday: userEdit.birthday,
            emailPrivacy: userEdit.emailPrivacy,
            birthdayPrivacy: userEdit.birthdayPrivacy
        };
        return this.put(api_path + 'edit/' + userEdit.id, editRequest);
    }

    public changePassword(userId: string, password: string, newPassword: string) {
        let request = {
            password: password,
            newPassword: newPassword
        }
        return this.put(api_path + 'change-password/' + userId, request).pipe(map(data => <string>data));
    }

    public deleteAccount(userId: string) {
        return this.delete(api_path + 'delete/' + userId);
    }
}

export interface EditUserRequestModel {
    id: string;
    name: string;
    gender: string;
    birthday: Date;
    emailPrivacy: string;
    birthdayPrivacy: string;
}