package com.ultimatedigitallabsactorms.services;
import com.ultimatedigitallabsactorms.models.Actor;
import com.ultimatedigitallabsactorms.models.ActorRequest;
import com.ultimatedigitallabsactorms.models.MovieResponseModel;

import java.util.List;

public interface ActorService {

    List<Actor> getAll();
    Actor getActorById(int id);

    Actor updateActor(Actor actor);

    Actor createActor(ActorRequest actor);

    MovieResponseModel getMovieById(int id);

    List<MovieResponseModel> getMoviesByActorId(int actorId, String headers);

    String deleteActor(int id) throws Exception;

    List<Actor> getActorsByMovieId(int id);
}
