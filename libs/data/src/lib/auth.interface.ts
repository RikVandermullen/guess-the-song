export interface UserCredentials {
    emailAddress: string;
    password: string;
}

export interface UserRegistration extends UserCredentials {
    name: string;
    phoneNumber: string;
    birthDate: Date;
}

export interface Token {
    token: string,
    id: string
}
