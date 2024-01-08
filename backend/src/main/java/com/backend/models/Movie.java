package com.backend.models;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    private long id;
    private String title;
    private Date release_date;
    private String overview;
    private double popularity;
    private double vote_average;
    private int vote_count;
    private List<Genre> genres;
    private List<Integer> genre_ids;
    private String poster_path;
}
