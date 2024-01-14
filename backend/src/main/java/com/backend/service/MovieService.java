package com.backend.service;

import com.backend.models.Genre;
import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import com.backend.repository.GenreRepository;
import com.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    public List<Movie> geAllMovies() {
        List<Movie> allMovies = new ArrayList<>();
        List<Movie> popularMovies = movieRepository.getAllPopularMovies(1).getResults();
        List<Movie> addedMovies = movieRepository.getAddedMovies();
        allMovies.addAll(popularMovies);
        allMovies.addAll(addedMovies);
        return withNamedGenres(allMovies);
    }

    public List<Movie> getPopularMovies(Integer pageNumber) {
        return withNamedGenres(movieRepository.getAllPopularMovies(pageNumber).getResults());
    }

    public Movie getMovieById(Long id) {
        return movieRepository.getMovieById(id);
    }

    public GenreDto getGenres() {
        return genreRepository.fetchMovieGenres();
    }

    public List<Movie> getSearchedMovies(String searchText,Integer pageNumber) {
        return withNamedGenres(movieRepository.searchPopularMovies(searchText, pageNumber));
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

    private List<Movie> withNamedGenres(List<Movie> movies) {
        Map<Integer,String> genres = genreRepository.buildGenreMap() ;
        movies.forEach(movie -> movie.setGenres(getGenreNameFromIds(genres, movie.getGenre_ids())));
        return movies;
    }

    private List<Genre> getGenreNameFromIds(Map<Integer,String> genres, List<Integer> genreIds) {
        return genreIds.stream().map(genreId -> new Genre(genreId,genres.get(genreId))).toList();
    }
}
