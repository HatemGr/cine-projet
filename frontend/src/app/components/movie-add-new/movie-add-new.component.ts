import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { Genre, GenreDto, Movie } from 'src/app/models/movies.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-add-new',
  templateUrl: './movie-add-new.component.html',
  styleUrls: ['./movie-add-new.component.css'],
})
export class MovieAddNewComponent implements OnInit {
  genres: Genre[] = [];
  selectedGenres: Genre[] = [];
  movieFormGroup = new UntypedFormGroup({
    title: new FormControl(''),
    overview: new FormControl('')
  });

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .fetchMovieGenres()
      .pipe(map((result: GenreDto) => result.genres))
      .subscribe((genres) => {
        this.genres = genres;
        genres.forEach((genre: Genre) => {
          this.movieFormGroup.addControl(genre.name, new FormControl(false));
          this.movieFormGroup
            .get(genre.name)
            ?.valueChanges.subscribe((isChecked) =>
              this.updateSelectedGenres(isChecked, genre)
            );
        });
      });
  }

  updateSelectedGenres(isChecked: boolean, genre: Genre) {
    if (isChecked) {
      this.selectedGenres.push(genre);
      console.log(this.movieFormGroup);

      return;

    }
    this.selectedGenres = this.selectedGenres.filter(
      (val) => val.id !== genre.id
    );
  }

  addMovie() {
    const newMovie = {
      title: this.movieFormGroup.get('title')?.value,
      overview: this.movieFormGroup.get('overview')?.value,
      genres: this.selectedGenres
    } as Movie

    console.log("addMovie");

    this.movieService.addMovie(newMovie).subscribe()
  }
}
