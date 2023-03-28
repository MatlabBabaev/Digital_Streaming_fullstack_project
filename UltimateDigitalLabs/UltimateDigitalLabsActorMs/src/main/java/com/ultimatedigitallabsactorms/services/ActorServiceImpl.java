package com.ultimatedigitallabsactorms.services;

import com.ultimatedigitallabsactorms.models.Actor;
import com.ultimatedigitallabsactorms.models.ActorRequest;
import com.ultimatedigitallabsactorms.models.MovieResponseModel;
import com.ultimatedigitallabsactorms.proxy.MovieProxy;
import com.ultimatedigitallabsactorms.repositories.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ActorServiceImpl implements ActorService{
    private final ActorRepository repository;
    private final MovieProxy movieProxy;
    @Override
    public List<Actor> getAll() {
        return repository.findAll();
    }

    @Override
    public Actor getActorById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public Actor updateActor(Actor actor) {
        return repository.save(actor);
    }

    @Override
    public Actor createActor(ActorRequest actor) {
        Actor act = Actor.builder()
                .firstName(actor.getFirstName())
                .lastName(actor.getLastName())
                .age(actor.getAge())
                .gender(actor.getGender())
                .build();
        Actor res = repository.save(act);
        return res;
    }

    @Override
    public MovieResponseModel getMovieById(int id) {
        return movieProxy.getById(id);
    }

    @Override
    public List<MovieResponseModel> getMoviesByActorId(int actorId, String headers) {
        return movieProxy.getMoviesByActorId(actorId, headers);
    }

    @Override
    public String deleteActor(int id) throws Exception {
        Optional<Actor> byId = repository.findById(id);
        if(byId.isEmpty()){
            throw new Exception("Actor not found");
        }
        repository.deleteById(id);
        return "Deleted";
    }

    @Override
    public List<Actor> getActorsByMovieId(int id) {
        List<Actor> actorsByMovieId = repository.getActorsByMovieId(id);
        return actorsByMovieId;
    }
}
