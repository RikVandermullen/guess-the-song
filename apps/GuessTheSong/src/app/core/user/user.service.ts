import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from './user.model';
import { UserSongs } from '../../../../../../libs/data/src/lib/user-songs.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	
	constructor(private http: HttpClient) { }

	getAllUsers(): Observable<User[]> {
		const url = environment.apiUrl + "/api/users";
	
		return this.http.get<User[]>(url).pipe(
            map((response: User[]) => response),
            tap((users: User[]) => {
                return users;
            })
        );
	}

	getUserById(id: string): Observable<User> {
		const url = environment.apiUrl + "/api/users/" + id;

		return this.http.get<User>(url).pipe(
            map((response: User) => response),
            tap((user: User) => {
                return user;
            })
        );
	}

	updateUser(user: User): Observable<User> {		
		const url = environment.apiUrl + "/api/users/" + user._id;

		return this.http.put<User>(url, user).pipe(
            map((response: User) => response),
            tap((user: User) => {
                return user;
            })
        );
	}

	deleteUser(id: string): void {
		const url = environment.apiUrl + "/api/users/" + id;

		this.http.delete<User>(url).subscribe();
	}

	addUserWithSongsToNeo4j(userSongs: UserSongs): void {
		const url = environment.neoApiUrl + `/neo4j-api/user-songs`;

		this.http.post<User>(url, userSongs).subscribe();
	}

	addUserToNeo4j(userId: string): void {
		const url = environment.neoApiUrl + `/neo4j-api/user/` + userId;

		this.http.get<User>(url).subscribe();
	}
}
