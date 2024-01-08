import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tmdbUrl } from '../app.constant';
import { GenreDto, Movie, MovieDto } from '../models/movies.model';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // Injection de dependence
  constructor(
    private http: HttpClient
   ) { }

   fetchPopularMovies(): Observable<MovieDto> {
    return this.http.get<MovieDto>(`${tmdbUrl}/3/movie/popular?api_key=${environment.TMDB_API_KEY}&language=en-US&page=1`)
   }

   getMovie(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${tmdbUrl}/3/movie/${movieId}?api_key=${environment.TMDB_API_KEY}&language=en-US`)
   }

   fetchMovieGenres(): Observable<GenreDto>{
    return this.http.get<GenreDto>(`${tmdbUrl}/3/genre/movie/list?api_key=${environment.TMDB_API_KEY}&language=en-US`)
   }

   searchMovies(searchText: string): Observable<MovieDto> {
    return this.http.get<MovieDto>(`${tmdbUrl}/3/search/movie?api_key=${environment.TMDB_API_KEY}&language=en-US&query=${searchText}`)
   }


}
