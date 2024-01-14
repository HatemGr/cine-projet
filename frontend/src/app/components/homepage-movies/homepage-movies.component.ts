import { Component, HostListener, OnInit } from '@angular/core';
import { combineLatest, delay, startWith } from 'rxjs';
import { Movie } from 'src/app/models/movies.model';
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

  public displayedMovies: Movie[] = [];
  public movies: Movie[] = [];
  public filterGenres: string[] = [];

  popularMovies$ = this.movieService.populardMovies$;
  searchedMovies$ = this.searchService.searchedMovies$;
  selectedGenres$ = this.searchService.genresFilter;

  ngOnInit(): void {
    this.movieService.getInitialPopularMovies();

    combineLatest([
      this.popularMovies$,
      this.searchedMovies$.pipe(startWith([])),
      this.selectedGenres$.pipe(startWith([])),
    ]).subscribe(([popularMovies, searchedMovies, selectedGenres]) => {
      this.movies = searchedMovies.length ? searchedMovies : popularMovies;
      this.displayedMovies = this.filteredMoviesByGenres(selectedGenres);
    });
  }

  filteredMoviesByGenres(selectedGenres: string[]): Movie[] {
    if (selectedGenres.length === 0) {
      return this.movies;
    }
    return this.movies.filter((movie) =>
      movie.genres.some((genre) => selectedGenres.includes(genre.name))
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const isAtBottomOfScreen =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isAtBottomOfScreen) {
      this.searchService.searchInput.pipe(delay(500)).subscribe((hasInput) => {
        if (hasInput) {
          this.searchService.getSearchMoviesNextPage();
          return;
        }
        this.movieService.getNextPagePopularMovies();
      });
    }
  }
}
