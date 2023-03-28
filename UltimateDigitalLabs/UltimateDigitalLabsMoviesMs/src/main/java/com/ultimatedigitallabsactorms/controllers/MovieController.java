package com.ultimatedigitallabsactorms.controllers;

import com.ultimatedigitallabsactorms.dto.MovieRequestDto;
import com.ultimatedigitallabsactorms.models.Movie;
import com.ultimatedigitallabsactorms.services.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/movies")
public class MovieController {
    private final MovieService service;

    @GetMapping
    public List<Movie> getAll(){
        List<Movie> all = service.getAll();
        return all;
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable int id) {
        Movie byId = service.getById(id);
        return byId;
    }

    @GetMapping("/title/{title}")
    public Movie getByTitle(@PathVariable String title) throws Exception {
        Movie byTitle = service.getByTitle(title);
        return byTitle;
    }

    @GetMapping("/byactorid/{actorId}")
    public List<Movie>allMoviesByActorId(@PathVariable int actorId){
        List<Movie> moviesByActor = service.getMoviesByActor(actorId);
        return moviesByActor;
    }

    @PostMapping()
    public ResponseEntity<Movie> createMovie(@RequestBody MovieRequestDto dto) throws Exception {
        Movie movie = service.createMovie(dto);
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public String deleteMovie(@PathVariable int id) throws Exception {
        String result = service.deleteMovie(id);
        return result;
    }

    @PutMapping()
    public ResponseEntity<Movie> updateMovie(@RequestBody Movie movie){
        Movie result = service.updateMovie(movie);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
