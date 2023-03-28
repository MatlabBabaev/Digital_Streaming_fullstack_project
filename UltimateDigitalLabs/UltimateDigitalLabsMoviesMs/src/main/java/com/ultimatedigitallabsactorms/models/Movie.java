package com.ultimatedigitallabsactorms.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "movies")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Movie {

    @Id
    @GeneratedValue
    @Column(name = "movie_id")
    private int movieId;

    @Column(name = "movie_title")
    private String movieTitle;

    @Column(name = "movie_cost")
    private int movieCost;

    @Column(name = "movie_year")
    private int movieYear;
}
