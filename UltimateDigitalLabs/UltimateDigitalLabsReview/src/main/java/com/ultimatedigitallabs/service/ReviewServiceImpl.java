package com.ultimatedigitallabs.service;

import com.ultimatedigitallabs.dto.ReviewRequest;
import com.ultimatedigitallabs.models.Review;
import com.ultimatedigitallabs.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository repository;
    private final Environment env;
    @Override
    public Review createReview(ReviewRequest request) {
        Review review = Review.builder()
                .datePosted(request.getDatePosted())
                .description(request.getDescription())
                .rating(request.getRating())
                .movieId(request.getMovieId())
                .build();
        return repository.save(review);
    }
    @Override
    public List<Review> getReviewsByMovie(int movieId) {
        List<Review> allByMovieId = repository.findAllByMovieId(movieId);
        System.out.println("HERE WE GO >>>>>>>>>>>>>>" + env.getProperty("token.value"));
        return allByMovieId;
    }
}
