package com.backend.controller;

import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import com.backend.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cine-project")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieService.geAllMovies();
    }

    @GetMapping("/movies/popular")
    public List<Movie> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/movies/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    @GetMapping("/genres")
    public GenreDto getGenres() {
        return movieService.getGenres();
    }

    @GetMapping("/search")
    public MovieDto getSearchedMovies(@RequestParam(required = false) String searchText) {
        return movieService.getSearchedMovies(searchText);
    }

    @GetMapping("/my-movies")
    public List<Movie> getMyMovies() {
        return movieService.getMyMovies();
    }

    @PostMapping()
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovieToFavorites(movie);
    }
}
