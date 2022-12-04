export class UserRegistration {
    emailAddress: string;
    password: string;
    name: string;
    phoneNumber: string;
    birthDate: Date;

    constructor(name: string, emailAddress: string, password: string, birthDate: Date, phoneNumber: string) {
        this.emailAddress = emailAddress;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
    }
}

export class UserCredentials implements UserCredentials {
    emailAddress: string;
    password: string;

    constructor(emailAddress: string, password: string) {
        this.emailAddress = emailAddress;
        this.password = password;
    }
}