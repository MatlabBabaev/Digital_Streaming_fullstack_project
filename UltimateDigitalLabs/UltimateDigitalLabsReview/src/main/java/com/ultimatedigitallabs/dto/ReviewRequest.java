package com.ultimatedigitallabs.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private String datePosted;
    private String description;
    private int rating;
    private int movieId;
}
