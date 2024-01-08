package com.backend.controller;

import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import com.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cine-project")
@RequiredArgsConstructor
public class MovieController {
    private final MovieRepository movieRepository;

    @GetMapping()
    public MovieDto getMovies() {
        return movieRepository.getAllPopularMovies();
    }

    @GetMapping("/count")
    public Integer test() {
        return movieRepository.getAllPopularMovies().getResults().size();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieRepository.getMovieById(id);
    }

    @GetMapping("/genres")
    public GenreDto getGenres() {
        return movieRepository.fetchMovieGenres();
    }

    @GetMapping("/search")
    public MovieDto getSearchedMovies(@RequestParam(required = false) String searchText) {
        return movieRepository.searchMovies(searchText);
    }
}
