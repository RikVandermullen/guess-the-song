import { User } from "./user.interface";

export interface UserCredentials {
    emailAddress: string;
    password: string;
}

export interface UserRegistration extends UserCredentials {
    name: string;
    phoneNumber: string;
    birthDate: Date;
    roles: string[];
}

export interface Token {
    token: string;
    user: User;
}
