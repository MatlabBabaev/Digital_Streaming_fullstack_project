package com.ultimatedigitallabsactorms.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "movieactors")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieActors {
    @Id
    @GeneratedValue
    @Column(name = "ma_id")
    private int maId;

    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "actor_id")
    private int actorId;
}
