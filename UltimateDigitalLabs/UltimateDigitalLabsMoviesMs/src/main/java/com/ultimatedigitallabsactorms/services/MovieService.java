package com.ultimatedigitallabsactorms.services;

import com.ultimatedigitallabsactorms.dto.MovieRequestDto;
import com.ultimatedigitallabsactorms.dto.ReviewModel;
import com.ultimatedigitallabsactorms.models.Movie;

import java.util.List;

public interface MovieService {

    List<Movie> getAll();

    Movie getById(int id);

    Movie getByTitle(String title) throws Exception;

    Movie createMovie(MovieRequestDto dto) throws Exception;

    String deleteMovie(int id) throws Exception;

    Movie updateMovie(Movie movie);

    List<Movie> getMoviesByActor(int actorId);
    List<ReviewModel> getReviewsByMovieId(int movieId);
}
