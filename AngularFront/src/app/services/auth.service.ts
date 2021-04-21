import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class authService {
    private api = environment.api
    isAuth: boolean = false
    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        this.http.post(this.api + '/users/login', { email, password })
            .subscribe((res: any) => {
                console.log(res.token)
                localStorage.setItem('token', res.token);
                this.router.navigate([""])
            }, (error) => {
                console.log(error)
            })

    }
    register(email: string, password: string) {
        this.http.post(this.api + '/users/register', { email, password })
            .subscribe((res: any) => {
                console.log(res.token)
                localStorage.setItem('token', res.token);
                this.router.navigate([''])
            }, (err) => {
                console.log(err)
            })
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token')
        //return this.http.post(this.api + '/users/logout', {})
    }


}