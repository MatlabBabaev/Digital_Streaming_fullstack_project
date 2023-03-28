package com.ultimatedigitallabsactorms.repository;

import com.ultimatedigitallabsactorms.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Optional<Movie> findMovieByMovieId(int id);
    Optional<Movie> findByMovieTitle(String title);
    @Query(value = "select * from movies m inner join movieactors ma on m.movie_id=ma.movie_id inner join actors a on ma.actor_id=a.actor_id where a.actor_id=:actorId", nativeQuery = true)
    List<Movie> getMoviesByActor(@Param("actorId") int actorId);
    Optional<List<Movie>> findMoviesByMovieIdIn(List<Integer> Ids);
}

