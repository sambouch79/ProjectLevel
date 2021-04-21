import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  movies;
  movieSubscribe: Subscription
  constructor(private movieService: movieService, private router: Router) { }

  ngOnInit(): void {
    this.movieSubscribe = this.movieService.moviesSubject.subscribe((value: any[]) => {
      this.movies = value
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("completed")
    }
    )
    this.movieService.emitMovies()
  }
  onView(id: number) {
    this.router.navigate(["details", id])
  }
  onChange(id: number) {
    this.router.navigate(["edit", id])
  }
  onRemove(id: number) {

    this.movieService.removeMovie(id)
    this.router.navigate([""])
  }
  ngOnDestroy() {
    this.movieSubscribe.unsubscribe()
  }
}
