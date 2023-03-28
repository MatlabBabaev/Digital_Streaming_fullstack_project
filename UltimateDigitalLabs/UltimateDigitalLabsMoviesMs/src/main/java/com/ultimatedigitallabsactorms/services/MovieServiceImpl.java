package com.ultimatedigitallabsactorms.services;

import com.ultimatedigitallabsactorms.dto.MovieRequestDto;
import com.ultimatedigitallabsactorms.dto.ReviewModel;
import com.ultimatedigitallabsactorms.models.Movie;
import com.ultimatedigitallabsactorms.models.MovieActors;
import com.ultimatedigitallabsactorms.proxy.ReviewProxy;
import com.ultimatedigitallabsactorms.repository.MovieActorRepository;
import com.ultimatedigitallabsactorms.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieServiceImpl implements MovieService{
    private final MovieRepository repository;
    private final MovieActorRepository maRepository;

    private final ReviewProxy proxy;

    @Override
    public List<Movie> getAll() {
        return repository.findAll();
    }

    @Override
    public Movie getById(int id) {
        Optional<Movie> byId = repository.findMovieByMovieId(id);
        return byId.get();
    }

    @Override
    public Movie getByTitle(String title) throws Exception {
        Optional<Movie> byTitle = repository.findByMovieTitle(title);
        if(byTitle.isEmpty()){
            throw new Exception("Not found");
        }
        return byTitle.get();
    }

    @Override
    public Movie createMovie(MovieRequestDto dto) throws Exception {

        Optional<Movie> byMovieTitle = repository.findByMovieTitle(dto.getMovieTitle());
        if(byMovieTitle.isPresent()){
            throw new Exception("Already exist");
        }
        Movie movie = Movie.builder()
                .movieTitle(dto.getMovieTitle())
                .movieCost(dto.getMovieCost())
                .movieYear(dto.getMovieYear())
                .build();

//        Movie movie = new Movie();
//        movie.setMovieCost(111);
//        movie.setMovieTitle("dfdf");
//        movie.setMovieYear(555);
        Movie newMovie = repository.save(movie);

        if(!dto.getActorIds().isEmpty()){
            dto.getActorIds().stream().forEach(id->{
                MovieActors ma = MovieActors.builder()
                        .movieId(newMovie.getMovieId())
                        .actorId(id)
                        .build();
                maRepository.save(ma);
            });
        }
//
//        MovieActors ma = MovieActors.builder()
//                .movieId(59)
//                .actorId(23)
//                .build();
//        maRepository.save(ma);
        return newMovie;
    }

    @Override
    public String deleteMovie(int id) throws Exception {

        Optional<Movie> byId = repository.findById(id);
        if(byId.isEmpty()){
            throw new Exception("Not found");
        }
        repository.deleteById(id);

        return "Movie deleted";
    }

    @Override
    public Movie updateMovie(Movie movie) {
        return repository.save(movie);
    }

    @Override
    public List<Movie> getMoviesByActor(int actorId) {
        List<Movie> moviesByActor = repository.getMoviesByActor(actorId);
        return moviesByActor;
    }
    @Override
    public List<ReviewModel> getReviewsByMovieId(int movieId) {
        List<ReviewModel> reviewsByMovieId = proxy.getReviewsByMovieId(movieId);
        return reviewsByMovieId;
    }

}
