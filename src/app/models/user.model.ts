export interface UserData {
    id: string;
    name: string;
    gender?: string;
    path?: string;
    birthday?: Date;
    email?: string;
    emailPrivacy?: string;
    birthdayPrivacy?: string;
}

export class UserModel {

    constructor(data?: UserData) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            if (data.gender !== undefined) this.gender = data.gender;
            if (data.path !== undefined) this.path = data.path;
            if (data.birthday !== undefined) this.birthday = data.birthday;
            if (data.email !== undefined) this.email = data.email;
            if (data.emailPrivacy !== undefined) this.emailPrivacy = data.emailPrivacy;
            if (data.birthdayPrivacy !== undefined) this.birthdayPrivacy = data.birthdayPrivacy;
        }
    }

    public id: string;
    public name: string;
    public path: string;
    public gender: string;
    public birthday: Date;
    public email: string;
    public emailPrivacy: string;
    public birthdayPrivacy: string;
}