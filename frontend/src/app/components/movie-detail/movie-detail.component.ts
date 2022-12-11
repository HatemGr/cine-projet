import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { posterUrlPrefix } from 'src/app/app.constant';
import { Movie } from 'src/app/models/movies.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;
  posterUrl?: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService
      .getMovie(id)
      .pipe(
        tap((movie) => {
          this.movie = movie;
          this.posterUrl = posterUrlPrefix + this.movie.poster_path;
        })
      )
      .subscribe();
  }
}
