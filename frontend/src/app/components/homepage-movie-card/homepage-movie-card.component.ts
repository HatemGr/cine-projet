import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movies.model';
import { posterUrlPrefix } from 'src/app/app.constant';

@Component({
  selector: 'app-homepage-movie-card',
  templateUrl: './homepage-movie-card.component.html',
  styleUrls: ['./homepage-movie-card.component.css']
})
export class HomepageMovieCardComponent {
  @Input() movie!: Movie;

  get posterUrl () {
    return posterUrlPrefix + this.movie.poster_path
  }

}
