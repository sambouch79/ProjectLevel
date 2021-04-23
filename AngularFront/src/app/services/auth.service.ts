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
        this.http.post(this.api + '/users/login', { email, password }, {
            observe: 'response'
        }).subscribe((res: any) => {
            console.log(res.body.token)
            if (res.status === 200) {
                localStorage.setItem('token', res.body.token);
                this.isAuth = true
                this.router.navigate([""])
            }

        }, (error) => {
            console.log('Please authentificate ')
        })

    }
    register(email: string, password: string) {
        this.http.post(this.api + '/users/register', { email, password }
            , {
                observe: 'response'
            })
            .subscribe((res: any) => {
                console.log(res)
                if (res.status === 201) {
                    console.log(res.body.token)
                    localStorage.setItem('token', res.body.token);
                    this.isAuth = true
                    this.router.navigate([''])
                }

            }, (err) => {
                console.log(err)
            })
    }
    loggedIn() {
        return !!localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token')
        this.isAuth = false

    }


}