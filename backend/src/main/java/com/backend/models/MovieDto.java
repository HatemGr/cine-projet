package com.backend.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MovieDto {
    private int page;
    private List<Movie> results;
}
