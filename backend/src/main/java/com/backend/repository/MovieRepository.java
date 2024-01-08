package com.backend.repository;

import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MovieRepository {


    @Value("${tmdb.url}")
    private String tmdbUrl;

    @Value("${tmdb.api-key}")
    private String tmdbApiKey;

    private final RestTemplate restTemplate;
    private final ArrayList<Movie> addedMovies = new ArrayList<>();

    public MovieDto getAllPopularMovies() {
        String url = String.format("%s/3/movie/popular?api_key=%s&language=en-US&page=1", tmdbUrl, tmdbApiKey);
        return restTemplate.getForObject(url, MovieDto.class);
    }

    public Movie getMovieById(long movieId) {
        String url = String.format("%s/3/movie/%d?api_key=%s&language=en-US", tmdbUrl, movieId, tmdbApiKey);
        return restTemplate.getForObject(url, Movie.class);
    }

    public GenreDto fetchMovieGenres() {
        String url = String.format("%s/3/genre/movie/list?api_key=%s&language=en-US", tmdbUrl, tmdbApiKey);
        return restTemplate.getForObject(url, GenreDto.class);
    }

    public MovieDto searchPopularMovies(String searchText) {
        String url = String.format("%s/3/search/movie?api_key=%s&language=en-US&query=%s", tmdbUrl, tmdbApiKey, searchText);
        return restTemplate.getForObject(url, MovieDto.class);
    }

    public List<Movie> getAddedMovies() {
        return addedMovies;
    }

    public Movie save(Movie movie) {
        addedMovies.add(movie);
        return movie;
    }
}

