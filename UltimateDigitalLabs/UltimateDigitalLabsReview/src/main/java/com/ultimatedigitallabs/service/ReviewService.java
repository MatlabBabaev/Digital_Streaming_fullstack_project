package com.ultimatedigitallabs.service;

import com.ultimatedigitallabs.dto.ReviewRequest;
import com.ultimatedigitallabs.models.Review;

import java.util.List;

public interface ReviewService {

    Review createReview(ReviewRequest request);

    List<Review> getReviewsByMovie(int movieId);

}
