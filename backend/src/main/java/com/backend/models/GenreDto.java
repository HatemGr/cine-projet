package com.backend.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GenreDto {
    private List<Genre> genres;
}
