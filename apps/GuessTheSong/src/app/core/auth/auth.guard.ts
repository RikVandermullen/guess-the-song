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
        console.log('canActivate LoggedIn');
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
                    console.log('not logged in, reroute to /');
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }

    isAllowed(route: ActivatedRouteSnapshot, userRoles: string[]) {
        let allowed = false;
        
        if (route.data['roles']) {
            console.log("comparing roles:", route.data['roles'], userRoles);
            userRoles.forEach((role) => {
            console.log(role + " " + route.data['roles']);
            
            if (!allowed && route.data['roles'].includes(role)) {
                allowed = true;
            }
        });
        }

        return allowed;
    }
}