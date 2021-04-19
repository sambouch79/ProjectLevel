import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { movie } from '../models/movie.model';
import { movieService } from '../services/movie.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  //movie = new movie()
  movie
  //updateMovie = new movie()

  constructor(private movieService: movieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.movie = this.movieService.getMovie(id)

  }
  onSubmit(): void {
    this.movieService.saveMovie()

    this.router.navigate([""])
  }
  /*  onSubmit(): void {
     this.movieService.addMovie(this.movie)
     this.router.navigate([""])
   } */
}
