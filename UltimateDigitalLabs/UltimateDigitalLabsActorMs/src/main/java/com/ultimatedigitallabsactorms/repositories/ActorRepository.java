package com.ultimatedigitallabsactorms.repositories;

import com.ultimatedigitallabsactorms.models.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
    @Query(value = "select * from actors join movieactors using (actor_id) join movies using (movie_id) where movie_id=:movieId", nativeQuery = true)
    List<Actor> getActorsByMovieId(@Param("movieId") int movieId);
}
