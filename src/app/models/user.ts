export interface UserData {
    id: string;
    name: string;
    gender: string;
    birthday?: Date;
    email?: string;
    emailPrivacy?: string;
    birthDatePrivacy?: string;
    birthYearPrivacy?: string;
}

export class UserModel {

    constructor(data?: UserData) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.gender = data.gender;
            if (data.birthday != null) this.birthday = data.birthday;
            if (data.email != null) this.email = data.email;
            if (data.emailPrivacy != null) this.emailPrivacy = data.emailPrivacy;
            if (data.birthDatePrivacy != null) this.birthDatePrivacy = data.birthDatePrivacy;
            if (data.birthYearPrivacy != null) this.birthYearPrivacy = data.birthYearPrivacy;
        }
    }

    public id: string;
    public name: string;
    public gender: string;
    public birthday: Date;
    public email: string;
    public emailPrivacy: string;
    public birthDatePrivacy: string;
    public birthYearPrivacy: string;
}