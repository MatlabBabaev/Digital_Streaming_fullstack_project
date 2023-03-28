package com.ultimatedigitallabs.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "review")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Review {
    @Id
    @GeneratedValue
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "date_posted")
    private String datePosted;

    @Column(name = "description")
    private String   description;

    @Column(name = "rating")
    private int rating;

    @Column(name = "movie_id")
    private int movieId;
}
