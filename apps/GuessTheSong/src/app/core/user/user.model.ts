export class User {
    _id: string | undefined;
    name: string | undefined;
    emailAddress: string | undefined;
    password: string | undefined;
    birthDate: Date | undefined;
    phoneNumber: string | undefined;
    roles: string[] = [];

    constructor(_id: string, name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string, roles: string[]) {
        this._id = _id;
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
}