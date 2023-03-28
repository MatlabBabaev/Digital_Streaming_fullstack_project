package com.ultimatedigitallabs.model;

import lombok.Data;

import javax.persistence.*;
@Entity
@Table(name = "ADMIN")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ADMIN_ID")
    private int adminId;
    @Column(name = "FULL_NAME")
    private String fullName;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "PASSWORD")
    private String password;
}
