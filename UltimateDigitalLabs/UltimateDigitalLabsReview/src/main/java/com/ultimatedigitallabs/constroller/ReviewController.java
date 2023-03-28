package com.ultimatedigitallabs.constroller;

import com.ultimatedigitallabs.dto.ReviewRequest;
import com.ultimatedigitallabs.models.Review;
import com.ultimatedigitallabs.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService service;

    @GetMapping("/{movieId}")
    public ResponseEntity<List<Review>> getReviewsByMovie(@PathVariable int movieId){
        List<Review> reviewsByMovie = service.getReviewsByMovie(movieId);
        return new ResponseEntity<>(reviewsByMovie, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest request){
        Review review = service.createReview(request);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }
}
