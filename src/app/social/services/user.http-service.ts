import { BaseHttpService } from "../../shared/abstracts/base.http-service";
import { Injectable } from "../../../../node_modules/@angular/core";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { AuthGuard } from "../../auth/auth-guard.service";
import { map } from 'rxjs/operators';
import { UserModel } from "../../models/user";

const api_path = 'http://localhost:3000/api/user/';

@Injectable()
export class UserHttpService extends BaseHttpService {
    constructor(http: HttpClient, authGuard: AuthGuard) {
        super(http, authGuard);
    }

    public getUserInfo(userId: string) {
        return this.get(api_path + 'get-info/' + userId).pipe(map(data => new UserModel(data)));
    }

    public getUserName(userId: string) {
        return this.get(api_path + 'get-name/' + userId).pipe(map(data => <string>data));
    }

    public editUser(userEdit: UserModel) {
        let editRequest: EditUserRequestModel = {
            id: userEdit.id,
            name: userEdit.name,
            gender: userEdit.gender,
            birthday: userEdit.birthday,
            emailPrivacy: userEdit.emailPrivacy,
            birthDatePrivacy: userEdit.birthDatePrivacy,
            birthYearPrivacy: userEdit.birthYearPrivacy
        };
        return this.put(api_path + 'edit/' + userEdit.id, editRequest);
    }
}

export interface EditUserRequestModel {
    id: string;
    name: string;
    gender: string;
    birthday: Date;
    emailPrivacy: string;
    birthDatePrivacy: string;
    birthYearPrivacy: string
}