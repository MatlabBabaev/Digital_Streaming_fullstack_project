package com.ultimatedigitallabsactorms.models;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="actors")
@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class Actor {
    @Id
    @GeneratedValue
    @Column(name = "actor_id")
    private int id;

    @Column(name="first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "age")
    private int age;

}
