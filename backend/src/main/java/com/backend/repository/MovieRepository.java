package com.backend.repository;

import com.backend.models.Movie;
import com.backend.models.MovieDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class MovieRepository {


    @Value("${tmdb.url}")
    private String tmdbUrl;

    @Value("${tmdb.api-key}")
    private String tmdbApiKey;

    private final RestTemplate restTemplate;
    private final ArrayList<Movie> addedMovies = new ArrayList<>();

    public MovieDto getAllPopularMovies(Integer pageNumber) {
        String url = String.format("%s/3/movie/popular?api_key=%s&language=fr-FR&page=%s", tmdbUrl, tmdbApiKey, pageNumber);
        return restTemplate.getForObject(url, MovieDto.class);
    }

    public Movie getMovieById(long movieId) {
        String url = String.format("%s/3/movie/%d?api_key=%s&language=fr-FR", tmdbUrl, movieId, tmdbApiKey);
        return restTemplate.getForObject(url, Movie.class);
    }

    public List<Movie> searchPopularMovies(String searchText, Integer pageNumber) {
        String url = String.format("%s/3/search/movie?api_key=%s&language=fr-FR&query=%s&page=%s", tmdbUrl, tmdbApiKey, searchText, pageNumber);
        return restTemplate.getForObject(url, MovieDto.class).getResults();
    }

    public List<Movie> getAddedMovies() {
        return addedMovies;
    }

    public Movie save(Movie movie) {
        addedMovies.add(movie);
        return movie;
    }

}

