import { Component, OnInit } from '@angular/core';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  movies
  image = "https://picsum.photos/150"
  constructor(private movieService: movieService) { }

  ngOnInit(): void {
    this.movieService.getMovieFromServer().subscribe((res: any) => {
      this.movies = res
    }, (error) => {
      console.log(error)
    })

  }

}
