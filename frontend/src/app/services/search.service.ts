import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../models/movies.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchInput = new BehaviorSubject<string>('');
  genresFilter = new BehaviorSubject<string[]>([]);
  private searchedMovies = new BehaviorSubject<Movie[]>([]);
  public searchedMovies$ = this.searchedMovies.asObservable();

  pageNumber = 1;

  constructor(private http: HttpClient) {}

  fetchSearchedMovies(
    searchText: string,
    pageNumber: number
  ): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `http://localhost:8080/cine-project/search?searchText=${searchText}&pageNumber=${pageNumber}`
    );
  }

  searchMovies(searchText: string): Observable<Movie[]> {
    if (searchText) {
      return this.fetchSearchedMovies(searchText, this.pageNumber);
    }
    return of();
  }

  getSearchMoviesNextPage() {
    this.pageNumber++;
    this.fetchSearchedMovies(
      this.searchInput.getValue(),
      this.pageNumber
    ).subscribe((newMovies) => {
      const currentMovies = this.searchedMovies.getValue();
      const updatedMovies = currentMovies.concat(newMovies);
      this.searchedMovies.next(updatedMovies);
    });
  }

  updateSearchInput(input: string) {
    this.searchInput.next(input);

    this.pageNumber = 1;
    this.fetchSearchedMovies(input, this.pageNumber).subscribe((movies) => {
      this.searchedMovies.next(movies);
    });
  }

  updateGenresFilter(selectedGenres: string[]) {
    this.genresFilter.next(selectedGenres);
  }
}
