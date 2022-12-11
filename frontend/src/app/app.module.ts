import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageMovieCardComponent } from './components/homepage-movie-card/homepage-movie-card.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { HomepageMoviesComponent } from './components/homepage-movies/homepage-movies.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomepageMoviesComponent,
    HomepageMovieCardComponent,
    MovieDetailComponent,
    MovieSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
