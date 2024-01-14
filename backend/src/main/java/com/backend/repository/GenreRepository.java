package com.backend.repository;

import com.backend.models.GenreDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class GenreRepository {

    @Value("${tmdb.url}")
    private String tmdbUrl;

    @Value("${tmdb.api-key}")
    private String tmdbApiKey;

    private final RestTemplate restTemplate;

    public GenreDto fetchMovieGenres() {
        String url = String.format("%s/3/genre/movie/list?api_key=%s&language=fr-FR", tmdbUrl, tmdbApiKey);
        return restTemplate.getForObject(url, GenreDto.class);
    }

    public Map<Integer,String> buildGenreMap() {
        Map<Integer,String> result = new HashMap<>();
        fetchMovieGenres().getGenres().forEach(genre -> result.put(genre.getId(), genre.getName()));
        return result;
    }
}
