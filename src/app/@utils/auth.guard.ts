import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../@services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.accountService.userValue;
        // check if route is restricted by role
        if (user) {
            if (route.data.roles && route.data.roles.indexOf(user.userRole) === -1) {
                // role not authorized so redirect to home page
                this.router.navigate([ '/accessdenied' ]);
                // this.accountService.logout();
                return false;
            }
            return true;
        }
        this.router.navigate([ '/login' ], { queryParams: { returnUrl: state.url } });
        return false;
    }
}