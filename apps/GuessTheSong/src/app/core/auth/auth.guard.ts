import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { Token } from "../../../../../../libs/data/src/lib/auth.interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(): Observable<boolean> {
        console.log('canActivate LoggedIn');
        return this.authService.currentUser$.pipe(
            map((token: Token | undefined) => {
                if (token && token.token) {
                    return true;
                } else {
                    console.log('not logged in, reroute to /');
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
}