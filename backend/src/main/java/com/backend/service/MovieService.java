package com.backend.service;

import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import com.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> geAllMovies() {
        List<Movie> allMovies = new ArrayList<>();
        List<Movie> popularMovies = movieRepository.getAllPopularMovies().getResults();
        List<Movie> addedMovies = movieRepository.getAddedMovies();
        allMovies.addAll(popularMovies);
        allMovies.addAll(addedMovies);
        return allMovies;
    }

    public List<Movie> getPopularMovies() {
        return movieRepository.getAllPopularMovies().getResults();
    }

    public Movie getMovieById(Long id) {
        return movieRepository.getMovieById(id);
    }

    public GenreDto getGenres() {
        return movieRepository.fetchMovieGenres();
    }

    public MovieDto getSearchedMovies(String searchText) {
        return movieRepository.searchPopularMovies(searchText);
    }

    public List<Movie> getMyMovies() {
        return movieRepository.getAddedMovies();
    }

    public Movie addMovieToFavorites(Movie movie) {
        movie.setId(idGenerator());
        return movieRepository.save(movie);
    }

    private Integer idGenerator() {
        Random random = new Random();
        return random.nextInt(9000000) + 1000000;
    }
}
