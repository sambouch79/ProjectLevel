import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { movie } from "../models/movie.model"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class movieService {
    private api = environment.api
    movies: movie[]
    moviesSubject = new Subject<any[]>()

    constructor(private http: HttpClient) {
        //les donnees hard coded
        this.movies = [
            {
                title: 'Forrest Gump',
                description: ' Forrest est un garçon un peu simplet, que Robert Zemeckis met en scène depuis son enfance, dans les années 50, jusqu’à sa vie d’adulte, dans les années 80',
                image: 'https://picsum.photos/id/259/150'
            },
            {

                title: 'Fight Club',
                description: 'Edward Norton joue ici un homme qui erre sans but réel dans sa vie. Las de son existence morne, il devient membre du Fight Club, une organisation de combats clandestins dirigée par Tyler Durden, brillamment incarnée par Brad Pitt.',
                image: 'https://picsum.photos/id/331/150'
            },
            {

                title: 'Le Seigneur Des Anneaux',
                description: 'La trilogie met en scène le hobbit Frodon et les membres de la communauté de l’Anneau sur la Terre du Milieu. Tous sont en quête de l’Anneau, qui causera la perte de Sauron s’il est détruit.',
                image: 'https://picsum.photos/id/1040/150'
            },
            {

                title: 'John Wick',
                description: 'Depuis la mort de sa femme,John mène une vie sans histoire, jusqu’à ce qu’un malfrat s’introduit chez John pour voler  sa Ford Mustang de 1969, et tue sa chienne Daisy... John remonte la piste de malfrat qui etait est le fils unique d’un grand patron de la pègre.la tête de John est mise à prix et désormais tous les assassins de New York aux trousses.',
                image: 'https://picsum.photos/id/111/150'
            }];

        this.emitMovies()
    }
    emitMovies() {
        this.moviesSubject.next(this.movies)
    }
    //ajout du film localement
    addMovie(movie: movie): void {
        this.movies.unshift(movie)

    }
    //sauvegarder de film localement
    saveMovie(): void {
        this.emitMovies()
    }
    //suppression de film localement
    removeMovie(index: number) {
        this.movies.splice(index, 1)
        this.emitMovies()
    }
    //recuperer un film via son Id localement
    getMovie(index: number) {
        if (this.movies[index]) {
            return this.movies[index]
        }
        return false
    }
    //recuperer les films de l'api  avec authentification
    getMovieFromServer() {
        return this.http.get(this.api + '/movies',
            {
                headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.getToken() })
            })
    }
    //sauvegarder un films dvers l'api  avec authentification
    saveMovieToServer(movie: movie) {
        return this.http.post(this.api + '/movies', movie, {
            headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.getToken() })
        })
    }
    //recuperer d'un films de l'api  avec authentification via son id
    getMovieByIdFromServer(id: string) {
        return this.http.get(this.api + `/movies/${id}`, {
            headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.getToken() })
        })

    }
    //suppression d'un films de l'api  avec authentification via son id
    removeMovieFromServer(id: string) {
        return this.http.delete(this.api + `/movies/${id}`, {
            headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.getToken() })
        })
    }
    //modifier un films dans l'api  avec authentification via son id
    UpdateMovieToServer(id: string) {
        return this.http.patch(this.api + `/movies/${id}`, {
            headers: new HttpHeaders({ 'authorization': 'Bearer ' + this.getToken() })
        })
    }
    //recuperer un actor de l'api  via son id
    getActorFromServer(id: string) {
        return this.http.get(this.api + `/actors/${id}`)
    }
    //recuperer le token sauvegarder dans le local storage
    getToken() {
        return localStorage.getItem('token')
    }

}