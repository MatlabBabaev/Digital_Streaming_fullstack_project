package com.ultimatedigitallabsactorms.dto;

import lombok.Data;

@Data
public class ReviewModel {
    private int reviewId;
    private String datePosted;
    private String description;
    private int rating;
    private int movieId;
}
