export class User {
    id: string | undefined;
    name: string | undefined;
    emailAddress: string | undefined;
    password: string | undefined;
    birthDate: Date | undefined;
    phoneNumber: string | undefined

    constructor(id: string, name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
    }
}