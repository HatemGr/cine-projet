import { Component, OnInit } from '@angular/core';
import {
  map
} from 'rxjs';
import { GenreDto } from 'src/app/models/movies.model';
import { MovieService } from 'src/app/services/movie.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  public searchInput = '';
  public allGenres: string[] = [];
  public selectedGenres: string[] = [];

  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.movieService
      .fetchMovieGenres()
      .pipe(map((result: GenreDto) => result.genres))
      .subscribe((genres) =>
        genres.forEach((genre) => this.allGenres.push(genre.name))
      );
  }

  onSearchType() {
    this.searchService.updateSearchInput(this.searchInput);
  }

  toggleFromArray(array: string[], element: string) {
    return array.includes(element)
      ? array.filter((val) => val !== element)
      : [...array, element];
  }

  toggleGenreFilter(event: any) {
    this.selectedGenres = this.toggleFromArray(
      this.selectedGenres,
      event.target.value
    );
    this.searchService.updateGenresFilter(this.selectedGenres);
  }
}
