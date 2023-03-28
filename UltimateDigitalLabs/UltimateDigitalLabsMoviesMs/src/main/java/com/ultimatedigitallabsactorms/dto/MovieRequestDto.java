package com.ultimatedigitallabsactorms.dto;

import lombok.Data;

import java.util.List;

@Data
public class MovieRequestDto {

    private String movieTitle;
    private int movieCost;
    private int movieYear;
    private List<Integer> actorIds;
}
