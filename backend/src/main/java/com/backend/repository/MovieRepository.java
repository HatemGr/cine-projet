package com.backend.repository;

import com.backend.models.GenreDto;
import com.backend.models.Movie;
import com.backend.models.MovieDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

@Repository
public class MovieRepository {
    @Value("${tmdb.url}")
    private String tmdbUrl;

    @Value("${tmdb.api-key}")
    private String tmdbApiKey;

    private final RestTemplate restTemplate;

    public MovieRepository(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

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

    public MovieDto searchMovies(String searchText) {
        String url = String.format("%s/3/search/movie?api_key=%s&language=en-US&query=%s", tmdbUrl, tmdbApiKey, searchText);
        return restTemplate.getForObject(url, MovieDto.class);
    }
}

