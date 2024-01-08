package com.backend.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Genre {
    private int id;
    private String name;
}
