import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenreDto, Movie } from '../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private populardMovies = new BehaviorSubject<Movie[]>([]);
  public populardMovies$ = this.populardMovies.asObservable();

  private pageNumber = 1;

  constructor(private http: HttpClient) {}

  getInitialPopularMovies() {
    this.pageNumber = 1;
    this.fetchPopularMovies().subscribe((movies) =>
      this.populardMovies.next(movies)
    );
  }

  getNextPagePopularMovies() {
    this.pageNumber++;
    this.fetchPopularMovies().subscribe((newMovies) => {
      const currentMovies = this.populardMovies.getValue();
      const updatedMovies = currentMovies.concat(newMovies);
      this.populardMovies.next(updatedMovies);
    });
  }

  fetchPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `http://localhost:8080/cine-project/movies/popular?pageNumber=${this.pageNumber}`
    );
  }

  getMovie(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(
      `http://localhost:8080/cine-project/movies/${movieId}`
    );
  }

  fetchMovieGenres(): Observable<GenreDto> {
    return this.http.get<GenreDto>(`http://localhost:8080/cine-project/genres`);
  }
}
