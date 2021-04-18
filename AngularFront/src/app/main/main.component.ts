import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies;
  constructor(private movieService: movieService, private router: Router) { }

  ngOnInit(): void {
    this.movies = this.movieService.movies
  }
  onView(id) {
    this.router.navigate(["details", id],)
  }
}
