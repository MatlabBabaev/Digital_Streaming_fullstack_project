package com.ultimatedigitallabsactorms.controllers;

import com.ultimatedigitallabsactorms.dto.ReviewDto;
import com.ultimatedigitallabsactorms.dto.ReviewModel;
import com.ultimatedigitallabsactorms.producer.TopicProducer;
import com.ultimatedigitallabsactorms.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {
    private final TopicProducer producer;
    private final MovieService service;

    @GetMapping("{movieId}")
    public ResponseEntity<List<ReviewModel>> getReviewsByMovieId(@PathVariable int movieId){
        List<ReviewModel> reviewsByMovieId = service.getReviewsByMovieId(movieId);
        return new ResponseEntity<>(reviewsByMovieId, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<String> createReview(@RequestBody ReviewDto request){
        producer.createReview(request);
        return new ResponseEntity<>("Request sent", HttpStatus.OK);
    }
}
