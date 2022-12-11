import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageMoviesComponent } from './components/homepage-movies/homepage-movies.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageMoviesComponent },
  {
    path: "movie/:id",
    component: MovieDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
