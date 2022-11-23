import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
	BASE_URL = 'http://localhost:3333/api';
	
	constructor(private http: HttpClient) { 
		
	}

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
		console.log("put: " + url);

		this.http.delete<User>(url).subscribe();
	}
}
