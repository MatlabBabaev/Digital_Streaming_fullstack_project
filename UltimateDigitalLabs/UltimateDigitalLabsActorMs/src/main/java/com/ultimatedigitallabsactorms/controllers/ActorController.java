package com.ultimatedigitallabsactorms.controllers;

import com.ultimatedigitallabsactorms.models.Actor;
import com.ultimatedigitallabsactorms.models.ActorRequest;
import com.ultimatedigitallabsactorms.models.MovieResponseModel;
import com.ultimatedigitallabsactorms.services.ActorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://127.0.0.1:4200")
@RequestMapping("api/v1/actors")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService service;

    @GetMapping
    public ResponseEntity<List<Actor>> getAll(@RequestHeader(HttpHeaders.AUTHORIZATION) String headers){
        System.out.println("HERE WE GOO>>>>>" + headers.toString());
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actor> getActor(@PathVariable int id){
        return new ResponseEntity<>(service.getActorById(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Actor> saveActor(@RequestBody Actor actor){
        Actor act = actor;
         return new ResponseEntity<>(service.updateActor(actor), HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<Actor> createActor(@RequestBody ActorRequest actor){
        Actor act = service.createActor(actor);
        return new ResponseEntity<>(act, HttpStatus.OK);
    }
    @GetMapping("/movie/{id}")
    public MovieResponseModel getMovie(@PathVariable int id){
        return service.getMovieById(id);
    }

    @GetMapping("/moviesbyactor/{actorId}")
    public ResponseEntity<List<MovieResponseModel>> getMoviesByActorId(@RequestHeader(HttpHeaders.AUTHORIZATION) String headers, @PathVariable int actorId){
        List<MovieResponseModel> moviesByActorId = service.getMoviesByActorId(actorId, headers);
        return new ResponseEntity<>(moviesByActorId, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Actor> deleteActor(@PathVariable int id) throws Exception {
        service.deleteActor(id);
        return new ResponseEntity<>(new Actor(), HttpStatus.OK);
    }

    @GetMapping("/bymovieid/{id}")
    public ResponseEntity<List<Actor>> getActorsBy(@PathVariable int id){
        List<Actor> actorsByMovieId = service.getActorsByMovieId(id);
        return new ResponseEntity<>(actorsByMovieId, HttpStatus.OK);
    }

}
