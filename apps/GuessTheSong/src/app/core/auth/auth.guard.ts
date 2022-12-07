import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { Token } from "../../../../../../libs/data/src/lib/auth.interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
        
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            map((token: Token | undefined) => {
                if (token && token.token) {
                    const allowed = this.isAllowed(next, token.user.roles);
                    if (!allowed) {
                        this.router.navigate(['/games']);
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }

    isAllowed(route: ActivatedRouteSnapshot, userRoles: string[]) {
        let allowed = false;
        
        if (route.data['roles']) {
            userRoles.forEach((role) => {            
            if (!allowed && route.data['roles'].includes(role)) {
                allowed = true;
            }
        });
        }

        return allowed;
    }
}