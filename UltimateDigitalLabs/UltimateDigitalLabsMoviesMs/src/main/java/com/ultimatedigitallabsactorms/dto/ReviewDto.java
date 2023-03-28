package com.ultimatedigitallabsactorms.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private String datePosted;
    private String description;
    private int rating;
    private int movieId;
}
