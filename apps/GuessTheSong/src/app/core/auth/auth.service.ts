import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../user/user.model';
import { UserCredentials, Token } from '../../../../../../libs/data/src/lib/auth.interface'
import { UserRegistration } from '../../../../../../libs/data/src/lib/user-auth.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<Token | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) { 
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((token: Token | undefined) => {
          if (token) {
            this.currentUser$.next(token);
            return of(token);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe(() => {});
  }

  login(formData: UserCredentials): Observable<Token | undefined> {
	console.log(formData);
	
    return this.http
      .post<UserCredentials>(environment.apiUrl + "/api/auth/login", formData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((data: any) => data),
        map((token: Token) => {
          this.saveUserToLocalStorage(token);
          this.currentUser$.next(token); 
          this.router.navigate(['/games']);         
          return token;
        }),
        catchError((error) => {
          return of(undefined);
        })
      );
  }

  logout(): void {
      localStorage.removeItem(this.CURRENT_USER);
      this.currentUser$.next(undefined);
      this.router.navigate(['/'])
  }

  register(userData: UserRegistration): Observable<string | undefined> {
    return this.http
      .post<string>(environment.apiUrl +
        "/api/auth/register", userData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((user: string) => {
          this.router.navigate(['/login']);     
          return user;
        }),
        catchError((error) => {
          return of(undefined);
        })
      );
  }

  getUserFromLocalStorage(): Observable<Token | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {     
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  private saveUserToLocalStorage(token: Token): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(token));
  }

  getAuthorizationToken(): string | undefined {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const token: Token = JSON.parse(userData);

      return token.token;
    }
    return undefined;
  }
}
