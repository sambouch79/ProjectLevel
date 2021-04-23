import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { authService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class authGuard implements CanActivate {

    constructor(private authService: authService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuth) {
            return true
        } else {
            this.router.navigate(["signin"])
        }

    }
}