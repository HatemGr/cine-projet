import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  map,
  mergeMap,
  startWith,
  tap,
} from 'rxjs';
import { Genre, GenreDto, Movie, MovieDto } from 'src/app/models/movies.model';
import { MovieService } from 'src/app/services/movie.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-homepage-movies',
  templateUrl: './homepage-movies.component.html',
  styleUrls: ['./homepage-movies.component.css'],
})
export class HomepageMoviesComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  public movies: Movie[] = [];
  public filterGenres: string[] = [];
  private showSearchedMovies = false;

  ngOnInit(): void {
    const genres$ = this.movieService
      .fetchMovieGenres()
      .pipe(map((result: GenreDto) => result.genres));

    const popularMovies$ = this.movieService
      .fetchPopularMovies()
      .pipe(map((moviesDto: MovieDto) => moviesDto.results));

    const searchedMovies$ = this.searchService.searchInput.pipe(
      tap((searchInput) => (this.showSearchedMovies = searchInput.length !== 0)),
      mergeMap((searchInput) =>
        this.showSearchedMovies
          ? this.searchService.searchMovies(searchInput)
          : this.movieService.fetchPopularMovies()
      ),
      map((moviesDto: MovieDto) => moviesDto.results)
    );

    combineLatest([
      genres$,
      popularMovies$,
      searchedMovies$.pipe(startWith([])),
    ]).subscribe(([genres, popularMovies, searchedMovies]) => {
      const mappedGenres = new Map();
      genres.forEach((genre) => mappedGenres.set(genre.id, genre.name));
      this.movies = this.showSearchedMovies
        ? this.mapGenresToMovies(searchedMovies, mappedGenres)
        : this.mapGenresToMovies(popularMovies, mappedGenres);
    });

    this.searchService.genresFilter.subscribe(filterGenres => {
      this.filterGenres = filterGenres;
    })
  }

  mapGenresToMovies(movies: Movie[], mappedGenres: Map<any, any>): Movie[] {
    return movies.map((movie) => ({
      ...movie,
      genres: movie.genre_ids.map((genre_id) => mappedGenres.get(genre_id)),
    }));
  }

  filteredMovies(): Movie[] {

    if(this.filterGenres.length === 0) {
      return this.movies
    }
    return this.movies.filter(movie => movie.genres.some(genre => this.filterGenres.includes(genre) ))
  }
}
