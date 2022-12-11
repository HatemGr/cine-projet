import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { tmdbUrl } from '../app.constant';
import { MovieDto } from '../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchInput = new Subject<string>();
  genresFilter = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  searchMovies(searchText: string): Observable<MovieDto> {
    if (searchText) {
      return this.http.get<MovieDto>(
        `${tmdbUrl}/3/search/movie?api_key=${environment.TMDB_API_KEY}&language=en-US&query=${searchText}`
      );
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
