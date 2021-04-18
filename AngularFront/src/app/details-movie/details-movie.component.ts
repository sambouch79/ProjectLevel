import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css']
})
export class DetailsMovieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: movieService) { }
  movie;
  error;
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.movie = this.movieService.getMovie(id)
    if (!this.movie) {
      this.error = "movie not found"
    }
  }

}
