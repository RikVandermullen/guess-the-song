import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	// users: User[] = [
	// 	{
	// 		id: "0",
	// 		name: "Rik Vandermullen",
	// 		emailAddress: "rik@mail.com",
	// 		password: "Secret123!",
	// 		birthDate: new Date(1998,9,11),
	// 		phoneNumber: "0658942232"
	// 	},
	// 	{
	// 		id: "1",
	// 		name: "Kees de Jong",
	// 		emailAddress: "kees@mail.com",
	// 		password: "Secret123!",
	// 		birthDate: new Date(1999,11,16),
	// 		phoneNumber: "0658942212"
	// 	},
	// 	{
	// 		id: "2",
	// 		name: "Teun van Graaf",
	// 		emailAddress: "teun@mail.com",
	// 		password: "Secret123!",
	// 		birthDate: new Date(2000,11,16),
	// 		phoneNumber: "0658942213"
	// 	},
	// ];
	
	constructor(private http: HttpClient) { }

	getAllUsers(): Observable<User[]> {
		const url = "/api/users";
		console.log("get: " + url);
	
		return this.http.get<User[]>(url).pipe(
            map((response: User[]) => response),
            tap((users: User[]) => {
                return users;
            })
        );
	}

	getUserById(id: string): Observable<User> {
		const url = "/api/users/" + id;
		console.log("get: " + url);
	
		return this.http.get<User>(url).pipe(
            map((response: User) => response),
            tap((user: User) => {
                return user;
            })
        );
	}

	createUser(user: User): Observable<User> {
		const url = "/api/users";
		console.log("get: " + url);
	
		return this.http.post<User>(url, user).pipe(
            map((response: User) => response),
            tap((user: User) => {
                return user;
            })
        );
	}

	updateUser(user: User): Observable<User> {
		console.log(user);
		
		const url = "/api/users/" + user._id;
		console.log("put: " + url);

		return this.http.put<User>(url, user).pipe(
            map((response: User) => response),
            tap((user: User) => {
                return user;
            })
        );
	}

	deleteUser(id: string): void {
		const url = "/api/users/" + id;
		console.log("delete: " + url);

		this.http.delete<User>(url).subscribe();
	}
}
