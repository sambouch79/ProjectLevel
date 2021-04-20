import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class authService {
    private api = environment.api
    isAuth: boolean = false
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post(this.api + '/users/login', { email, password })
            .toPromise().then((res) => {
                return res
            }).catch(err => {
                return err
            })
    }
    register(email: string, password: string) {
        return this.http.post(this.api + '/users/register', { email, password })
            .toPromise().then((res) => {
                return res
            }).catch(err => {
                return err
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