package com.ultimatedigitallabs.model;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue
    @Column(name = "ADMIN_ID")
    private int adminId;
    @Column(name = "FULL_NAME")
    private String fullName;
    @Column(name="EMAIL")
    private String email;
    @Column(name="PASSWORD")
    private String password;

}
