package com.ultimatedigitallabsactorms.proxy;

import com.ultimatedigitallabsactorms.dto.ReviewModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="review-ms")
public interface ReviewProxy {
    @GetMapping("/reviews/{movieId}")
    List<ReviewModel> getReviewsByMovieId(@PathVariable int movieId);
}
