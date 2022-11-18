import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	users: User[] = [
		{
			id: "0",
			name: "Rik Vandermullen",
			emailAddress: "rik@mail.com",
			password: "Secret123!",
			birthDate: new Date(1998,9,11),
			phoneNumber: "0658942232"
		},
		{
			id: "1",
			name: "Kees de Jong",
			emailAddress: "kees@mail.com",
			password: "Secret123!",
			birthDate: new Date(1999,11,16),
			phoneNumber: "0658942212"
		},
		{
			id: "2",
			name: "Teun van Graaf",
			emailAddress: "teun@mail.com",
			password: "Secret123!",
			birthDate: new Date(2000,11,16),
			phoneNumber: "0658942213"
		},
	];
	
	constructor() { }

	getAllUsers(): User[] {
		return this.users;
	}

	getUserById(id: string): User {
        return this.users.filter((user: User) => user.id === id)[0];
    }

	createUser(user: User): void {
		this.users.push(user);
	}

	updateUser(user: User): void {
		this.users.splice(parseInt(user.id!), 1, user);
		console.log(this.users);
		
	}

	deleteUser(id: string): void {
		this.users.splice(parseInt(id), 1);
	}

	getLength(): number {
		return this.users.length;
	}
}
