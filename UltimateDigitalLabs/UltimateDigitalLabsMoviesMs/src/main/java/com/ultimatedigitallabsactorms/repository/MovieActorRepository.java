package com.ultimatedigitallabsactorms.repository;

import com.ultimatedigitallabsactorms.models.MovieActors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieActorRepository extends JpaRepository<MovieActors, Integer> {
}
