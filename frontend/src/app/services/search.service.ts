import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MovieDto } from '../models/movies.model';
import { MovieService } from 'src/app/services/movie.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchInput = new Subject<string>();
  genresFilter = new Subject<string[]>();

  constructor(private movieService: MovieService) {}

  searchMovies(searchText: string): Observable<MovieDto> {
    if (searchText) {
      return this.movieService.searchMovies(searchText);
    }
    return of();
  }

  updateSearchInput(input: string) {
    this.searchInput.next(input);
  }

  updateGenresFilter(input: string[]) {
    this.genresFilter.next(input);
  }
}
