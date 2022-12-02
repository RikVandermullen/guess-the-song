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
		const index = this.users.indexOf(this.getUserById(user.id!));
		this.users.splice(index, 1, user);       
	}

	deleteUser(id: string): void {
		const index = this.users.indexOf(this.getUserById(id));
		this.users.splice(index, 1);
		console.log(this.users);
		
	}

	getLength(): number {
		return this.users.length;
	}
}
