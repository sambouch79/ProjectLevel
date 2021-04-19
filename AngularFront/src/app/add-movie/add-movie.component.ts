import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { movie } from '../models/movie.model';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie = new movie()
  constructor(private movieService: movieService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.movieService.addMovie(this.movie)
    this.router.navigate([""])
  }
}
